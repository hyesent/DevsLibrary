# Safe Deployments: Rolling, Blue-Green, and Canary

## Learning goals
Choose a rollout method and define success and rollback conditions before changing production traffic.

## Rolling deployment
A rolling deployment replaces instances gradually. It can reduce extra infrastructure cost, but old and new versions coexist temporarily. The app must tolerate that overlap: API contracts, session formats, message schemas and database migrations need compatible transitions. If every new instance starts before old instances stop, capacity and database connection counts may temporarily increase.

## Blue-green
Blue-green maintains two deployment environments. One serves traffic while the other is prepared and tested, then traffic switches. This can make application rollback fast, but it may double some resources and does not automatically reverse database writes or incompatible schema changes. Keep both environments compatible with shared data during the switch.

## Canary
A canary exposes a small fraction of traffic to a new version before increasing it. Compare meaningful indicators such as error rate, latency percentiles, saturation and business outcomes. A small percentage is not useful if it excludes the affected customer segment or does not exercise a critical path. Ensure the metrics have enough sample volume and the comparison window accounts for normal variation.

## Health is more than process status
A process can return HTTP 200 while business operations are failing. Define release checks around critical behavior: authentication, reads/writes, payment callbacks if applicable, background job processing and database access. Avoid testing production by creating destructive or duplicate business actions.

## Rollback versus roll-forward
Rollback restores a previous application version or traffic route. Roll-forward fixes the problem with a new release. If the new version wrote data in a format the old version cannot read, rollback may worsen the incident. Use backward-compatible schema changes, idempotent jobs and explicit compatibility plans.

## Define the decision before rollout
Write a rollout policy: initial traffic percentage, observation period, acceptable error and latency thresholds, who can stop the rollout, and what happens if telemetry is missing. “Watch the dashboard” is not a decision rule.

## Practice
For a new API release, design a canary and state the metrics, thresholds, sample size concerns and rollback procedure. Include a migration plan and test whether the old app version can run against the new schema. Make the decision process executable rather than dependent on a single operator’s intuition.
