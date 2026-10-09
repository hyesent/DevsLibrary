# 15. Index-Aware Data Modeling

Indexes are physical structures that help a database locate rows or satisfy ordering and uniqueness requirements. They influence model design, but indexes are not a substitute for correct keys or a reason to create one for every column.

## Indexes follow access patterns

Start with real queries:
- How are rows filtered?
- Which columns are used to join?
- What order is required?
- How many rows are expected?
- Is the query selective?
- Does it need only a few columns?
- How often are the underlying rows changed?

A composite B-tree index on `(tenant_id, created_at)` may support queries that filter by tenant and sort by creation time. It may not efficiently support a query filtering only by `created_at`, depending on the engine and index type. Column order matters, but the exact best index depends on selectivity, workload, and the optimizer.

## Constraints can use indexes

Primary keys and unique constraints commonly create supporting unique indexes in relational engines. A foreign key does not universally guarantee that the referencing columns are indexed automatically. Indexing child foreign-key columns can help joins and parent deletes/updates, but evaluate the actual workload and engine behavior.

## Write cost and index size

Every additional index consumes storage and usually adds work to inserts, updates, and deletes. Indexes can slow bulk loading and increase maintenance. A wide index may be expensive in memory and cache. Avoid indexing low-selectivity columns without a reason; however, low selectivity alone does not prove an index is useless because composite indexes, partial indexes, or index-only access may still help.

## Model for common query shapes

For a multi-tenant app, include tenant scope in keys and indexes where it reflects the access pattern and security boundary. Ensure queries consistently filter by tenant and that authorization is enforced independently. An index containing `tenant_id` does not itself prevent cross-tenant access.

## Explain plans, don't guess

Use the database's plan inspection tools with representative data and parameters. A plan observed on a tiny development dataset may differ dramatically at production scale. Distinguish estimated from actual row counts, inspect scans and joins, and measure before and after changes. Be careful when using `EXPLAIN ANALYZE` on statements that modify data; some engines execute the statement.

## Practice

For queries that list a member's recent loans, find overdue loans, and show a title's copies, propose indexes. Explain which query each index supports and what write/storage cost it introduces.

**Key idea:** physical design should respond to measured query shapes while preserving the logical model's correctness.
