# 19. Migrations and Schema Evolution

A production data model changes as the product evolves. Schema migration is the controlled process of moving database structure and data from one version to another. The challenge is not only making the new schema correct; it is keeping deployed application versions compatible during the transition.

## Expand, migrate, contract

A safer pattern for many changes is:
1. **Expand:** add the new column/table/index in a backward-compatible way.
2. **Deploy compatible code:** write or read both old and new forms where needed.
3. **Backfill:** populate historical rows in controlled batches.
4. **Verify:** compare counts, nulls, and business invariants.
5. **Switch reads/writes:** make the new representation authoritative.
6. **Contract:** remove obsolete structures only after old code no longer depends on them.

This is not necessary for every tiny change, but it is valuable for high-traffic systems and rolling deployments where old and new application instances coexist.

## Backfills must be restartable

A large update can hold locks, generate substantial write-ahead logs, bloat tables, and affect replication. Process batches, monitor impact, and store progress safely. Make the operation idempotent so it can be retried without corrupting data. Avoid assuming that a migration either completes instantly or fails without side effects.

## Constraints and indexes

Some databases offer online or concurrent index creation and mechanisms for adding constraints without immediately validating all existing rows. These details are engine- and version-specific. Read the documentation for the deployed database version. A migration that works on a small local database can cause a production outage if it takes an exclusive lock or scans a huge table.

## Rollback is not always simple

Reversing a structural change may be possible; reversing a destructive data transformation may not be. A rollback plan should specify whether to revert code, restore a backup, run a compensating migration, or roll forward with a fix. Backups and tested restore procedures remain important even when migrations are reversible.

## Migration discipline

Keep migrations versioned and reviewed. Test them against realistic data volume, check lock behavior, record execution duration, and ensure deployment tooling prevents two copies from applying the same migration concurrently. Do not make untracked schema changes manually and then expect future environments to match.

## Practice

You need to replace `full_name` with `given_name` and `family_name`. Design an expand/backfill/verify/switch/contract sequence that supports a rolling deploy. Consider mononyms, imported names, and whether preserving the original display string is necessary.

**Key idea:** schema evolution is a production rollout, not merely a SQL file.
