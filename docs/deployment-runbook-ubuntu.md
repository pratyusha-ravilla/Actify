# Actify — Ubuntu Deployment Runbook

Target: Ubuntu 22.04 or 24.04 LTS, single VM, Nginx + Let's Encrypt, systemd supervision.
Every command is meant to be run in the stated shell/context. `<PLACEHOLDER>` values are listed in §0.2.

> **Do not start this runbook until the 7 blocking items in `docs/deployment-review.md` §A are fixed and pushed.** Steps 5, 7 and 9 below assume the fixes (`VITE_API_BASE_URL`, `PUPPETEER_EXECUTABLE_PATH`, `CORS_ORIGINS`, `UPLOAD_DIR`, the cron bug, rotated secrets) are already in the code.

---

## 0. Conventions

### 0.1 Paths and users used throughout

| Purpose | Path |
|---|---|
| Release checkouts | `/opt/actify/releases/<UTC-timestamp>` |
| Symlink to live release | `/opt/actify/current` |
| Persistent uploads | `/var/lib/actify/uploads` |
| Secrets / env files | `/etc/actify/` |
| Built SPA served by Nginx | `/var/www/actify` |
| Deploy artifacts (this folder) | `/opt/actify/current/deploy` |
| Service account | `actify` (no shell, no sudo) |

### 0.2 Placeholders — fill these in once

```bash
# ---- run in your local shell; edit the values ----
export DOMAIN="example.com"                 # <DOMAIN>      apex domain
export WWW_DOMAIN="www.example.com"         # <WWW_DOMAIN>
export SERVER_IP="203.0.113.10"             # <SERVER_IP>   VM public IP
export REPO_URL="git@github.com:you/actify.git"   # <REPO_URL>
export MONGO_URI="mongodb+srv://USER:PASS@cluster.mongodb.net/actify?retryWrites=true&w=majority"  # <MONGO_URI>
export ADMIN_EMAIL="admin@atria.edu.in"     # <ADMIN_EMAIL> first admin (must match the atria.edu.in rule)
```
On the server, keep the same values in `/etc/actify/deploy.env` so the deploy script can read them.

### 0.3 DNS prerequisite

Create these records **before** §8 (TLS), and wait for propagation:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `<SERVER_IP>` | 300 |
| A | `www` | `<SERVER_IP>` | 300 |
| AAAA | `@` / `www` | *(only if the VM has a public IPv6)* | 300 |

```bash
dig +short <DOMAIN> ; dig +short <WWW_DOMAIN>    # must print <SERVER_IP>
```

---

## 1. Server preparation

```bash
# 1.1 Connect with the provider's default user (ubuntu / root) and become root
ssh <DEPLOY_USER>@<SERVER_IP>
sudo -i
```

```bash
# 1.2 Hostname + timezone (cron reminders depend on this)
hostnamectl set-hostname actify-prod
timedatectl set-timezone Asia/Kolkata
timedatectl                     # verify: Time zone: Asia/Kolkata (IST, +0530)
```

```bash
# 1.3 Full package refresh
apt update && apt -y full-upgrade
apt -y install curl ca-certificates gnupg lsb-release software-properties-common \
               ufw git unzip htop nano rsync
```

```bash
# 1.4 Swap — Puppeteer/Chromium PDF rendering is memory hungry; 2 GB RAM needs swap
swapon --show                      # if empty and RAM < 4 GB, create 2 GB:
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
printf 'vm.swappiness=10\n' > /etc/sysctl.d/99-actify.conf && sysctl --system
```

```bash
# 1.5 Create the service account (no login shell, no sudo)
adduser --system --group --home /var/lib/actify --shell /usr/sbin/nologin actify
install -d -o actify -g actify -m 750 /var/lib/actify
install -d -o actify -g actify -m 750 /var/lib/actify/uploads
```

```bash
# 1.6 Automatic security updates
dpkg-reconfigure --priority=low unattended-upgrades      # answer Yes
systemctl enable --now unattended-upgrades
```

```bash
# 1.7 fail2ban for SSH brute force
apt -y install fail2ban
printf '[sshd]\nenabled = true\nmaxretry = 4\nbantime = 1h\n' > /etc/fail2ban/jail.local
systemctl enable --now fail2ban && fail2ban-client status sshd
```

```bash
# 1.8 SSH hardening — check the file before reloading
#   /etc/ssh/sshd_config.d/99-hardening.conf
#     PermitRootLogin no
#     PasswordAuthentication no
#     KbdInteractiveAuthentication no
#     PubkeyAuthentication yes
# Make sure your key is in /home/<DEPLOY_USER>/.ssh/authorized_keys FIRST.
printf 'PermitRootLogin no\nPasswordAuthentication no\nKbdInteractiveAuthentication no\n' \
  > /etc/ssh/sshd_config.d/99-hardening.conf
sshd -t && systemctl reload ssh
```

---

## 2. Install required packages

```bash
# 2.1 Nginx + Certbot + MongoDB CLI tools
apt -y install nginx
snap install --classic certbot && ln -sf /snap/bin/certbot /usr/bin/certbot
# MongoDB Database Tools (mongodump/mongorestore — needed for backups of Atlas)
apt -y install wget
wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" \
  | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update && apt -y install mongodb-database-tools
mongodump --version
```

```bash
# 2.2 Chromium runtime libraries for Puppeteer (Ubuntu 24.04 = *t64 package names)
apt -y install --no-install-recommends \
  ca-certificates fonts-liberation fonts-dejavu-core fontconfig \
  libasound2t64 libatk1.0-0t64 libatk-bridge2.0-0t64 libcairo2 libcups2t64 \
  libdbus-1-3 libexpat1 libgbm1 libglib2.0-0t64 libgtk-3-0t64 libnspr4 libnss3 \
  libpango-1.0-0 libpangocairo-1.0-0 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
  libxdamage1 libxext6 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils
```
> **Ubuntu 22.04:** drop the `t64` suffix — use `libasound2 libatk1.0-0 libatk-bridge2.0-0 libcups2 libglib2.0-0 libgtk-3-0`.
> **Debian 12+ / 24.04 alternative:** `apt -y install chromium-browser` and set `PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser` in `/etc/actify/api.env`.

---

## 3. Install Node.js 24 LTS

Your `client/package.json` declares `engines.node: 24.x`, so pin 24.x on the server. (Vite 7 needs ≥ 22.12; do not go below that.)

```bash
# 3.1 NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt -y install nodejs
node -v && npm -v            # expect v24.x and npm 11.x
```

```bash
# 3.2 Pin npm and make the cache usable for the service account
npm i -g npm@^11
sudo -u actify -H bash -lc 'node -v && npm config get cache'
```

If your provider blocks the NodeSource script, use nvm for the `actify` user instead:

```bash
sudo -u actify -H bash -c 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash'
sudo -u actify -H bash -lc 'nvm install 24 && nvm alias default 24 && node -v'
```
…and point `ExecStart` at the resolved path, e.g. `/var/lib/actify/.nvm/versions/node/v24.*/bin/node`.

---

## 4. Project setup (tag-based releases)

```bash
# 4.1 Layout
install -d -o actify -g actify -m 750 /opt/actify /opt/actify/releases
install -d -o root  -g actify -m 750 /etc/actify

# 4.2 Deploy key for a private repo (read-only deploy key is enough)
ssh-keygen -t ed25519 -C "actify-deploy@${HOSTNAME}" -f /var/lib/actify/.ssh/actify_deploy -N ''
cat /var/lib/actify/.ssh/actify_deploy.pub
#   → add this as a read-only Deploy Key in your Git host, then:
chown -R actify:actify /var/lib/actify/.ssh
chmod 700 /var/lib/actify/.ssh && chmod 600 /var/lib/actify/.ssh/actify_deploy
```

```bash
# 4.3 First checkout (as the service account)
export RELEASE="$(date -u +%Y%m%d%H%M%S)"
sudo -u actify -H env RELEASE="$RELEASE" REPO_URL="<REPO_URL>" bash -lc '
  GIT_SSH_COMMAND="ssh -i /var/lib/actify/.ssh/actify_deploy -o StrictHostKeyChecking=accept-new" \
  git clone "$REPO_URL" "/opt/actify/releases/$RELEASE"
'
ln -sfn "/opt/actify/releases/${RELEASE}" /opt/actify/current
ls -l /opt/actify/current/
```

```bash
# 4.4 Uploads must live outside the code tree (review §A7)
#     The app writes to server/src/uploads, so point that path at persistent storage.
rm -rf /opt/actify/current/server/src/uploads
ln -sfn /var/lib/actify/uploads /opt/actify/current/server/src/uploads
ls -ld /opt/actify/current/server/src/uploads
```
> If you applied the `UPLOAD_DIR` code change instead, skip the symlink and set `UPLOAD_DIR` in §5.1.

---

## 5. Dependencies and environment configuration

### 5.1 Backend environment file

```bash
install -m 640 -o root -g actify /dev/null /etc/actify/api.env
```
`/etc/actify/api.env` — fill in the real values (see `deploy/env.server.example`):
```dotenv
NODE_ENV=production
PORT=5002
HOST=127.0.0.1
MONGO_URI=<MONGO_URI>
JWT_SECRET=<OUTPUT_OF_openssl_rand_-base64_48>
JWT_EXPIRES_IN=7d
CORS_ORIGINS=https://<DOMAIN>,https://<WWW_DOMAIN>
EMAIL_USER=<GMAIL_ADDRESS>
EMAIL_PASS=<16_CHAR_APP_PASSWORD>
EMAIL_FROM_NAME=Actify
UPLOAD_DIR=/var/lib/actify/uploads
TZ=Asia/Kolkata
```

```bash
# Generate the JWT secret and paste it into the file above; never commit it
openssl rand -base64 48
```
```bash
# Quick sanity check of the file (values readable, permissions correct)
install -m 640 -o root -g actify /etc/actify/api.env /etc/actify/api.env   # no-op, keeps mode
ls -l /etc/actify/api.env        # -rw-r----- root actify
```

> **Do not** read these values with `cat` into a shared terminal or send them in chat. Rotate `MONGO_URI` and `EMAIL_PASS` per review §A3 if they were ever committed.

### 5.2 Frontend build-time environment

```bash
# Same-origin deploy (recommended): the SPA calls /api on its own host, no CORS needed.
printf 'VITE_API_BASE_URL=/api\n' | sudo -u actify -H tee /opt/actify/current/client/.env.production
```
Cross-origin variant (only if the API lives on its own host):
```bash
printf 'VITE_API_BASE_URL=https://api.<DOMAIN>/api\n' | sudo -u actify -H tee /opt/actify/current/client/.env.production
```

### 5.3 Install dependencies and build

```bash
sudo -u actify -H bash -lc '
  set -e
  cd /opt/actify/current/server
  npm ci --omit=dev --no-audit --no-fund
  # Puppeteer downloads Chrome here unless the package was installed with PUPPETEER_SKIP_DOWNLOAD
  npx puppeteer browsers install chrome || true
'
```

```bash
sudo -u actify -H bash -lc '
  set -e
  cd /opt/actify/current/client
  npm ci --no-audit --no-fund
  npm run build
'
ls -la /opt/actify/current/client/dist/     # index.html + assets/
```
> Expect the Vite "chunks larger than 500 kB" warning — harmless. The `@import must precede all other statements` warning means the Inter font will not load; fix it (review §B16) before launch.
> `npm ci` removes any committed `node_modules`; this is intentional (review §A6).

### 5.4 Database initialization

**Atlas prep (do this in the Atlas UI):**
1. *Database Access* → rotate the password → copy the new connection string.
2. *Network Access* → replace `0.0.0.0/0` with the VM's IP (`<SERVER_IP>/32`). Keep your office IP during setup.
3. *Backup* → confirm continuous/cloud backups are enabled for the cluster tier.
4. Connect once from the server to prove reachability:
```bash
mongosh "<MONGO_URI>" --eval 'db.runCommand({ping:1})'
```

**Indexes** (run once; idempotent). Save as `/opt/actify/current/server/src/scripts/prodIndexes.js`:
```js
import mongoose from "mongoose";
import "dotenv/config";

await mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection.db;

await db.collection("activities").createIndex({ department: 1, status: 1 });
await db.collection("activities").createIndex({ createdBy: 1, createdAt: -1 });
await db.collection("activities").createIndex({ event: 1, faculty: 1 });
await db.collection("events").createIndex({ startDate: 1 });
await db.collection("events").createIndex({ status: 1, createdAt: -1 });

console.log("Indexes created");
await mongoose.disconnect();
```
```bash
sudo -u actify -H bash -lc \
  'cd /opt/actify/current/server && set -a && . /etc/actify/api.env && set +a && node src/scripts/prodIndexes.js'
```

**Departments** — only after fixing `seedDepartments.js` (review §B18). The fixed script must read `MONGO_URI` and upsert instead of `deleteMany()`. Run it once:
```bash
sudo -u actify -H bash -lc \
  'cd /opt/actify/current/server && set -a && . /etc/actify/api.env && set +a && node src/scripts/seedDepartments.js'
mongosh "<MONGO_URI>" --quiet --eval 'db.departments.countDocuments()'   # expect > 0
```

**First admin (bootstrap).** Public registration forbids `admin`, and `POST /api/auth/users/add` requires an existing admin — so create the first one directly. Save as `/opt/actify/current/server/src/scripts/bootstrapAdmin.js`:
```js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import User from "../models/User.js";

const email = process.env.BOOTSTRAP_ADMIN_EMAIL;
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
if (!email || !password || password.length < 12) {
  console.error("Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD (min 12 chars)");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const existing = await User.findOne({ email });
if (existing) {
  existing.role = "admin";
  existing.password = await bcrypt.hash(password, 10);
  await existing.save();
  console.log("Promoted existing user to admin:", email);
} else {
  await User.create({ name: "Administrator", email, password: await bcrypt.hash(password, 10), role: "admin" });
  console.log("Created admin:", email);
}
await mongoose.disconnect();
```
```bash
sudo -u actify -H bash -lc '
  cd /opt/actify/current/server
  set -a && . /etc/actify/api.env && set +a
  export BOOTSTRAP_ADMIN_EMAIL="<ADMIN_EMAIL>"
  read -rsp "Admin password (min 12 chars): " BOOTSTRAP_ADMIN_PASSWORD; echo
  export BOOTSTRAP_ADMIN_PASSWORD
  node src/scripts/bootstrapAdmin.js
'
```
Then **log in through the UI and change that password immediately**.

**No SQL-style migrations:** MongoDB has no schema versioning here. Schema changes are handled by Mongoose defaults; anything destructive needs a one-off script — always `mongodump` first (§13).

---

## 6. Process management with systemd

```bash
install -m 644 /opt/actify/current/deploy/actify-api.service /etc/systemd/system/actify-api.service
systemctl daemon-reload
systemctl enable --now actify-api
systemctl status actify-api --no-pager
journalctl -u actify-api -n 50 --no-pager
```

The unit file (also committed as `deploy/actify-api.service`):

```ini
[Unit]
Description=Actify API (Express)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=actify
Group=actify
WorkingDirectory=/opt/actify/current/server
EnvironmentFile=/etc/actify/api.env
Environment=NODE_ENV=production
Environment=TZ=Asia/Kolkata
Environment=PUPPETEER_CACHE_DIR=/var/lib/actify/.cache/puppeteer
ExecStart=/usr/bin/node --enable-source-maps --max-old-space-size=768 src/server.js
Restart=always
RestartSec=5
TimeoutStopSec=30
KillSignal=SIGTERM

# --- hardening ---
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/actify
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictSUIDSGID=true
LockPersonality=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
SystemCallFilter=@system-service
SystemCallErrorNumber=EPERM

# --- resources (adjust to VM size) ---
LimitNOFILE=65535
MemoryMax=1G

[Install]
WantedBy=multi-user.target
```

Notes:
- `ReadWritePaths=/var/lib/actify` is what makes the uploads symlink writable under `ProtectSystem=strict`. If you changed `UPLOAD_DIR`, keep this path consistent.
- `MemoryMax=1G` on a 2 GB VM: Chromium spikes during PDF generation. If PDFs fail with `Target closed` or OOM, raise to `1600M` and confirm swap (§1.4).
- Always `systemctl restart`, never `kill -9` — the app shuts down on `SIGTERM`.

Operations:

```bash
systemctl restart actify-api                  # deploy or env change
journalctl -u actify-api -f                   # live logs
journalctl -u actify-api --since "1 hour ago" -p err
systemd-analyze security actify-api           # hardening score
```

> **Docker users:** skip §6-§8 and use Appendix A instead (Nginx and Certbot are containerised there too).

---

## 7. Nginx reverse proxy

```bash
install -m 644 /opt/actify/current/deploy/nginx-actify.conf /etc/nginx/sites-available/actify
ln -sfn /etc/nginx/sites-available/actify /etc/nginx/sites-enabled/actify
rm -f /etc/nginx/sites-enabled/default      # safe: it is only a symlink
nginx -t
systemctl reload nginx
```

Replace `<DOMAIN>` / `<WWW_DOMAIN>` in the file before `nginx -t`, or the test fails (intentionally — it forces the substitution).

`deploy/nginx-actify.conf` — HTTP-only; Certbot rewrites it in §8:

```nginx
limit_req_zone $binary_remote_addr zone=actify_api:10m   rate=20r/s;
limit_req_zone $binary_remote_addr zone=actify_login:10m rate=10r/m;

upstream actify_api {
    server 127.0.0.1:5002;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name <DOMAIN> <WWW_DOMAIN>;

    # Reports carry up to 25 files; keep >= the multer limits from review §A7
    client_max_body_size 120m;
    client_body_timeout 120s;

    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    root /var/www/actify;
    index index.html;

    # ---- SPA ----
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    # ---- API ----
    location /api/ {
        limit_req zone=actify_api burst=40 nodelay;
        proxy_pass http://actify_api;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection        "";
        proxy_read_timeout 120s;      # Puppeteer PDF generation can take 10-60s
        proxy_send_timeout 120s;
    }

    # Credential and mail endpoints get a much tighter budget
    location = /api/auth/login {
        limit_req zone=actify_login burst=5 nodelay;
        proxy_pass http://actify_api;
        include proxy_params;
    }
    location = /api/auth/register {
        limit_req zone=actify_login burst=3 nodelay;
        proxy_pass http://actify_api;
        include proxy_params;
    }
    location = /api/contact {
        limit_req zone=actify_login burst=3 nodelay;
        proxy_pass http://actify_api;
        include proxy_params;
    }

    # ---- uploaded files (currently served by Node; see review §B1) ----
    location /uploads/ {
        limit_req zone=actify_api burst=60 nodelay;
        proxy_pass http://actify_api;
        proxy_set_header Host $host;
        expires 7d;
        add_header Cache-Control "public";
    }

    # ---- security headers ----
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    access_log /var/log/nginx/actify.access.log;
    error_log  /var/log/nginx/actify.error.log warn;
}
```

Publish the SPA build and hand it to `www-data`:

```bash
install -d -o www-data -g www-data -m 755 /var/www/actify
rsync -a --delete /opt/actify/current/client/dist/ /var/www/actify/
chown -R www-data:www-data /var/www/actify
```

Verify before touching TLS:

```bash
curl -I http://<SERVER_IP>/                                                # 200 text/html
curl -s http://<SERVER_IP>/api/events/ping                                 # "Events API alive"
curl -s -o /dev/null -w '%{http_code}\n' http://<SERVER_IP>/admin/users    # 200 (SPA fallback, not 404)
```

---

## 8. HTTPS with Let's Encrypt

```bash
# 8.1 Issue and auto-configure Nginx (--redirect adds the HTTP->HTTPS block)
certbot --nginx -d <DOMAIN> -d <WWW_DOMAIN> --agree-tos -m <ADMIN_EMAIL> --redirect --no-eff-email
```

```bash
# 8.2 Prove renewal works — do not skip this step
certbot renew --dry-run
systemctl list-timers | grep -i certbot
```

```bash
# 8.3 Enable HSTS only after both hostnames answer over HTTPS
#     Add inside the :443 server block, then: nginx -t && systemctl reload nginx
#     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

```bash
# 8.4 Final TLS verification
curl -I https://<DOMAIN>/
curl -sI https://<DOMAIN>/ | grep -i strict-transport-security
echo | openssl s_client -connect <DOMAIN>:443 -servername <DOMAIN> 2>/dev/null \
  | openssl x509 -noout -dates -issuer
```

Expect: HTTP returns `301` to HTTPS, the chain is valid, `notAfter` is ~90 days out, and `certbot renew --dry-run` reports success.

---

## 9. Firewall

```bash
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status verbose
```

Expected:

```text
22/tcp                    ALLOW IN    Anywhere
80,443/tcp (Nginx Full)   ALLOW IN    Anywhere
```

```bash
# Prove the API port is not publicly reachable.
# On your laptop — must time out or be refused:
nc -zv <SERVER_IP> 5002
# On the server — must still answer locally:
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:5002/
```

> Most cloud providers also have a second firewall (Security Group / NSG). Mirror these rules there.
> If you self-host MongoDB (Appendix B), open `27017` only to trusted IPs — never to `Anywhere`.

---

## 10. Testing

### 10.1 Automated smoke test

> The `/health` check needs the endpoint described in §11.3 (review §B9). Until you add it, drop that one line — the rest of the suite works against the current code.

```bash
cat > /opt/actify/smoke.sh <<'EOF'
#!/usr/bin/env bash
set -uo pipefail
BASE="${BASE:-}"
EMAIL="${EMAIL:-}"
PASS="${PASS:-}"
[ -z "$BASE" ] || [ -z "$EMAIL" ] || [ -z "$PASS" ] && { echo "usage: BASE=.. EMAIL=.. PASS=.. $0"; exit 2; }

fail=0
chk() { printf '%-34s got=%-4s want=%s\n' "$1" "$2" "$3"; [ "$2" = "$3" ] || fail=1; }

chk "GET /"                "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/")" 200
chk "GET /health"          "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/health")" 200
chk "SPA deep link"        "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/admin/users")" 200
chk "API ping"             "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/api/events/ping")" 200
chk "unauth blocked"       "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/api/activity/mine")" 401

TOKEN=$(curl -s -X POST "$BASE/api/auth/login" -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}" \
  | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
if [ -n "$TOKEN" ]; then echo "login: token acquired"; else echo "login: FAILED"; fail=1; fi

chk "auth /me"             "$(curl -s -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $TOKEN" "$BASE/api/auth/me")" 200
chk "admin user list"      "$(curl -s -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $TOKEN" "$BASE/api/auth/users")" 200

echo "---"; echo "result: $([ $fail -eq 0 ] && echo PASS || echo FAIL)"
exit $fail
EOF
chmod 750 /opt/actify/smoke.sh

BASE="https://<DOMAIN>" EMAIL="<ADMIN_EMAIL>" PASS='<ADMIN_PASSWORD>' /opt/actify/smoke.sh
```

### 10.2 Manual acceptance tests (on the real domain, once)

| # | Test | Expected |
|---|---|---|
| 1 | Log in via the UI as the bootstrap admin | Dashboard loads, no CORS error in the browser console |
| 2 | Hard-refresh `https://<DOMAIN>/admin/list` | Renders (SPA fallback), not 404 |
| 3 | Create a report as `faculty` with 3 photos + 1 PDF | 201; images visible on the report page |
| 4 | DevTools → Network → image requests | Go to `https://<DOMAIN>/uploads/...`, **never** `localhost:5002` |
| 5 | Open a report → "Download PDF" | Valid A4 PDF with header image. **This is the Puppeteer path** — if it 500s, check `journalctl -u actify-api` for `Failed to launch the browser` |
| 6 | Download DOCX | Opens in Word/LibreOffice with images intact |
| 7 | Contact form | Mail arrives at `EMAIL_USER`; check spam |
| 8 | Register with a non-`@atria.edu.in` address | Rejected with the validation message |
| 9 | Run a reminder job manually (§11.4) | Mail sent, process does **not** restart |
| 10 | `systemctl restart actify-api` mid-session | Short error, then recovery; no data loss |
| 11 | 5 simultaneous PDF downloads | All succeed; watch `htop` — this is your memory ceiling |

### 10.3 Load sanity

```bash
apt -y install apache2-utils
ab -n 200 -c 20 https://<DOMAIN>/
ab -n 100 -c 10 https://<DOMAIN>/api/events/ping
```

---

## 11. Logging

```bash
# 11.1 Application logs go to journald; bound their size
install -d /etc/systemd/journald.conf.d
printf '[Journal]\nSystemMaxUse=500M\nMaxRetentionSec=14day\n' \
  > /etc/systemd/journald.conf.d/99-actify.conf
systemctl restart systemd-journald
journalctl --disk-usage
```

```bash
# 11.2 Nginx logs are rotated by the distro's logrotate config
ls -l /var/log/nginx/
logrotate -d /etc/logrotate.d/nginx | head -20
```

```bash
# 11.3 Make sure the service writes actionable logs (review §B9):
#   - add helmet + pino-http (or morgan) to server.js
#   - add a DB-aware health endpoint:
#       app.get("/health", (req, res) => {
#         const up = mongoose.connection.readyState === 1;
#         res.status(up ? 200 : 503).json({ status: up ? "ok" : "degraded", db: up });
#       });
```

```bash
# 11.4 Run a cron job manually instead of waiting until 09:00/10:00
sudo -u actify -H bash -lc 'cd /opt/actify/current/server && set -a && . /etc/actify/api.env && set +a && \
  node -e "import(\"./src/jobs/reportRemainderJob.js\").then(()=>setTimeout(()=>process.exit(0),8000))"'
journalctl -u actify-api -n 30 --no-pager     # expect the job log lines, no stack trace
```

```bash
# 11.5 Confirm the process timezone is IST, not UTC
sudo -u actify -H bash -lc 'set -a && . /etc/actify/api.env && set +a && date && \
  node -e "console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)"'
```

---

## 12. Monitoring

```bash
# 12.1 External uptime monitoring (recommended, free tiers exist)
#   Probe https://<DOMAIN>/health every 60s — expect 200 + {"db":"up"}
#   Add a dead-man's-switch ping at the end of each reminder job (healthchecks.io)
#   so a silently-dead cron is noticed.
```

```bash
# 12.2 Daily local health snapshot to the journal
cat > /etc/systemd/system/actify-health.service <<'EOF'
[Unit]
Description=Actify daily health snapshot
[Service]
Type=oneshot
ExecStart=/bin/bash -lc 'echo "--- disk"; df -h / | tail -1; echo "--- mem"; free -m | head -2; echo "--- api"; systemctl is-active actify-api; echo "--- http"; curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:5002/health'
EOF
printf '[Unit]\nDescription=Actify daily health snapshot\n\n[Timer]\nOnCalendar=*-*-* 07:00:00\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n' \
  > /etc/systemd/system/actify-health.timer
systemctl daemon-reload && systemctl enable --now actify-health.timer
```

```bash
# 12.3 Alerts worth having from day one
#   - disk > 80%           (uploads grow forever until you add retention)
#   - actify-api not active
#   - /health non-200 for 2 consecutive checks
#   - TLS expiry < 14 days (certbot timer + an external check)
```

Optional: `@sentry/node` for exception tracing, with `tracesSampleRate: 0.1`.

---

## 13. Backups

Back up three things: **MongoDB**, **uploads**, and **configuration**.

```bash
install -d -o actify -g actify -m 750 /var/backups/actify /var/lib/actify/bin
install -m 750 -o actify -g actify /opt/actify/current/deploy/backup-actify.sh /var/lib/actify/bin/backup-actify.sh
```

```bash
# 13.1 First run, by hand, then inspect the artifacts
sudo -u actify -H bash -lc 'set -a && . /etc/actify/api.env && set +a && /var/lib/actify/bin/backup-actify.sh'
ls -lh /var/backups/actify/
```

`deploy/backup-actify.sh` produces, per run:

- `db-<timestamp>.archive.gz` — `mongodump` of the whole database
- `uploads-<timestamp>.tar.gz` — the upload volume
- `config-<timestamp>.tar.gz` — `/etc/actify` (secrets: written mode `600`)

```bash
# 13.2 Nightly at 02:30 IST
cat > /etc/systemd/system/actify-backup.service <<'EOF'
[Unit]
Description=Actify nightly backup
After=network-online.target
[Service]
Type=oneshot
User=actify
Group=actify
EnvironmentFile=/etc/actify/api.env
ExecStart=/var/lib/actify/bin/backup-actify.sh
EOF
printf '[Unit]\nDescription=Actify nightly backup\n\n[Timer]\nOnCalendar=*-*-* 02:30:00\nPersistent=true\nRandomizedDelaySec=300\n\n[Install]\nWantedBy=timers.target\n' \
  > /etc/systemd/system/actify-backup.timer
systemctl daemon-reload && systemctl enable --now actify-backup.timer
systemctl list-timers actify-backup.timer
```

```bash
# 13.3 Ship offsite — a backup on the same disk is not a backup
apt -y install rclone
sudo -u actify -H rclone config          # create a remote named "offsite"
# The script already calls: rclone copy /var/backups/actify offsite:actify-backups
```

```bash
# 13.4 Restore drill — rehearse this before you need it
# Pick the newest dump
LATEST=$(ls -1t /var/backups/actify/db-*.archive.gz | head -1)
echo "restoring $LATEST into actify_restore_test"
sudo -u actify -H bash -lc "set -a && . /etc/actify/api.env && set +a && \
  mongorestore --uri \"\$MONGO_URI\" --archive='$LATEST' --gzip \
  --nsFrom='actify.*' --nsTo='actify_restore_test.*' --drop"
mongosh "<MONGO_URI>" --quiet --eval 'db.getSiblingDB("actify_restore_test").users.countDocuments()'
# then drop the scratch DB after verifying:
# mongosh "<MONGO_URI>" --eval 'db.getSiblingDB("actify_restore_test").dropDatabase()'
```

Never restore over production without taking a fresh pre-restore dump first.

---

## 14. Update and rollback

### 14.1 Deploy a new version (tag-based)

```bash
# On your laptop
git tag -a v1.2.0 -m "release 1.2.0" && git push origin v1.2.0
```

```bash
# On the server
install -m 750 -o actify -g actify /opt/actify/current/deploy/deploy.sh /var/lib/actify/bin/deploy.sh
sudo -u actify -H /var/lib/actify/bin/deploy.sh v1.2.0
```

`deploy/deploy.sh` performs, in order:
1. clone the tag into `/opt/actify/releases/<UTC-timestamp>`
2. `npm ci --omit=dev` (server), `npm ci` + `npm run build` (client)
3. relink `server/src/uploads` → `/var/lib/actify/uploads`
4. `rsync` the new `dist/` into `/var/www/actify`
5. flip `/opt/actify/current`
6. `systemctl restart actify-api`
7. poll the health endpoint for up to 30 s
8. **auto-rollback** to the previous release if the health check fails

### 14.2 Manual rollback

```bash
ls -1 /opt/actify/releases/                      # newest last
PREV=$(ls -1 /opt/actify/releases/ | tail -2 | head -1)
echo "rolling back to $PREV"

ln -sfn "/opt/actify/releases/$PREV" /opt/actify/current
systemctl restart actify-api
rsync -a --delete "/opt/actify/releases/$PREV/client/dist/" /var/www/actify/
sleep 5
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:5002/health
journalctl -u actify-api -n 30 --no-pager
```

### 14.3 Database changes and rollback boundaries

- **Adding** fields or indexes: safe — deploy the code first.
- **Renaming or removing** fields: ship code that reads both, backfill, then remove — never in one release.
- **Destructive scripts:** `mongodump` immediately before, keep the dump until verified.
- Rolling back code does **not** roll back data. Only a backup (§13) does.

### 14.4 Prune old releases

```bash
ls -1dt /opt/actify/releases/* | tail -n +6
# Review the list, then remove those directories individually, e.g.:
# rm -rf /opt/actify/releases/20260101010101
```

---

## 15. Go-live checklist

```text
[ ] All 7 blocking items in docs/deployment-review.md §A fixed and pushed
[ ] MongoDB + Gmail credentials ROTATED; JWT_SECRET is 48+ random bytes
[ ] Atlas network access restricted to <SERVER_IP>/32
[ ] /etc/actify/api.env is root:actify 0640; no secrets in git history
[ ] systemctl is-active actify-api = active; enabled at boot
[ ] ufw shows only 22, 80, 443; port 5002 unreachable from outside
[ ] HTTPS valid on apex AND www; certbot renew --dry-run passes
[ ] SPA deep link 200; /api/* 401 when unauthenticated
[ ] Login -> create report with images -> PDF download all work on https://<DOMAIN>
[ ] Images resolve to the production host, not localhost:5002
[ ] Reminder cron fires in IST and does not restart the service
[ ] Nightly backup timer ran once; restore drill passed
[ ] Uptime monitor on /health; disk alert at 80%
[ ] Bootstrap admin password changed from the one used in §5.4
[ ] Rollback rehearsed once (§14.2) against the real server
```

---

## Appendix A — Docker alternative

Use this **instead of** §6-§8. Nginx and Certbot run in the stack; the SPA is baked into an Nginx image.

`deploy/Dockerfile.api`:

```dockerfile
FROM node:24-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates fonts-liberation fonts-dejavu-core \
      libasound2 libatk1.0-0 libatk-bridge2.0-0 libcairo2 libcups2 libdbus-1-3 \
      libexpat1 libgbm1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 \
      libpangocairo-1.0-0 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxdamage1 \
      libxext6 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY server/package*.json ./
RUN PUPPETEER_CACHE_DIR=/home/node/.cache/puppeteer npm ci --omit=dev \
 && PUPPETEER_CACHE_DIR=/home/node/.cache/puppeteer npx puppeteer browsers install chrome
COPY server/ ./

ENV NODE_ENV=production \
    PUPPETEER_CACHE_DIR=/home/node/.cache/puppeteer
USER node
EXPOSE 5002
CMD ["node", "src/server.js"]
```

`deploy/Dockerfile.web`:

```dockerfile
FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist/ /usr/share/nginx/html/
```

`deploy/docker-compose.yml`:

```yaml
services:
  api:
    build: { context: .., dockerfile: deploy/Dockerfile.api }
    restart: unless-stopped
    env_file: [/etc/actify/api.env]
    volumes:
      - /var/lib/actify/uploads:/app/src/uploads
    expose: ["5002"]
    mem_limit: 1g
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:5002/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
      interval: 30s
      timeout: 5s
      retries: 3

  web:
    build:
      context: ..
      dockerfile: deploy/Dockerfile.web
      args: { VITE_API_BASE_URL: "/api" }
    restart: unless-stopped
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx-docker.conf:/etc/nginx/conf.d/default.conf:ro
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on: [api]

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    entrypoint: /bin/sh -c 'trap exit TERM; while :; do certbot renew --webroot -w /var/www/certbot; sleep 12h & wait $${!}; done'
```

```bash
docker compose up -d api web
docker compose run --rm certbot certonly --webroot -w /var/www/certbot \
  -d <DOMAIN> -d <WWW_DOMAIN> --agree-tos -m <ADMIN_EMAIL> --no-eff-email
docker compose up -d
```

Docker notes:
- `api` uses `expose`, not `ports` — only the `web` container is public.
- Chromium still needs `--no-sandbox` inside the container (already in the code); `mem_limit` protects the host.
- Deploy becomes `docker compose build && docker compose up -d`; rollback becomes checking out the previous tag and repeating.

---

## Appendix B — Self-hosting MongoDB instead of Atlas

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc \
  | gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/8.0 multiverse" \
  | tee /etc/apt/sources.list.d/mongodb-org-8.0.list
apt update && apt -y install mongodb-org
```

```bash
# Bind to loopback only — the API reaches it on 127.0.0.1
sed -i 's/^#\? *bindIp:.*/  bindIp: 127.0.0.1/' /etc/mongod.conf
systemctl enable --now mongod
systemctl status mongod --no-pager
```

```bash
# Least-privilege application user
mongosh --quiet --eval '
  db.getSiblingDB("actify").createUser({
    user: "actify_app",
    pwd: passwordPrompt(),
    roles: [{ role: "readWrite", db: "actify" }]
  })'
# MONGO_URI=mongodb://actify_app:<PASS>@127.0.0.1:27017/actify?authSource=actify
```

Trade-offs: you own patching, replication and disk. For a single-VM academic deployment, keep Atlas (already configured) and rely on Atlas backups plus the `mongodump` job in §13.
