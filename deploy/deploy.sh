#!/usr/bin/env bash
# Actify release deploy with health check and automatic rollback.
#
# Install:
#   install -m 750 -o actify -g actify deploy/deploy.sh /var/lib/actify/bin/deploy.sh
#
# Use:
#   sudo -u actify -H /var/lib/actify/bin/deploy.sh v1.2.0
#
# Requires /etc/actify/deploy.env (mode 640, root:actify) with:
#   REPO_URL=git@github.com:you/actify.git
#   HEALTH_URL=http://127.0.0.1:5002/health      # or http://127.0.0.1:5002/
#   SERVICE=actify-api
#   UPLOADS=/var/lib/actify/uploads
#   WEB_ROOT=/var/www/actify
#   KEEP_RELEASES=5

set -euo pipefail

DEPLOY_ENV="${DEPLOY_ENV:-/etc/actify/deploy.env}"
[ -r "$DEPLOY_ENV" ] || { echo "missing $DEPLOY_ENV"; exit 1; }
# shellcheck disable=SC1090
. "$DEPLOY_ENV"

SERVICE="${SERVICE:-actify-api}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:5002/}"
UPLOADS="${UPLOADS:-/var/lib/actify/uploads}"
WEB_ROOT="${WEB_ROOT:-/var/www/actify}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
RELEASES_DIR="/opt/actify/releases"
CURRENT_LINK="/opt/actify/current"

TAG="${1:-}"
[ -n "$TAG" ] || { echo "usage: $0 <git-tag>"; exit 2; }

RELEASE="$RELEASES_DIR/$(date -u +%Y%m%d%H%M%S)"
PREV="$(readlink -f "$CURRENT_LINK")"

log()  { printf '\n==> %s\n' "$*"; }
fail() { printf '\n!! %s\n' "$*" >&2; exit 1; }

wait_healthy() {
  local tries="${1:-15}"
  for i in $(seq 1 "$tries"); do
    if curl -fsS -o /dev/null --max-time 3 "$HEALTH_URL"; then
      echo "health OK after ${i}s"
      return 0
    fi
    sleep 2
  done
  return 1
}

log "deploying tag $TAG into $RELEASE"
GIT_SSH_COMMAND="ssh -i /var/lib/actify/.ssh/actify_deploy -o StrictHostKeyChecking=accept-new" \
  git clone --depth 1 --branch "$TAG" "$REPO_URL" "$RELEASE" \
  || fail "git clone failed (tag $TAG missing, or deploy key not authorized)"

log "installing server dependencies"
(cd "$RELEASE/server" && npm ci --omit=dev --no-audit --no-fund) || fail "server npm ci failed"

log "building client"
(cd "$RELEASE/client" && npm ci --no-audit --no-fund && npm run build) || fail "client build failed"

log "linking persistent uploads"
[ -d "$UPLOADS" ] || fail "upload dir $UPLOADS does not exist"
ln -sfn "$UPLOADS" "$RELEASE/server/src/uploads"

log "publishing static bundle"
install -d -o www-data -g www-data -m 755 "$WEB_ROOT"
rsync -a --delete "$RELEASE/client/dist/" "$WEB_ROOT/"
chown -R www-data:www-data "$WEB_ROOT"

log "switching $CURRENT_LINK -> $RELEASE"
ln -sfn "$RELEASE" "$CURRENT_LINK"

log "restarting $SERVICE"
systemctl restart "$SERVICE"

if wait_healthy 15; then
  log "deploy OK: $TAG"
  # Prune old releases, keeping the newest $KEEP_RELEASES (manual review of the list first)
  ls -1dt "$RELEASES_DIR"/* 2>/dev/null | tail -n +$((KEEP_RELEASES + 1)) | while read -r old; do
    [ "$old" = "$PREV" ] && continue
    echo "old release (review before removing): $old"
  done
  exit 0
fi

log "HEALTH CHECK FAILED — rolling back"
if [ -n "$PREV" ] && [ -d "$PREV" ]; then
  ln -sfn "$PREV" "$CURRENT_LINK"
  rsync -a --delete "$PREV/client/dist/" "$WEB_ROOT/"
  systemctl restart "$SERVICE"
  wait_healthy 15 || echo "!! rollback target also unhealthy — check journalctl -u $SERVICE -n 100"
  fail "deploy failed; rolled back to $PREV (broken release kept at $RELEASE)"
fi

fail "deploy failed and no previous release to roll back to"
