# Actify — Production Readiness Review

**Reviewed commit:** `1629561` ("home page updation") on `master`
**Review scope:** `client/` (React 19 + Vite 7 SPA) and `server/` (Express 4 ESM API + MongoDB/Mongoose 7)
**Target:** Ubuntu 22.04 / 24.04 LTS cloud VM, single node, Nginx + Let's Encrypt

**Verdict: NOT deployable as-is.** The application builds and its JavaScript is syntactically valid, but 7 blocking defects would cause an immediate production failure or a security incident. All are small, well-localised fixes — see section A.

---

## 0. What the project actually is

| Layer | Technology | Evidence |
|---|---|---|
| Frontend | React 19.2, Vite 7.3, MUI 7, React Router 7, Zustand, Axios | `client/package.json` |
| Backend | Express 4.22 (ESM), Mongoose 7.8, JWT, bcryptjs, multer 1.4, nodemailer 8, node-cron 4, puppeteer 21, docx 8 | `server/package.json`, `server/src` |
| Database | MongoDB (currently **MongoDB Atlas** cloud cluster) | `server/.env` → `MONGO_URI` |
| File storage | Local disk — `server/src/uploads` | `server/src/routes/activityRoutes.js:17`, `activityController.js:22` |
| PDF generation | Puppeteer renders `server/templates/report_template.html` → A4 PDF | `activityController.js:383-430` |
| Mail | Gmail SMTP (`smtp.gmail.com:587`, app password) | `server/src/utils/emailService.js` |
| Scheduled work | In-process cron: 09:00 event reminders, 10:00 report reminders | `server/src/jobs/*.js` |
| Build output | `client/dist` — 689 kB JS (210 kB gzip), 27 kB CSS | verified `npm run build` |
| API surface | `/api/auth`, `/api/activity`, `/api/events`, `/api/notifications`, `/api/home-content`, `/api/stats`, `/api/departments`, `/api/contact`, `/api/admin`, `/uploads` | `server/src/server.js:63-88` |
| API port | `5002` (`PORT` env, default 5002) | `server/server.js:92` |

Verified locally: `npm run build` (client) **succeeds**; `node --check` on every server file **passes**; `npm audit` reports **16 vulnerabilities** server-side (1 critical, 13 high) and **6** client-side (4 high).

---

## A. Blocking issues — fix before any deployment

### A1. Frontend API base URL is hardcoded to `localhost`
`client/src/utils/axiosClient.js:8`
```js
baseURL: "http://localhost:5002/api",
```
In production this resolves to **the visitor's own machine**, so every login, list and upload fails. `client/src/pages/Faculty/ViewMyReport.jsx:30` derives image URLs from the same value, so uploaded posters/attendance images break too.

**Fix** (both files keep working because `ViewMyReport` derives from `axiosClient.defaults.baseURL`):
```js
// client/src/utils/axiosClient.js
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api";

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});
```
```bash
# client/.env.production  (rebuild required — Vite inlines env at build time)
VITE_API_BASE_URL=https://example.com/api
```
> Placeholder: `example.com` → your real domain. If the SPA and API share a domain behind Nginx (recommended, runbook §4 and §7), use the **relative** value `/api` and CORS becomes a non-issue.

### A2. Puppeteer launches a macOS Chrome binary
`server/src/controllers/activityController.js:385`
```js
executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
```
On Ubuntu this path does not exist → **every PDF download returns 500**. It also hard-codes one developer's machine.

**Fix:**
```js
const browser = await puppeteer.launch({
  headless: "new",
  ...(process.env.PUPPETEER_EXECUTABLE_PATH
    ? { executablePath: process.env.PUPPETEER_EXECUTABLE_PATH }
    : {}),
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  timeout: 60000,
});
```
Leave `PUPPETEER_EXECUTABLE_PATH` unset and let Puppeteer use the Chrome it downloads at install time (runbook §5.3); set it only if you install Chrome from a `.deb`.

### A3. Live secrets are committed to Git
`server/.env` is **tracked** and contains:
- a MongoDB Atlas connection string **with the database password in plain text** (`mongodb+srv://<user>:<password>@<cluster>.mongodb.net/...`),
- a Gmail **app password** (`EMAIL_PASS`),
- `JWT_SECRET=yourSecretHere` — i.e. **no secret at all**; every token in the wild is forged with a publicly guessable key.

`client/.env` is tracked (empty). `server/.gitignore` ignores `node_modules` and `uploads` but not `.env`.

**Fix — do all five:**
```bash
# 1. Stop tracking, keep local copies
cd /Users/pratyushachowdary/Documents/other/Actify
git rm --cached server/.env client/.env
printf '\n.env\n.env.*\n!.env.example\n' | tee -a server/.gitignore client/.gitignore

# 2. Rotate the credentials (assume the repo is already exposed)
#    - Atlas: Database Access → edit user → Edit Password. Then get a NEW connection string.
#    - Google: myaccount.google.com → Security → App passwords → revoke, create a new one.
#    - Generate a strong JWT secret:
openssl rand -base64 48

# 3. Commit
git add .gitignore server/.gitignore client/.gitignore
git commit -m "chore: untrack env files, ignore secrets"
```
```bash
# 4. Purge the secrets from history (rewrites history — coordinate with your team)
pip install git-filter-repo   # or: brew install git-filter-repo
git filter-repo --invert-paths --path server/.env --path client/.env --force
# then force-push and have every collaborator re-clone
git push --force --all && git push --force --tags
```
```bash
# 5. Invalidate existing sessions
#    Rotating JWT_SECRET already logs everyone out (all 7-day tokens become invalid) — expected.
```
Add `deploy/env.server.example` (provided) and reference it from the README as the documented contract.

### A4. The report-reminder cron job crashes the process every day at 10:00
`server/src/jobs/reportRemainderJob.js:22` calls `Report.findOne(...)`, but the model is imported as `activity` (line 3) — `Report` is **undefined**. The call happens inside an `async` cron callback, so it throws a `ReferenceError` as an unhandled rejection, which Node ≥15 treats as fatal: **the API dies daily at 10:00 server-local time** (systemd will restart it, but in-flight requests are dropped). Line 24 also dereferences `faculty._id` without a null guard on the populated ref.

**Fix:**
```js
import Activity from "../models/Activity.js";           // line 3
...
for (const reg of event.registrations) {
  const faculty = reg.faculty;
  if (!faculty?._id) continue;                          // guard unpopulated refs
  const report = await Activity.findOne({ faculty: faculty._id, event: event._id });
  if (!report) { ... send email ... }
}
```
Additionally wrap both job bodies in `try/catch` so one SMTP failure cannot take the process down, and add to `server.js`:
```js
process.on("unhandledRejection", (err) => console.error("Unhandled rejection:", err));
process.on("uncaughtException",  (err) => console.error("Uncaught exception:", err));
```
(Log-and-continue for unhandled rejections is appropriate here; `uncaughtException` should still be allowed to exit under systemd.)

### A5. CORS allows only `http://localhost:5173`
`server/src/server.js:31-37` — a cross-origin deployment from `https://example.com` is rejected by the browser, so the whole API appears dead even though `curl` works.

**Fix:**
```js
const allowed = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",").map(s => s.trim()).filter(Boolean);

app.set("trust proxy", 1);   // behind Nginx — correct client IPs and rate limits

app.use(cors({
  origin: (origin, cb) =>
    !origin || allowed.includes(origin) ? cb(null, true) : cb(new Error("Not allowed by CORS")),
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
```
Note: `credentials: true` + `origin: "*"` is invalid; the allowlist above avoids that.

### A6. `server/node_modules` is committed (3 052 files, ~62 MB)
`git ls-files` shows it tracked. It bloats clones (`.git` is 21 MB), will silently shadow a correct `npm ci`, and can resurrect macOS-built artifacts. It also means the deploy host gets code you never reviewed.

**Fix:**
```bash
git rm -r --cached server/node_modules
printf 'node_modules/\n' >> server/.gitignore
echo 'node_modules/' > client/.gitignore.tmp && cat client/.gitignore.tmp >> client/.gitignore && rm client/.gitignore.tmp
git commit -m "chore: stop tracking node_modules"
```
(`client/node_modules` is already ignored, but `client/dist` is ignored too — build on the server, do not commit it.)

### A7. Uploads are written inside the source tree
`server/src/routes/activityRoutes.js:17` and `activityController.js:22` both compute `path.join(__dirname, "..", "uploads")` → `server/src/uploads`. Consequences on a server: the deploy directory must be writable by the app user (fights `ProtectSystem=strict`), **uploads are lost on every redeploy** unless you handle it, and there is no size cap (`multer({ storage })` at `activityRoutes.js:38`).

**Fix — minimal (keep code) + safe:** point a symlink at persistent storage, and add limits:
```js
const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024, files: 25 },   // 25 MB/file, 25 files/request
});
```
```bash
sudo mkdir -p /var/lib/actify/uploads && sudo chown actify:actify /var/lib/actify/uploads
sudo ln -sfn /var/lib/actify/uploads /opt/actify/server/src/uploads
```
**Fix — better (small code change):** `const UPLOADS_DIR = process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads");` in both files, then set `UPLOAD_DIR=/var/lib/actify/uploads`. Do this if you plan to move to S3/Spaces later.

---

## B. High-priority issues — fix before or immediately after launch

| # | Issue | Location | Impact | Fix |
|---|---|---|---|---|
| B1 | `/uploads` served as public static files; filenames are `Date.now()-name` (enumerable by timing) | `server.js:46` | Attendance sheets, invitation letters, feedback screenshots (personal data) readable by anyone with a URL, no auth | Serve via authenticated route that checks ownership/role, or use unguessable names (`crypto.randomUUID()`) + short-lived signed URLs |
| B2 | No rate limiting on login/register/contact | `authRoutes.js`, `contactRoutes.js` | Credential stuffing; contact form is an open Gmail relay (also `from: <user input>`, which Gmail will reject or flag as spoofing) | Add `express-rate-limit` (e.g. 10 req/15 min/IP on `/api/auth/login`, 5/hour on `/api/contact`); set `from` to your own address and put the submitter in `replyTo` |
| B3 | `updateActivity` has no ownership check | `activityController.js:148` | Any `faculty` user can edit **any** report by ID | `if (role !== 'faculty' || String(a.createdBy) === String(req.user._id))` before update |
| B4 | `getActivity` returns any report to any authenticated user | `activityController.js:134` | Cross-department data exposure | Scope by role (faculty → own, hod → own department, admin/principal → all) |
| B5 | Event create/delete lack role checks | `eventRoutes.js:25,27` | Any registered user can create or (own) delete events | `roleMiddleware("faculty","hod","admin")` on create |
| B6 | No HTML escaping in transactional emails | `eventReminderJob.js`, `reportRemainderJob.js`, `contactRoutes.js` | User-controlled `name`/`title` injected into HTML mail | Escape or use a template with escaped interpolation |
| B7 | 16 server / 6 client vulnerable packages (`npm audit`) | see below | Known exploits reachable in production | Upgrade (details below) |
| B8 | No security headers | `server.js` | Missing HSTS/X-Content-Type nosniff/frame protection | `helmet()` + Nginx headers (runbook §7) |
| B9 | No request logging, no `/health` with a DB ping | `server.js` | Cannot diagnose incidents; no reliable LB/systemd probe | Add `pino-http`/`morgan` + `GET /health` returning `{db:"up"}` from `mongoose.connection.readyState` |
| B10 | `connectDB()` is not awaited; `app.listen` starts regardless | `server.js:49,94` | Accepts traffic before the DB is ready; a bad URI looks "up" | `await connectDB()` before `listen`, exit non-zero on failure |
| B11 | No graceful shutdown | `server.js` | Restarts drop in-flight requests and half-written uploads | `SIGTERM` → `server.close()` + `mongoose.connection.close()` with a 15 s timeout |
| B12 | No indexes on `Activity` | `models/Activity.js` | Department/stats/list queries scan the collection | `{ department: 1, status: 1 }`, `{ createdBy: 1, createdAt: -1 }`, `{ event: 1, faculty: 1 }` |
| B13 | Cron runs in-process | `jobs/*.js` | Two app instances = duplicate emails; a restart during the job = missed reminders | Keep single instance (systemd), or move to a systemd timer hitting an internal endpoint |
| B14 | Cron has no timezone | `jobs/*.js` | Fires at 09:00/10:00 **UTC** on a default cloud image, not IST | `TZ=Asia/Kolkata` in the systemd unit |
| B15 | `client/package.json` declares a dependency on `node@^25.2.0` **and** `engines.node: 24.x` | `client/package.json` | The `node` npm package downloads a Node binary into `node_modules`; contradiction with engines; needless install weight | Remove the `node` dependency; keep a single `engines` value that matches the CI/prod runtime |
| B16 | Vite build warns: `@import` must precede all other statements | `client/src/pages/HomePage.css:373` | The Google Fonts import is **dropped**, so Inter never loads in production | Move the `@import` to line 1, or add `<link rel="preconnect">` + `<link href="…Inter…">` in `client/index.html` |
| B17 | SPA history fallback relies on Netlify `_redirects` | `client/public/_redirects` | Deep links 404 on Nginx | `try_files $uri $uri/ /index.html;` (runbook §7); keep `_redirects` only if you also host on Netlify |
| B18 | `seedDepartments.js` hardcodes `mongodb://localhost:27017/actirepo`, calls `deleteMany({})`, and exits | `server/src/scripts/seedDepartments.js` | Cannot run on prod as written; destructive if pointed at the real DB | Use `MONGO_URI` from env, guard with a confirmation flag, and make it idempotent (`updateOne(..., {upsert:true})`) |
| B19 | No path for creating the first admin | `authController.addUser` requires an existing admin | Chicken-and-egg: fresh DB has no admin, and public registration blocks privileged roles | Bootstrap script (runbook §5.4) |
| B20 | `.DS_Store` files committed; no root `README.md`, `.gitignore`, or `.env.example` | repo root | Noise / missing onboarding contract | Remove, add |

### Dependency vulnerabilities (verified with `npm audit --omit=dev`)

**Server — 16 (1 critical, 13 high, 2 moderate).** The two that matter at runtime:
- `proxy-addr` **critical** (1.1.0–2.0.7) — IP spoofing via IPv4-mapped IPv6; transitively via `express`. Fix: upgrade Express within 4.x (`npm audit fix`), or pin `proxy-addr@^2.0.8`.
- `nodemailer` **high** ≤10.1.3 — SMTP/CRLF command injection. Installed: `8.0.3`. Fix: upgrade to `nodemailer@^10.1.4` (check the `createTransport` API — your usage is compatible) and remove the duplicate transporter in `contactRoutes.js` in favour of `utils/emailService.js`.
- Also flagged: `body-parser`, `qs`, `path-to-regexp` (Express 4 chain), `tar-fs`, `ws`, `extract-zip`, `basic-ftp`, `ip-address`, `nanoid`, `js-yaml` (all pulled in by `puppeteer@21`), `mongoose@7.8.9` moderate (prototype pollution via `__proto__`-prefixed update paths — relevant to `findByIdAndUpdate(req.params.id, payload)`).

**Client — 6 (4 high, 2 moderate)**: `react-router` / `react-router-dom` 7.13.1 (DoS via route matching, open redirect, stored XSS in prerendered redirects) and `yaml` via `cosmiconfig`. Fix: `npm audit fix`, then `npm ci && npm run build`.

Suggested dependency refresh (test on a branch first):
```bash
cd server && npm audit fix && npm install nodemailer@^10 puppeteer@^24 && npm audit
cd ../client && npm audit fix && npm install react-router-dom@^7.14 && npm audit
```
After upgrading Puppeteer, re-run the PDF test (runbook §10.2, test #5) — that is the one flow most likely to regress.

---

## C. Requirement checklist

| Requirement | Status | Evidence | Action |
|---|---|---|---|
| **Dependencies declared & lockfile present** | ✅ Pass | `package-lock.json` v3 in both packages | Use `npm ci` on the server |
| **Lockfile usable on Linux** | ⚠️ Risk | `server/node_modules` committed from macOS | Untrack it; always `npm ci` on the host |
| **Runtime version pinned** | ⚠️ Partial | `client`: `engines.node: 24.x`; `server`: none | Add `"engines": { "node": ">=22.12 <25" }` to `server/package.json`; install Node 24 LTS |
| **Node version consistency** | ❌ Fail | Local machine runs `v22.23.2`; `engines` says 24.x; client also depends on `node@^25.2.0` | Choose Node 24 LTS, remove the `node` dependency, add `.nvmrc` |
| **Environment variables documented** | ❌ Fail | No `.env.example`; `server/.env` tracked; client uses none | Add `deploy/env.server.example`, `deploy/env.client.example` |
| **Secrets out of VCS** | ❌ Fail | `server/.env` tracked with live credentials | A3 |
| **Env vars actually used by code** | ✅ Pass | Only `PORT`, `MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS` are read | Minimum viable set; add `CORS_ORIGINS`, `UPLOAD_DIR`, `NODE_ENV` |
| **Database configured for prod** | ⚠️ Partial | Atlas URI usable, but password leaked and no IP allowlist documented | Rotate; restrict Atlas access to the server IP; enable backups; use a `readWrite` (not `atlasAdmin`) user |
| **DB migrations / init** | ⚠️ Partial | No migration tool; `seedDepartments.js` is hardcoded + destructive; no admin bootstrap | Runbook §5.4 |
| **Storage configured for prod** | ❌ Fail | Files land in `server/src/uploads` (source tree), no size limits, publicly served | A7 + B1 |
| **Build command defined** | ✅ Pass | `client: npm run build` (verified, 5.7 s) | — |
| **Start command defined** | ✅ Pass | `server: node src/server.js` | Wrap in systemd |
| **Ports** | ⚠️ Partial | API `5002` hardcoded as CORS peer; no config for frontend port | Bind API to `127.0.0.1:5002`, expose only 80/443 |
| **Permissions / file ownership** | ❌ Fail | Upload dir must be writable inside the code tree | Dedicated `actify` user + `/var/lib/actify/uploads` |
| **Security headers / TLS / rate limits** | ❌ Fail | None of helmet, HSTS, rate limiting present | B2, B8; runbook §7-§8 |
| **CORS** | ❌ Fail | Locks to `localhost:5173` | A5 |
| **Logging** | ❌ Fail | `console.log` only; one job logs after `next()` (`roleMiddleware.js`) so it never runs | journald + structured HTTP logs |
| **Monitoring / health check** | ❌ Fail | No `/health`; `/` returns a string; `/api/events/ping` is unauthenticated but shallow | B9 |
| **Backups** | ❌ Fail | None configured | Runbook §13 |
| **Update / rollback** | ❌ Fail | No deployment scripts or tags | Runbook §14 |
| **Reverse proxy / HTTPS** | ❌ Fail | No Nginx config, no certbot setup | Runbook §7-§8 |
| **Firewall** | ❌ Fail | Not applicable yet | Runbook §9 |
| **Process supervision** | ❌ Fail | Only `nodemon` (dev) | systemd unit or Docker (runbook §6 / Appendix A) |

**Smoke tests that prove readiness** (must all pass before DNS cutover):
`GET /health` → 200; login → token; `GET /api/activity/mine` → 200; upload a report with 3 images → 201 and images render from `/uploads/...`; `GET /api/activity/:id/pdf` → 200 `application/pdf` (this is the Puppeteer path); deep-link refresh `https://example.com/admin/users` → 200, not 404; contact form → mail arrives.

---

## D. Environment variable contract

| Variable | Required | Example / rule | Notes |
|---|---|---|---|
| `NODE_ENV` | yes | `production` | Enables Express prod behaviour |
| `PORT` | yes | `5002` | Bind behind Nginx |
| `HOST` | recommended | `127.0.0.1` | Prevents direct public access to Node |
| `MONGO_URI` | yes | `mongodb+srv://USER:PASS@cluster/actify?retryWrites=true&w=majority` | Rotate; URL-encode special chars in the password |
| `JWT_SECRET` | yes | `openssl rand -base64 48` | Changing it invalidates all sessions |
| `JWT_EXPIRES_IN` | optional | `7d` | Currently hardcoded |
| `CORS_ORIGINS` | yes | `https://example.com,https://www.example.com` | Comma-separated, no trailing slash |
| `EMAIL_USER` / `EMAIL_PASS` | yes | Gmail address + 16-char App Password | Rotate; 2FA must be on |
| `EMAIL_FROM_NAME` | optional | `Actify` | Avoids spoofed `from` |
| `UPLOAD_DIR` | recommended | `/var/lib/actify/uploads` | Requires the A7 code change |
| `PUPPETEER_EXECUTABLE_PATH` | optional | *(unset)* | Leave unset to use the bundled Chrome |
| `TZ` | yes | `Asia/Kolkata` | Cron reminders run in this zone |
| `VITE_API_BASE_URL` | yes (build-time) | `/api` or `https://api.example.com/api` | Must be rebuilt to take effect |

Never put `MONGO_URI`, `JWT_SECRET`, or `EMAIL_PASS` in `VITE_*` variables — Vite inlines them into the public bundle.

---

## E. Assumptions and what I need from you

**Assumptions made (tell me if wrong):**
1. Single Ubuntu VM, no container orchestration, one app instance.
2. MongoDB stays on Atlas (free/shared tier) rather than self-hosted.
3. SPA and API served from one domain (`https://example.com/` + `https://example.com/api`).
4. Gmail SMTP is acceptable for transactional mail at your volume (< ~500/day).
5. No CI/CD — deploy by `git pull` on the server (the runbook also gives a tag-based release/rollback flow).
6. No database migration tool is needed (schemaless Mongo); only seeding + index creation.

**Details I need for a fully concrete (non-placeholder) runbook:**
1. **Domain** and whether you also want `www` → apex redirect.
2. **Ubuntu version** (22.04 vs 24.04) and **server specs** (vCPU/RAM/disk) — Puppeteer PDF rendering wants ≥2 GB RAM.
3. **MongoDB decision**: keep Atlas (recommended) or self-host on the same VM? If Atlas: tier, and whether the cluster IP allowlist can be restricted to the VM's elastic IP.
4. **Frontend/API topology**: single domain (recommended) or `api.` subdomain?
5. **First admin account**: name/email to bootstrap (credentials you will set yourself; do not send passwords).
6. **Storage expectation**: how much upload volume per month (decides local disk vs object storage) and whether uploads must survive a VM rebuild.
7. **Repo access**: private Git remote URL and whether the server may hold a deploy key.
8. **Node version**: confirm 24 LTS is the target (your `engines` says 24.x, the dev machine runs 22).
9. **Email volume / provider**: is Gmail acceptable, or should this move to SES/SendGrid (Gmail rate-limits and can flag bulk academic mail)?
10. **Any existing DNS/mail records** on the domain (MX/TXT) so HTTPS + email setup does not break them.
