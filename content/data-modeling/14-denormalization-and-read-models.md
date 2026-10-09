# 14. Denormalization and Read Models

Denormalization intentionally duplicates or precomputes information to improve a measured access pattern. It can be worthwhile, but it moves complexity from reads into writes, refresh processes, reconciliation, and operations.

## Begin with a baseline

Before denormalizing:
1. Measure representative query latency and throughput.
2. Inspect query plans and indexes.
3. Check whether the query is doing unnecessary work.
4. Confirm the data model is correct and constraints are effective.
5. Identify whether the bottleneck is database execution, network round trips, application code, or external services.

A slow report does not automatically mean the schema needs a summary table. An appropriate index, a better query, pagination, or fewer round trips may solve the problem with less consistency risk.

## Common techniques

- **Stored aggregate:** maintain a count or total alongside detail rows.
- **Materialized view:** persist a query result and refresh it on a schedule or by a controlled process.
- **Read replica:** serve eligible reads from a replica, accepting replication lag and read-after-write limitations.
- **Search index:** project selected fields into a search-optimized system.
- **CQRS read model:** maintain a representation optimized for particular queries, separate from the write model.

These techniques have different freshness guarantees. A synchronous aggregate updated in the same transaction can be strongly consistent if implemented correctly. An asynchronously updated search index is eventually consistent. Do not describe both simply as “cached data.”

## Maintaining derived values

Suppose an organization row stores `member_count`. Inserting a membership and incrementing the count must be atomic, or concurrent operations can lose updates. Deleting a membership, changing organization membership, imports, and retries must all preserve the invariant. If it is difficult to guarantee, calculate the count from the source table or treat the stored value as a rebuildable cache with reconciliation.

A materialized view can be refreshed from its source, but refresh timing and query cost matter. If the user expects a newly submitted order to appear immediately in a report, a nightly refresh is not sufficient.

## CQRS is a trade-off

Command Query Responsibility Segregation separates models for writes and reads. It can help when query requirements differ sharply from transactional write requirements, but it adds projections, lag, replay, schema evolution, and debugging complexity. It is not a default requirement for every application.

## Practice

A library homepage displays total books, active members, and overdue loans. Decide which values should be computed on demand, cached, or stored as aggregates. State the freshness requirement for each and describe how to rebuild or verify stored values.

**Key idea:** denormalize only to solve an observed problem, and make freshness, authority, and repair behavior explicit.
