# Lesson 19: Deployment, Release Safety, and Rollback

**Track:** Production

## Learning objectives
- Separate build from runtime configuration
- Use safe database migration sequencing
- Plan rollback before deploying

## Lesson
### A deployment is a change to a running system

A release can change application code, configuration, schema, secrets, routing, or external provider settings. Treat it as a controlled change with a known owner, version, validation, and rollback or mitigation plan. “The build passed” proves only that a particular build step succeeded; it does not prove production configuration, connectivity, or behavior.

Build artifacts should be reproducible and identifiable. Record the commit, dependency lockfile, build version, and relevant configuration version. Keep secrets out of artifacts and logs.

### Expand-and-contract database migrations

A risky deployment changes code and schema in one incompatible step. Expand-and-contract reduces that risk. First add a backward-compatible column or table, deploy code that can work with old and new forms, backfill data, switch reads/writes, then remove obsolete schema in a later release after old code is no longer active.

A rollback may restore old application code while the new schema remains. That is safe only if the migration is backward-compatible. Destructive changes, data rewrites, and index operations need special planning and sometimes a forward-fix rather than a literal rollback.

### Progressive delivery

Canary releases, staged rollouts, feature flags, and blue-green deployment reduce the blast radius of changes. A canary should have measurable health criteria and a fast way to stop promotion. Feature flags need owners and removal dates; permanent flag clutter makes behavior harder to understand.

For edge functions, deployment may be globally propagated, region-specific, or tied to a provider's rollout mechanism. Understand how quickly versions become active, whether old and new versions can overlap, and how secrets/bindings change during rollout.

### Smoke checks and rollback decisions

A smoke test verifies the deployed service's most important paths: health, authentication, a safe database read/write if appropriate, and a critical integration. Use synthetic accounts and safe test records. Watch error rate, latency, saturation, and business outcomes during rollout.

Define rollback criteria before deployment. If error rate doubles but remains under a strict SLO, is that enough to roll back? If a payment invariant breaks once, the answer may be immediate rollback or disabling the affected feature. Decision criteria should reflect user harm, not only generic thresholds.

### Rollback is an operational capability

Practice rollback in a safe environment. Verify that previous artifacts remain available, database changes are compatible, secrets still work, and the team knows who can initiate rollback. Some failures are best addressed by disabling a feature or deploying a forward fix rather than reverting code. Record the actual recovery time and improve the process after incidents.

## Worked example

Release a new `display_name` field by adding a nullable column, deploying code that writes both old and new fields, backfilling, switching reads, and only later removing the old field. This allows old and new application versions to coexist during rollout.

## Exercises

1. Describe expand-and-contract for renaming a database field.
2. Name three metrics to watch during a canary.
3. Explain why a code rollback may fail after a destructive migration.

## Solution notes

Add the new field, dual-write or compatible-write, backfill, switch reads, then remove old field in a later release. Watch error rate, p95 latency, and saturation/business failures. Old code may expect data or schema that a destructive migration removed.

## Review checklist

- Can I explain: separate build from runtime configuration?
- Can I explain: use safe database migration sequencing?
- Can I explain: plan rollback before deploying?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
