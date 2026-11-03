# MongoDB vs PostgreSQL — decision for Actify

**Recommendation: keep MongoDB (Atlas). Do not migrate to PostgreSQL for this deployment.**
Three configuration changes matter more than the engine choice — see §7.

This is grounded in your actual schema and query code, not general preference: I inventoried all 7 models and every database call in `server/src`.

---

## 1. What your data actually is

| Collection | Shape | Nested structures | Arrays | Refs |
|---|---|---|---|---|
| `activities` | ~30 fields | `resourcePerson{}`, `sessionReport{}` (8 fields) | `photos[]`, `attendanceImages[]`, `feedbackImages[]`, `sessionReport.coordinators[]` | `createdBy`, `approvedBy`, `rejectedBy` |
| `events` | 12 fields | `registrations[]` (embedded sub-docs) | registrations (unbounded per event) | `createdBy`, `approvedBy` |
| `notifications` | 7 fields | — | `targetRoles[]`, `isReadBy[]` (unbounded) | `relatedEvent`, `createdBy` |
| `users` | 5 fields | — | — | — |
| `departments` | 4 fields | — | `activityScopes[]` | — |
| `homecontent` | 6 fields | `stats{}`, `departmentScopes[]` | — | — |
| `eventregistrations` | 4 fields | — | — | `event`, `faculty` — **defined but never imported** (registrations live embedded in `events`) |

Two facts drive the decision:

1. **A report is a single self-contained document.** `activityController.getPdf` loads one Activity and renders it to HTML → PDF. In MongoDB that is **one read**; in PostgreSQL it is a parent row plus 4–6 child-table or JSONB queries.
2. **The document is genuinely variable.** `reportType` (`conducted`/`attended`/`expert_talk`) changes which sections matter; `sessionReport` only applies to some reports; the update path writes whatever the client sends. In SQL that means either many nullable columns or a `JSONB` column — i.e. you would be emulating documents inside Postgres.

## 2. What your code actually does

I grepped the whole server for query patterns:

| Pattern | Occurrences | Meaning |
|---|---|---|
| `find` / `findById` / `findByIdAndUpdate` / `countDocuments` | everywhere | Simple CRUD, document-at-a-time |
| `.aggregate()` | **0** | No analytics pipelines |
| `$lookup` | **0** | No joins anywhere |
| `startSession` / `startTransaction` | **0** | No multi-document transactions |
| `$text` / regex search | **0** | No full-text search |
| Query operators used | `$gte`, `$lte`, `$or` (×2), `$addToSet` | 5 total |
| `findByIdAndUpdate(id, payload)` with a client-parsed body | `activityController.js:177` | Schema-less partial update |

That is the profile of an application that benefits from neither joins nor transactions today. The usual arguments for PostgreSQL — relational integrity, complex ad-hoc queries, transactions — have no current consumer in this codebase.

One PostgreSQL advantage does show up: `statsRoutes.js` runs **4 separate `countDocuments`** calls per department. In PG that becomes a single index-only `COUNT(*) FILTER (WHERE ...)` — roughly one scan instead of four.

## 3. Dimension-by-dimension

| Dimension | MongoDB | PostgreSQL | For **Actify** |
|---|---|---|---|
| **Performance** | Single-document read for a report; no joins; WiredTiger document-level concurrency. Excellent when the working set fits RAM | B-tree/index-heavy; joins cost more at read time but are cheap at this data volume; strong for aggregates | **Tie.** Both are 10–100× beyond your load (a college: thousands of reports/year, KB per row). Mongo reads are marginally simpler for report rendering |
| **Scalability** | Horizontal sharding built in; vertical scaling on Atlas is a slider. Shared M0/Flex tiers throttle (M0 ≈ 100 ops/s) | Vertical first; read replicas; partitioning; sharding is manual (Citus) | **Tie at your scale.** You will never exceed a single small instance. Postgres scales *further* on one box; Mongo scales *wider* across boxes |
| **Data modeling** | Documents with nested objects/arrays — exactly your report and event shapes | Normalized tables + FK; nested data becomes child tables or `JSONB` | **MongoDB.** Your model already *is* documents; the nested `resourcePerson`/`sessionReport` would become 2 extra tables or 1 opaque JSONB column |
| **Query flexibility** | Good for known access patterns; awkward for unplanned cross-collection analysis; `$lookup` exists but is clunky | Best in class for ad-hoc joins, window functions, CTEs, `GROUP BY` | **PostgreSQL**, but only for future reporting requirements (see §6). Today: unused |
| **Transactions** | Multi-document ACID on replica sets (Atlas supports them); single-document ops are always atomic | Full ACID, mature, no caveats | **Slight PostgreSQL.** Your approve/reject + notify sequence would be cleaner as one transaction — but it works today, and Atlas replica sets do support transactions if you need them |
| **Referential integrity** | None. `createdBy`/`approvedBy`/`rejectedBy` can dangle if a user is deleted; `isReadBy[]` can hold dead IDs | FK constraints with `ON DELETE` semantics | **PostgreSQL.** Real risk here: `deleteUser` does not cascade or null references, so deleting a user leaves orphaned `createdBy`/`approvedBy` IDs. Fixable in Mongo with app-level cleanup |
| **Security** | Auth + RBAC + TLS + encryption at rest (Atlas-managed); field-level redaction is Enterprise-only; no row-level security in Community | Granular `GRANT` per table/column, **row-level security**, mature audit extensions (`pgaudit`) | **PostgreSQL on paper, Atlas in practice.** Atlas gives you TLS, patching, and network isolation with zero work; self-hosted PG makes you own TLS and auth tuning |
| **Maintenance** | Atlas: none (patching, failover, upgrades handled). Self-hosted Mongo: replica set ops | Self-hosted: `VACUUM`/autovacuum, bloat, `shared_buffers`, connection limits, major-version upgrades (`pg_upgrade`) | **MongoDB** — you are already managed on Atlas; PG here would either add a second managed service or a second daemon on the same VM |
| **Backup & recovery** | Free tier ships **no backups by default** (an optional preview adds one daily snapshot, 4 retained, for $0.10/day capped at $3/mo — no PITR, no on-demand). Paid tiers add continuous backups + PITR | Mature: `pg_dump`/`pg_basebackup`, WAL archiving, PITR, mature tooling | **PostgreSQL**, marginally. But your `mongodump` cron (runbook §13) already closes the gap — and note **this is your real backup risk today, not the engine** |
| **Cost** | Atlas: M0 free (512 MB) / Flex $0.011/hr capped at $30/mo / Dedicated $0.08/hr from $56.94/mo. Managed elsewhere: DigitalOcean 1 GiB from $15.23/mo. Self-hosted on the same VM: $0 | Managed: DigitalOcean 1 GiB from **$15.15/mo**. Self-hosted on the same VM: $0 (shares RAM with Node + Chromium) | **Tie.** At your size both are $0 (self-hosted) or ~$15/mo (managed). Migrating to save $0 is not a business case |
| **Compatibility with existing app** | Native — it is the current engine | **Full rewrite of the data layer**: 7 Mongoose models, ~10 controllers, `populate()` calls, `ObjectId` refs, the dynamic `findByIdAndUpdate` path | **Decisive for MongoDB.** This is the single largest cost of switching and it buys you nothing today |

**Cost figures sourced 2026-11:** [mongodb.com/pricing](https://www.mongodb.com/pricing) (M0 $0 / 512 MB; Flex $0.011/hr, up to $30/mo; Dedicated $0.08/hr, from $56.94/mo) and [digitalocean.com/pricing/managed-databases](https://www.digitalocean.com/pricing/managed-databases) (PostgreSQL 1 GiB $15.15/mo; MongoDB 1 GiB $15.23/mo). Prices change — re-check before committing to a tier.

## 4. Your data size, concretely

A report stores text plus **file paths** (`"uploads/1774335630687-….jpeg"`), not image bytes — the files live on disk and get base64-inlined only at PDF render time. So a document is roughly 1–3 KB.

- 512 MB (M0) ≈ **200 000+ reports** before storage pressure.
- 1 000 reports/year at a large college ≈ **0.5 % of the free tier per year.**

Storage cost is a non-argument for this project. The constraints that will bite first are **ops/sec (M0 ≈ 100/s)** and **the absence of free-tier backups** — not capacity.

## 5. Where PostgreSQL would actually be better

Be honest about the trade-off; these are the triggers that would flip the decision:

1. **Reporting becomes the product.** Cross-department, multi-academic-year, per-faculty productivity reports with `GROUP BY`, window functions, and ad-hoc SQL from admin staff. Mongo can do this with aggregation pipelines, but SQL is the better tool and your `statsRoutes` is already the shape of that future.
2. **Data integrity incidents start hurting.** Orphaned `createdBy` after user deletion, duplicate registrations across two collections, status transitions that half-apply.
3. **You outgrow one instance.** Postgres scales further vertically on a single VM; Mongo wants Atlas-tier money or a replica set you operate.
4. **Compliance demands row-level access control or audited queries.**
5. **The team is SQL-fluent and Mongo-fluent only by accident.** Maintainability of the *team* outranks elegance of the model.

None of these is true today.

## 6. Recommendation

**Keep MongoDB on Atlas for this deployment.** Concretely:

- **Engine:** MongoDB 7.x via Mongoose (current: `mongoose@9.11.4`; you run `7.8.9` — two majors behind, plan an upgrade, not urgent).
- **Tier:** the free cluster is fine for launch if you accept three limits — 100 ops/s, 512 MB, and backups off by default. Enable the free-cluster backup preview ($3/mo max) **and** keep the `mongodump` job; step up to **Flex** (~$8–30/mo) only if you actually hit the ops ceiling. Do not jump to Dedicated ($57+/mo) for a college workload.
- **Do not self-host MongoDB** on the same 2 GB VM as Node + Chromium: the PDF renderer already competes for RAM, and you would take on replica-set and backup duties for a $0 saving.

The migration would cost days of rework and regression risk on the *one* flow that is hardest to test (the PDF/DOCX report renderer reads a whole document tree), in exchange for capabilities you do not use. Revisit when a §5 trigger fires — most likely (1), reporting.

## 7. Configuration to do instead (higher value than switching engines)

These matter more than MongoDB-vs-PostgreSQL for this deployment:

1. **Rotate the leaked credentials and restrict the Atlas allowlist** — your `MONGO_URI` is public on GitHub right now (see `docs/deployment-review.md` §A3). Everything else is secondary.
2. **Fix the backup gap.** The free tier has no backups unless you turn them on, and the optional ones are a private preview with 4 daily snapshots and no point-in-time recovery. Run the `mongodump` timer in runbook §13 regardless, and verify a restore once.
3. **Bound the unbounded arrays.** `events.registrations[]` and `notifications.isReadBy[]` grow forever and are rewritten wholesale on every push. At a few hundred faculty this is fine; at thousands, move them to child collections (`eventregistrations` already exists and is unused) or cap with `$slice`. Add `$addToSet` guards (you already use it in one place).
4. **Add the indexes** (runbook §5.4): `{department,status}`, `{createdBy,createdAt}`, `{event,faculty}`. Without them every list and stats query collection-scans.
5. **Handle referential integrity in the app**, since Mongo will not: on `deleteUser`, null or reassign `createdBy`/`approvedBy`/`rejectedBy` and pull the user from `isReadBy[]`; enforce one registration per `(event, faculty)` with a unique index (the orphaned `EventRegistration` model already declares one — reuse it or add the same constraint to the embedded path).
6. **Connection + driver settings for production:** `maxPoolSize=10` (a 2 GB VM and a shared Atlas tier punish large pools), `retryWrites=true` (already in your URI), `serverSelectionTimeoutMS=5000`, `socketTimeoutMS=45000`, and `mongoose.set('bufferCommands', false)` so a dead DB fails fast instead of queueing.
7. **Plan the Mongoose 7 → 8/9 upgrade** on a branch: it is a dependency upgrade with real breaking changes, and doing it during a deployment window is the wrong time.

## 8. If you do migrate later — what it takes

Only worth it under a §5 trigger. The work is not the data, it is the code.

**Schema mapping**

| MongoDB | PostgreSQL |
|---|---|
| `activities` document | `activities` table + `activity_photos(activity_id, kind, path)` (`kind` ∈ invitation/poster/attendance/feedback) |
| `resourcePerson{}`, `sessionReport{}` | either two child tables (queryable) or one `JSONB` column (simplest, keeps flexibility) |
| `sessionReport.coordinators[]` | `text[]` or `activity_coordinators` join table |
| `events.registrations[]` | `event_registrations(event_id, faculty_id, registered_at, attendance_marked)` with `UNIQUE(event_id, faculty_id)` — i.e. the model you already defined |
| `notifications.targetRoles[]`, `isReadBy[]` | `text[]` for roles; `notification_reads(notification_id, user_id)` for reads |
| `ObjectId` | `uuid` (or `bigserial`); **keep a mapping table** if any IDs are in URLs, localStorage, or emails |
| `status` enums | native `ENUM` types or `CHECK` constraints |
| `timestamps: true` | `created_at timestamptz default now()`, `updated_at` + trigger |

**Steps**

1. Stand up Postgres 16 (Ubuntu 24.04 default) or managed; create a least-privilege role; enable TLS if remote.
2. Write the schema as SQL migrations (Prisma / Drizzle / Knex / `node-pg-migrate` — pick one, commit the migrations).
3. Export with `mongodump`, transform to CSV/NDJSON with a throwaway Node script, `COPY` in. Preserve `_id` → `legacy_id` on every row so you can re-run and reconcile.
4. Replace the data layer: `models/*.js` → repository functions; every `populate()` becomes an explicit `JOIN` or a second query; `findByIdAndUpdate(id, payload)` becomes a **whitelisted** partial update (this is the dangerous one — today the client can write any field, including `createdBy` and `status`).
5. Run both databases in a read-shadow mode for a week (write Mongo, dual-read and diff) before cutover.
6. Cut over during a maintenance window; keep Mongo read-only for 30 days as the rollback path.

**Effort and risk for this codebase:** ~7 models, ~10 controllers/routes, plus upload-path and PDF-render code that reads the whole document. Realistically **4–8 focused days** plus a week of shadow-run validation. Highest-risk area: the report renderer (`activityController`) and the auth/role checks, because both read nested structures that will now span tables.

**Configuration considerations if you stay (and they are small):** the ones in §7. The only one that is a genuine deployment risk today is that nothing is being backed up — mirroring `mongodump` off the VM (runbook §13) closes it.

---

**Bottom line:** the engine is not your problem. Your deployment risks are the leaked credentials, the absent backups, the four unindexed collection scans, and an orphaned-reference bug when users are deleted. Fix those; keep MongoDB; revisit PostgreSQL when reporting, not deployment, becomes the requirement.
