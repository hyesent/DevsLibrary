# Deployment, Upgrades, and Production Readiness

Running PostgreSQL in production means managing more than the server binary. The deployment includes storage, network access, authentication, backups, monitoring, schema migrations, maintenance windows, version upgrades, and an incident response process.

## Configuration and storage

Choose storage with appropriate durability and I/O characteristics. Monitor free disk space because data, indexes, WAL, temporary files, and backups can grow independently. Keep WAL and backup retention within planned capacity. Tune memory and parallelism based on workload and machine resources rather than copying a configuration from a different server size.

## Version upgrades

Distinguish minor updates from major-version upgrades and follow the official procedure for the target release. Check extension compatibility, deprecated settings, replication compatibility, client driver versions, and application assumptions. A major upgrade may require `pg_upgrade` or dump/restore, and the right choice depends on size, downtime tolerance, and operational capability.

## Migration release sequence

Coordinate application releases with schema compatibility. Deploy additive schema changes first, then application code that uses them, backfill and validate, and remove old structures only after old application versions are gone. Have a rollback or forward-fix plan and monitor both database and application metrics during rollout.

## Production readiness checklist

- Least-privilege roles and encrypted network connections where required.
- Tested backups and a restore runbook with measured RTO/RPO.
- Alerts for disk, replication, backups, connections, latency, and old transactions.
- Bounded application pools and timeouts.
- Migration rehearsals on production-like data.
- Capacity planning for peak traffic and background work.
- Documented failover, restore, credential rotation, and upgrade procedures.

## Incident response

During an incident, first protect data integrity and restore a stable service. Capture relevant evidence before killing sessions or changing configuration. Identify whether the issue is connectivity, resource exhaustion, locking, query regression, storage, replication, or data corruption. Apply the smallest safe mitigation, verify recovery, and follow with a root-cause review that improves monitoring or automation.

## Plan an upgrade as a compatibility project

Before upgrading, inventory extensions, client libraries, collation behavior, configuration parameters, replication topology, backup tools, and automation. Read the release notes for every major version crossed. Restore a backup into the target version or perform a rehearsed upgrade on a copy, then run application integration tests and compare important query plans.

The deployment runbook should name who can approve failover or restore, how write traffic is paused or redirected, how success is verified, and when rollback becomes unsafe. A plan that says “restore backup if anything goes wrong” is incomplete unless restore time and data-loss consequences are understood.

## Practice

Write a production launch plan for a new PostgreSQL-backed service. Include owner roles, connection limits, backup restore proof, migration compatibility, alerts, and an upgrade rehearsal. Define which checks block release rather than remaining optional advice.
