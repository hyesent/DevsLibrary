# Connection Pooling and Capacity Planning

Each PostgreSQL connection consumes server resources. Creating too many concurrent connections can increase memory use, scheduling overhead, and contention rather than increasing throughput. Web applications often create far more potential requests than the database should execute simultaneously, so pooling is an important boundary.

## Application pools

A driver pool reuses connections inside one application process. Configure maximum pool size, idle lifetime, acquisition timeout, and connection lifetime intentionally. If every application replica opens a pool of 30 connections and you deploy 20 replicas, the database may see up to 600 connections before workers and administration are counted.

## External poolers

A pooler such as PgBouncer can share server connections among many clients. Session pooling preserves session state for the client; transaction pooling returns a server connection after each transaction and restricts features that depend on session affinity. Prepared statements, temporary tables, session settings, and advisory locks require special attention under transaction pooling depending on configuration and version.

## Capacity is not just max_connections

Increasing `max_connections` does not create CPU, RAM, disk throughput, or better query plans. Start from measured concurrency and resource usage. Bound queues upstream, apply backpressure, and set timeouts so an overloaded database does not accumulate unlimited waiting requests.

## Timeouts

Use appropriate connection-acquisition, statement, lock, and idle-in-transaction timeouts. Each protects against a different failure mode. A statement timeout can cancel a slow query; a lock timeout can fail quickly when a migration or transaction holds a conflicting lock. Pick values based on service-level objectives and expected workloads, not arbitrary tiny numbers.

## Capacity signals

Monitor active/idle connections, pool wait time, query latency percentiles, lock waits, CPU, memory, I/O, WAL generation, replica lag, and autovacuum progress. A pool saturated because queries are slow is different from a pool saturated because the maximum is too low. Find the bottleneck before raising limits.

## Avoid queueing inside the database

When traffic exceeds the database's sustainable concurrency, a larger pool can increase lock contention and memory pressure. A smaller bounded pool may keep database concurrency controlled while requests wait briefly upstream or fail fast. Tune pool size using throughput and latency curves, not the assumption that one connection per request is ideal.

Separate interactive traffic from heavy reports or background jobs when they have different latency needs. Dedicated pools, statement timeouts, resource groups where available, or workload scheduling can keep a batch job from exhausting every connection needed for user-facing requests.

## Practice

Estimate the total possible database connections for a deployment with 8 application replicas and a pool size of 12. Add background workers and admin headroom. Define a pool-acquisition timeout and an overload response rather than allowing requests to wait indefinitely.
