# MongoDB Atlas free tier — what actually limits you

Source: MongoDB's own limits pages, read 2026-11-03 — [Free Cluster Limits](https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/), [Atlas Service Limits](https://www.mongodb.com/docs/atlas/reference/atlas-limits/), [Free Cluster Backups](https://www.mongodb.com/docs/atlas/backup/cloud-backup/free-cluster-backup/). MongoDB revises these; re-check before you commit to a tier.

The free tier is not a trial with a clock. It is a permanently free, permanently capped shared cluster. The caps are hard and enforced by throttling, not by billing.

## 1. The limits that matter for Actify

| Limit | Free cluster (formerly M0) | Effect when exceeded |
|---|---|---|
| **Throughput** | **100 operations/second** | Atlas throttles network speed and adds a 1-second cooldown per connection; queued ops wait |
| **Data transfer** | **10 GB in + 10 GB out per rolling 7 days** | Throttle + 1s cooldown, same mechanism |
| **Connections** | **500 max** per cluster | New connections refused; driver pool errors |
| **Storage** | **512 MB (0.5 GB)** — uncompressed BSON **plus indexes** | Writes fail once full; no auto-expand on free tier |
| **Databases / collections** | 100 databases, 500 collections total | Creation fails |
| **Sort memory** | 32 MB, and `allowDiskUse` is ignored | Large sorts error out instead of spilling to disk |
| **Aggregation** | Max 50 stages, no disk use | Pipeline fails |
| **Document nesting** | 50 levels | Write rejected |
| **Server version** | MongoDB **8.0**, you cannot choose | Atlas upgrades your cluster on its own schedule |
| **Clusters** | **1 free cluster per project** | Need a second environment → second project |
| **Alerts / metrics** | Alerts limited to Connections, Logical Size, Network, Opscounter; only those 4 metrics shown | No Performance Advisor, no Real-Time Performance Panel, no downloadable logs |
| **Idle behaviour** | **Auto-pauses after 30 days with zero connections** | Must be resumed from the UI; data is retained |

Not available at all on the free tier: sharding, VPC peering, private endpoints, database auditing, customer-managed encryption keys (KMS), primary-failover testing, rolling index builds, server-side JavaScript (`$where`, map-reduce), on-demand snapshots, point-in-time recovery.

## 2. What those numbers mean for your app

Your reports store **file paths, not images**, so a document is roughly 1–4 KB including the text fields.

| Resource | Your realistic usage | Headroom |
|---|---|---|
| **Storage** | 1 000 reports/year × ~4 KB ≈ **4 MB/year** | 512 MB ≈ **125 000+ reports** — a decade |
| **Data transfer** | A report read is ~3 KB. 20 000 report views/month ≈ **60 MB** | 1 % of the 10 GB weekly allowance |
| **Ops/sec** | A page load = 2–5 DB ops. 100 ops/s ≈ **20–40 page loads/sec** | Fine for ~500 faculty; the risk is a *submission-deadline spike*, not steady load |
| **Connections** | Node with `maxPoolSize=10` = 10 connections | 2 % of 500 — unless you spin up many instances |

**The only real free-tier risk for you is the 100 ops/s ceiling during a synchronised rush** (for example, a deadline where 200 faculty submit within 10 minutes), because Atlas throttles rather than queues gracefully. Everything else is comfortable by two or more orders of magnitude.

Note the shape of your slowest endpoint: `statsRoutes.js` issues **4 sequential `countDocuments`** calls. That is 4 round trips per stats view — about 40–80 ms from India to an Indian Atlas region, and 4 ops of your 100/s budget. It is the first thing to optimise if you ever approach the ceiling.

## 3. Common misconceptions

| Belief | Reality |
|---|---|
| "There is a monthly credit quota that resets" | **No.** The free tier is not credit-metered. There is no monthly allowance to burn down — only the rolling 7-day transfer window, which is a *rate*, not a quota you spend. MongoDB credits exist only in programs (Startups, Educators $500, GitHub Student Pack $50) and apply to paid tiers. |
| "It pauses weekly" | **No weekly pause.** The 7-day figure is a *rolling data-transfer window*. The only automatic pause is after **30 days with zero connections**. Manual pause is available, not required. |
| "Free tier is only for 30 days" | Wrong. It is free forever; the constraint is capacity, not time. |
| "It has backups" | **Backups are off by default.** An optional *private-preview* subscription adds one daily snapshot with 4 retained, at $0.10/day capped at $3.00/month, requires a payment method, and gives **no point-in-time recovery and no on-demand snapshots**. |
| "Data is safe because it is in the cloud" | True for *hardware* failure, not for *your* mistakes. See §4. |

## 4. Is 1 KB of data safe there?

Separate three different questions:

**Durability (survives hardware failure) — yes.** A free cluster is a **3-node replica set** (replication factor 3, not configurable). Writes are acknowledged by the majority by default, so a node loss does not lose committed data. Storage is encrypted at rest by the cloud provider, all traffic is TLS.

**Recoverability (survives your own mistake) — no, not by default.** With backups off, `deleteMany({})`, a bad script, or a wrong `--drop` restore is unrecoverable. The optional snapshot preview gives you at most *yesterday*, and only if it was enabled before the mistake.

**Operational guarantees (survives a provider incident with a promise) — no.** The free tier carries **no uptime SLA** (the 99.995 % SLA on MongoDB's pricing page applies to Dedicated tiers). Atlas may also deactivate genuinely idle free clusters per its terms, hence the 30-day auto-pause.

Practical translation for a college report system: your database will not vanish because a disk died. It *will* vanish if someone runs a destructive script, so the `mongodump` job in the deployment runbook (§13) is still the thing that makes it recoverable — keep it even if you enable the snapshot preview.

## 5. Do this on the free tier

1. **Enable the daily-snapshot preview** (Backup page → enable). $3/month maximum; it is the cheapest insurance available.
2. **Keep the `mongodump` timer** (runbook §13) exporting off the VM. One daily snapshot with no PITR is not a backup strategy on its own.
3. **Set the three alerts that exist on free**: Connections > 70 % of 500, Logical Size > 400 MB, Opscounter approaching 100.
4. **Pick the region next to your VM** (Mumbai / `ap-south-1` if the server is in India). Free clusters are only available in a subset of regions, and every millisecond of cross-region distance multiplies across your sequential queries.
5. **Export before any long gap** in usage — a 30-day idle pause is resumable, but an extended pause plus an old server version is the documented failure case.
6. **Verify the driver pairing.** Free clusters run MongoDB 8.0; you are on `mongoose@7.8.9` with an older `mongodb` driver. Check the compatibility matrix and test the connection before relying on it.

## 6. When to leave the free tier

Move to **Flex** (~$0.011/hr, capped at $30/month) when any of these is true:

- You see throttling in ops/sec during normal working hours, not just at deadlines.
- Logical size passes ~60 % of 512 MB (leave room for index growth).
- You need more than 4 daily snapshots, or any point-in-time recovery.
- You need private networking, auditing, or customer-managed keys.

Do **not** jump to Dedicated (from $56.94/month) for a workload of this size — that tier exists for workloads two or three orders of magnitude larger.
