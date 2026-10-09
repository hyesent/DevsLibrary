# EXPLAIN, ANALYZE, and Query Tuning

Query tuning begins with evidence. A query that looks complicated may be fast, while a simple query can scan millions of rows or wait on locks. PostgreSQL's planner estimates the cost of candidate plans using table statistics, available indexes, and cost settings.

## Read a plan

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC
LIMIT 20;
```

`EXPLAIN` reports the planned operations. `ANALYZE` executes the query and adds actual row counts and timings; use care with statements that modify data. `BUFFERS` reports buffer activity. A plan may include sequential scans, index scans, bitmap scans, sorts, joins, aggregates, and nested loops.

## Estimated versus actual rows

A large difference between estimated and actual row counts can cause a poor plan. Statistics may be stale, the predicate may be hard to estimate, or data distribution may be skewed. `ANALYZE table_name` refreshes planner statistics. Raising per-column statistics targets or creating extended statistics can help for specific distributions and correlated columns, but should follow evidence.

## Sequential scans are not inherently bad

If a query reads a large fraction of a table, sequential scanning may be cheaper than many random index lookups. Do not treat “Seq Scan” as a bug by itself. The question is whether the plan is appropriate for the number of rows returned, table size, cache state, and workload.

## Tuning workflow

1. Capture the exact query and representative parameter values.
2. Measure latency and identify whether time is execution, lock waiting, network transfer, or application processing.
3. Run `EXPLAIN (ANALYZE, BUFFERS)` in a safe environment.
4. Check row estimates, loops, sort operations, buffer reads, and expensive nodes.
5. Change one factor: query shape, index, statistics, or data model.
6. Re-run under comparable conditions and compare results.
7. Test write overhead and other queries affected by the change.

## Beware of benchmarks

A query run once on a warm cache is not a representative production benchmark. Consider concurrency, data volume, cache state, parameter skew, and p95/p99 latency. `EXPLAIN ANALYZE` adds measurement overhead and should not be used casually on huge production operations.

## Read loops and buffers carefully

A nested-loop join can be excellent when the outer side is small and the inner lookup is indexed; it can be disastrous when the inner side is repeatedly scanned for a large outer result. Check `loops` and actual rows together rather than reading one timing in isolation. Buffer hits mean a page was found in shared buffers, not that the query had no cost; CPU, tuple processing, and result transfer still matter.

For modifications, `EXPLAIN ANALYZE` executes the statement. To test safely, use a disposable copy or wrap a supported modification in a transaction and roll it back, while remembering that external side effects from triggers or functions may not be reversible. Prefer production-like staging for risky plans.

## Practice

Capture plans for an indexed lookup, a broad report, and a join with an aggregation. Identify one estimated/actual row mismatch and test whether updated statistics change the plan. Explain why forcing an index is rarely the first response.
