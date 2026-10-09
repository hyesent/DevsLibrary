# Lesson 20: Database Performance and Query Shaping

**Track:** Data Architecture

## Learning objectives
- Identify expensive query patterns
- Understand indexes and query plans
- Prevent N+1 queries and uncontrolled result sizes

## Lesson
### Measure before rewriting

Database performance problems often arise from a small number of queries, missing indexes, large result sets, lock contention, or excessive round trips. Start with query duration, frequency, rows examined, rows returned, and the database's execution plan. Optimize the dominant cost instead of rewriting code based on intuition.

An index can speed reads but increases storage and write cost. A broad index is not automatically better than a selective one, and a composite index's column order matters for the predicates and sort patterns it supports. Use the actual query plan and representative data.

### N+1 and batching

An N+1 pattern loads a list and then performs another query for each row. For 100 courses, one query for courses plus 100 queries for instructors may create 101 round trips. A join, batch query, or data-loader pattern can reduce the number of round trips. However, a huge join can multiply rows and memory usage, so shape the result intentionally.

Avoid selecting every column when only a few fields are needed. Limit results, paginate, and use explicit sort order. API defaults should prevent a caller from requesting millions of rows in one response.

### Indexes, selectivity, and plans

Indexes are useful when they allow the engine to find a small subset of rows or satisfy ordering without scanning and sorting everything. Low-selectivity columns may be less useful alone, though they can help in a composite index. Functions applied to indexed columns may prevent use of a normal index unless a matching expression index exists.

Use `EXPLAIN` or the database's equivalent. For write-heavy tables, assess index maintenance cost and vacuum/statistics behavior where relevant. Do not add indexes blindly; review query plans and monitor the change under realistic load.

### Locking and contention

A query can be fast in isolation and slow under concurrent writes because transactions wait on locks. Hot counters, inventory rows, and frequently updated status records can become contention points. Shorten transactions, avoid network calls while locks are held, and choose atomic updates or queue-based serialization where suitable.

Deadlocks can occur when transactions lock the same resources in different orders. Keep a consistent lock order and handle deadlock errors with bounded retries when safe. Monitor lock waits and transaction duration, not only query execution time.

### Performance budgets and regression protection

Give critical endpoints a rough budget for application work, database time, and external calls. Re-run representative query plans after schema changes and compare p95 latency. Performance tests should use realistic data volume; a table with 30 rows will not expose a missing index that becomes painful at 30 million rows.

Avoid brittle tests tied to exact milliseconds on shared CI machines. Prefer query-count assertions, plan inspection where stable, and load-test thresholds with enough tolerance to account for noise.

## Worked example

If a page loads 40 lessons and queries the author separately for each, replace the loop with a single query that fetches all required authors or joins the author data. Verify the query plan and response shape so the optimization does not duplicate lesson rows or expose fields the API should omit.

## Exercises

1. Explain the read/write trade-off of an index.
2. Identify an N+1 query in a hypothetical list endpoint.
3. Name two reasons a query can be slow only under concurrency.

## Solution notes

Indexes consume storage and add maintenance to inserts/updates/deletes. A query per item is the classic N+1 pattern. Lock waits and connection-pool exhaustion can cause concurrency-only slowness.

## Review checklist

- Can I explain: identify expensive query patterns?
- Can I explain: understand indexes and query plans?
- Can I explain: prevent n+1 queries and uncontrolled result sizes?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
