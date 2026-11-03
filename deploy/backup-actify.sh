#!/usr/bin/env bash
# Actify nightly backup: MongoDB dump + uploads + /etc/actify configuration.
#
# Install:
#   install -d -o actify -g actify -m 750 /var/backups/actify
#   install -m 750 -o actify -g actify deploy/backup-actify.sh /var/lib/actify/bin/backup-actify.sh
#
# Run (systemd unit supplies EnvironmentFile=/etc/actify/api.env):
#   sudo -u actify -H bash -lc 'set -a && . /etc/actify/api.env && set +a && /var/lib/actify/bin/backup-actify.sh'

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/var/backups/actify}"
UPLOAD_DIR="${UPLOAD_DIR:-/var/lib/actify/uploads}"
CONF_DIR="${CONF_DIR:-/etc/actify}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
RCLONE_REMOTE="${RCLONE_REMOTE:-}"          # e.g. offsite:actify-backups

TS="$(date -u +%Y%m%dT%H%M%SZ)"
: "${MONGO_URI:?MONGO_URI is not set (source /etc/actify/api.env)}"

mkdir -p "$BACKUP_DIR"
log() { printf '[%s] %s\n' "$(date -u +%H:%M:%S)" "$*"; }

# 1. Database
log "dumping database -> db-${TS}.archive.gz"
mongodump --uri="$MONGO_URI" --archive="$BACKUP_DIR/db-${TS}.archive.gz" --gzip --quiet

# 2. Uploads (the app writes to server/src/uploads -> symlink -> $UPLOAD_DIR)
if [ -d "$UPLOAD_DIR" ]; then
  log "archiving uploads -> uploads-${TS}.tar.gz"
  tar -czf "$BACKUP_DIR/uploads-${TS}.tar.gz" -C "$UPLOAD_DIR" .
else
  log "WARN: upload dir $UPLOAD_DIR missing, skipping"
fi

# 3. Configuration (contains secrets -> mode 600)
if [ -d "$CONF_DIR" ]; then
  log "archiving config -> config-${TS}.tar.gz (mode 600)"
  tar -czf "$BACKUP_DIR/config-${TS}.tar.gz" -C "$(dirname "$CONF_DIR")" "$(basename "$CONF_DIR")"
  chmod 600 "$BACKUP_DIR/config-${TS}.tar.gz"
fi

log "sizes:"
du -h "$BACKUP_DIR"/*-"${TS}".* 2>/dev/null || true

# 4. Local retention
log "pruning local backups older than ${RETENTION_DAYS} days"
find "$BACKUP_DIR" -maxdepth 1 -type f \( -name '*.gz' -o -name '*.tar.gz' \) \
  -mtime +"$RETENTION_DAYS" -print -delete

# 5. Offsite copy (a backup on the same disk is not a backup)
if [ -n "$RCLONE_REMOTE" ] && command -v rclone >/dev/null 2>&1; then
  log "copying to $RCLONE_REMOTE"
  rclone copy "$BACKUP_DIR" "$RCLONE_REMOTE" --max-age "${RETENTION_DAYS}d" --include "*.gz"
else
  log "WARN: RCLONE_REMOTE not set or rclone missing — backup is local only"
fi

log "backup complete"
