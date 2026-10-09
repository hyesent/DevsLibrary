# Migration Planning and Platform Portability

## Learning goals
Reduce avoidable lock-in and plan a migration based on real constraints rather than an abstract promise of portability.

## Portability has levels
Portable application code does not guarantee portable operations. A service may rely on provider-specific identity, storage APIs, networking, event triggers, observability or database extensions. Moving it may require replacing those integrations and rebuilding operational processes. Document dependencies so the team knows where the real coupling lives.

## Avoid both extremes
Using every proprietary service can speed delivery and reduce operational work, but it may increase migration cost. Avoiding all managed services can preserve theoretical portability while forcing the team to operate infrastructure it is not equipped to maintain. Make the trade-off explicit using business needs, team skills, cost, reliability and likely migration triggers.

## Migration inventory
Record compute services, network paths, data stores, scheduled jobs, secrets, DNS, certificates, logs, alerting, backup systems, CI identities and external integrations. Identify stateful components and data transfer constraints early. Data volume, write downtime, consistency and egress costs often dominate migration effort.

## Cutover patterns
A simple cutover can freeze writes, transfer data, validate, switch traffic and monitor. Lower-downtime migrations may require replication or dual-write strategies, which introduce consistency risks and need careful reconciliation. Keep the old system available for a defined period if rollback is required, but prevent uncontrolled split-brain writes to both systems.

## Test what matters
Run representative load tests, compare data counts and checksums where appropriate, validate permissions, and test backups and restore on the target. Verify domain and TLS behavior, background jobs and monitoring. A successful homepage response does not prove the migration is complete.

## Practice
Write a migration plan for moving an API and database to another provider. Include inventory, data transfer, write freeze or replication strategy, validation checks, cutover criteria, rollback limits, DNS behavior, cost and accountable owners. State which parts are portable today and which need replacement.
