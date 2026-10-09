# Migrations and Zero-Downtime Changes

A migration is a versioned, repeatable description of a schema transition. It should be reviewed like application code, run in a known order, and have a recovery plan. Editing a live database manually without recording the change creates drift: development, test, and production can end up with different schemas.

## Expand, migrate, contract

For a field rename or major schema change, avoid changing every component at once. A common strategy is:

1. **Expand:** add the new column or structure without removing the old one.
2. **Dual-read/write or backfill:** deploy code that can work with the transition, and populate historical rows in bounded batches.
3. **Verify:** compare old and new values and monitor errors.
4. **Switch:** move reads to the new structure.
5. **Contract:** remove the old column only after no running version depends on it.

This strategy matters when old and new application instances overlap during deployment.

## Defaults and table rewrites

DDL can take locks, and some changes may scan or rewrite a large table depending on the PostgreSQL version and exact operation. Do not assume a migration is instant because the SQL is one line. Test on production-like data and understand lock behavior for the target version. Set lock and statement timeouts where appropriate so a migration does not wait indefinitely or unexpectedly block traffic.

## Backfills

Large backfills should be restartable and observable. Process bounded batches, use a stable cursor, track progress, and make the operation idempotent where possible. Avoid one huge transaction that creates long-lived snapshots, excessive WAL, and a difficult rollback.

## Index migrations

`CREATE INDEX CONCURRENTLY` can reduce write blocking but has restrictions and failure modes. It cannot run inside a transaction block, and a failed build may leave an invalid index that must be inspected and cleaned up. Migration tooling needs to represent such non-transactional steps explicitly.

## Rollback is not always a reverse migration

Dropping a new column may be reversible structurally but not restore values that were discarded. Data migrations require backups, compatibility windows, and explicit recovery procedures. Sometimes the safest recovery is a forward fix rather than reversing a destructive change.

## Treat locks as a release dependency

A migration can be blocked behind a long transaction, and once queued it may create a lock queue that affects later traffic. Set a short `lock_timeout` for deployment DDL when failing fast is safer than waiting, and retry during a better window after investigating blockers. Use `statement_timeout` carefully for long backfills or index builds; a timeout that is too short can repeatedly interrupt necessary work.

Schema compatibility includes old application instances, background workers, analytics jobs, and operational scripts. Search for every consumer before dropping a column. A code search is useful but should be combined with logs, ownership, and a defined deprecation window.

## Practice

Plan a migration from `full_name` to `given_name` and `family_name` for a large user table. Include rollout steps, backfill batches, consistency checks, metrics, and the exact condition under which the old column can be removed.
