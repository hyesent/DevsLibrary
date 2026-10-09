# Observability, Logging, and Statistics

Database observability connects application symptoms to server behavior. A slow endpoint might be waiting for a pool connection, waiting on a lock, reading too many rows, transferring a large result, or executing an expensive plan. Without separate signals, teams often tune the wrong layer.

## Useful PostgreSQL signals

Monitor connection counts and states, transaction age, query latency, lock waits, deadlocks, temporary-file usage, cache/buffer activity, WAL generation, replication lag, checkpoint behavior, vacuum progress, disk capacity, and table/index growth. Track rates and trends as well as current values.

`pg_stat_activity` helps inspect sessions and active queries. `pg_locks` helps investigate lock relationships. `pg_stat_statements`, when installed and configured, aggregates execution statistics by normalized query. Availability and fields can differ by version and configuration, so validate the extension setup for the deployed server.

## Slow-query logging

A duration threshold can identify slow statements, but logs can become noisy and may expose sensitive values depending on settings. Avoid logging credentials or sensitive application data. Prefer query fingerprints and sanitized context. Correlate database query IDs or request IDs with application traces without placing secrets in either.

## Distinguish latency sources

- Pool wait: requests cannot obtain a connection.
- Lock wait: a transaction is blocked by conflicting work.
- Execution: the query plan performs expensive operations.
- Transfer: large results take time to serialize and send.
- Application: processing after the query is slow.

Capture timings around pool acquisition and query execution separately. A single endpoint duration hides these distinctions.

## Alerting

Alert on symptoms that require action: storage nearing exhaustion, repeated connection failures, sustained high latency, replication lag exceeding tolerance, old transactions preventing cleanup, and backup or WAL-archive failures. Alerts need a runbook and a clear owner. Avoid paging for every brief fluctuation.

## Privacy and access

Operational views may expose SQL text, object names, or user context. Restrict access to monitoring data and retain it according to policy. Log the minimum necessary for diagnosis and remove sensitive literals where possible.

## Establish baselines before setting alerts

A CPU percentage or query duration has different meaning under different workloads. Capture normal peak-hour behavior and define thresholds around user impact, capacity exhaustion, or a meaningful departure from baseline. Use percentiles to expose tail latency; averages can hide a small group of very slow requests.

When investigating a lock incident, identify the blocked query and the blocking transaction, then inspect how long the blocker has been open and what it is doing. Terminating a blocker may restore service but can roll back a large transaction and cause additional load. Prefer a runbook that weighs impact and captures evidence before intervention.

## Practice

Create a dashboard for connection pressure, p95 query duration, deadlocks, replication lag, and disk space. For each alert, write the first three diagnostic steps and the condition that means escalation is needed.
