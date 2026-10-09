# VACUUM, Autovacuum, and Bloat

PostgreSQL's MVCC model can leave obsolete row versions after updates and deletes. Vacuuming makes dead tuples reusable and maintains visibility information needed for efficient operation. Because old snapshots may still need old versions, vacuum cannot remove every obsolete tuple immediately.

## Why updates create work

An update often creates a new row version rather than overwriting the old version in place. The old version becomes dead when no active transaction needs it. Heavy update/delete workloads therefore require routine cleanup. Long-running transactions and replication slots can prevent cleanup from advancing and contribute to table or WAL growth.

## Autovacuum

Autovacuum automatically analyzes and vacuums tables based on thresholds and activity. It is essential operational machinery, not an optional polish step. Disabling it globally to make one workload look faster can cause severe problems later. Tune per-table settings only when measurements show the defaults do not fit a table's update rate or size.

`ANALYZE` updates statistics used by the planner. `VACUUM` reclaims reusable space and updates visibility information. `VACUUM FULL` rewrites a table and takes a strong lock; it is not a routine command to run blindly on a busy production database.

## Bloat and monitoring

Dead tuples and index growth can make scans more expensive. Check table sizes, autovacuum activity, transaction age, and query latency. Extensions can provide detailed bloat estimates, but estimates themselves are approximations. A table being larger than the live data does not automatically prove that a rewrite is needed; reusable free space may be valuable for future updates.

## Long transactions and snapshots

An idle-in-transaction connection can keep a snapshot alive long after useful work has stopped. That can delay cleanup and hold locks. Configure application timeouts appropriately, monitor transaction age, and ensure code paths commit or roll back promptly.

## Freeze and transaction ID safety

PostgreSQL uses transaction IDs for visibility. Vacuum also helps prevent transaction ID wraparound by freezing old tuples. Wraparound protection is critical: treat warnings about aggressive vacuuming or old transaction IDs as operational incidents, not routine noise. Follow the official version-specific guidance for remediation.

## Maintenance thresholds depend on table shape

A very large table with a low percentage of changed rows can accumulate substantial dead tuples before percentage-based thresholds trigger. Per-table autovacuum thresholds and scale factors may be appropriate for such a table, but tune them based on observed update rate, dead tuples, and vacuum duration. Increasing worker counts without considering I/O and CPU can simply make maintenance compete more aggressively with user queries.

Do not kill a vacuum process reflexively because it is visible in process lists. Determine whether it is blocked, making progress, or protecting transaction ID safety. Check long transactions and replication slots before attempting disruptive cleanup.

## Practice

Inspect autovacuum settings and table statistics in a development database. Create an update-heavy table, perform repeated updates/deletes, and observe dead-tuple statistics and table size. Explain why long-lived transactions can prevent cleanup.
