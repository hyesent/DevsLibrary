# Backups, Restore, and Point-in-Time Recovery

A backup is useful only if it can be restored within the required recovery time and to an acceptable recovery point. Backup success messages are not proof that the organization can recover. Restore drills should be scheduled, timed, and documented.

## Logical backups

`pg_dump` creates a logical export of a database. Custom-format dumps can be restored selectively with `pg_restore`:

```bash
pg_dump -Fc -d library -f library.dump
createdb library_restore_test
pg_restore -d library_restore_test library.dump
```

Run commands with appropriate credentials and protect dump files because they may contain sensitive data. Logical dumps are useful for portability and object-level restoration, but large databases may take longer to restore than physical backups.

## Physical backups and WAL

Physical backup tools copy the database cluster at the storage level. Write-ahead log (WAL) records changes needed for recovery and can be archived to support point-in-time recovery (PITR), when configured correctly. PITR requires a valid base backup plus a continuous required WAL chain. Losing part of the WAL sequence can break recovery to the desired time.

## Define RPO and RTO

- **Recovery Point Objective (RPO):** how much data loss in time is acceptable.
- **Recovery Time Objective (RTO):** how long restoration may take.

These are business requirements, not just database settings. A daily dump may not satisfy a low RPO. Continuous archiving may help with RPO but requires monitoring, storage capacity, and tested restore procedures.

## Backup security

Encrypt backups in transit and at rest, restrict access, rotate credentials, and test retention policies. Keep recovery material separate from the production failure domain where possible. A ransomware or operator incident can affect backups that are writable by the same compromised credentials.

## Restore drills

A meaningful drill verifies that the restored database starts, schema and data are present, extensions are available, roles and permissions are correct, application migrations are compatible, and a representative application workflow succeeds. Record actual restore time and any missing dependency. Rehearse how to redirect traffic and prevent the old broken instance from accepting writes.

## Measure recovery, not backup creation

Record the time from declaring a recovery event to the application passing a representative health check. Include provisioning, data restore, WAL replay, role and extension setup, validation, and traffic cutover. A backup that restores in four hours cannot meet a one-hour RTO even if the dump completed in five minutes.

Point-in-time recovery should be rehearsed with an actual target time. Verify that archived WAL is continuous, that required encryption keys and credentials are available, and that the recovery target is earlier than the damaging event. Document how to preserve the damaged instance for investigation without allowing it to accept writes.

## Practice

Write a recovery runbook for accidental deletion of a critical table. Specify the chosen backup method, the recovery point, who approves restoration, how recovered data is validated, and how it is copied back without overwriting newer valid data.
