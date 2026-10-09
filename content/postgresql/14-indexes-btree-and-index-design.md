# Indexes and Index Design

An index is an auxiliary data structure that helps PostgreSQL find rows without scanning the entire table. Indexes consume disk and memory, add write overhead, and must be maintained as rows change. The goal is not to index every column; it is to support important query patterns at an acceptable cost.

## B-tree basics

B-tree is the default index type and supports equality and ordered range comparisons for many data types. A common pattern:

```sql
CREATE INDEX orders_customer_created_idx
ON orders (customer_id, created_at DESC, id DESC);
```

This can help queries filtering by `customer_id` and ordering by `created_at` and `id`. The leading-column rule matters: an index on `(customer_id, created_at)` is not generally equivalent to an index on `(created_at, customer_id)` for filtering and ordering.

## Match indexes to predicates

A B-tree index can often support `column = value`, range predicates, and suitable ordering. A leading-wildcard search such as `ILIKE '%term%'` usually needs a different strategy, such as trigram indexing via an extension, full-text search, or a dedicated search system. Choose based on semantics, language needs, and measured scale.

## Unique and partial indexes

A unique index enforces uniqueness as well as supporting lookups. A partial index covers only rows matching a predicate:

```sql
CREATE INDEX active_sessions_user_idx
ON sessions (user_id, expires_at)
WHERE revoked_at IS NULL;
```

This can reduce index size when queries frequently target active sessions. The query predicate must be compatible with the index predicate for the planner to use it.

## Expression indexes

If queries repeatedly use a normalized expression, an expression index may help:

```sql
CREATE UNIQUE INDEX users_lower_email_idx ON users (lower(email));
```

This enforces case-insensitive uniqueness according to `lower` and can support lookups using the same expression. Consider collation and internationalization requirements before deciding that lowercasing is the correct identity rule.

## Covering indexes and write cost

`INCLUDE` columns can allow index-only scans when visibility information and query needs permit, but they enlarge the index. Large included values can make writes expensive and reduce cache efficiency. Index-only scans are not guaranteed simply because all selected columns appear in the index.

## Operational concerns

Creating an index on a busy table can block writes depending on the method. `CREATE INDEX CONCURRENTLY` reduces blocking but has restrictions and can leave an invalid index if it fails. Monitor migration duration, disk space, and locks. Remove redundant indexes only after checking constraints, query plans, and actual usage.

## Indexes have a write and maintenance budget

Every index adds work to inserts, updates, and deletes, and can increase backup size and cache pressure. An index on a frequently updated column can be especially costly. Before adding an index, state the target query and expected benefit; after adding it, measure latency and write overhead. Use `pg_stat_user_indexes` and workload statistics as clues, but do not drop an index solely because a short observation window shows few scans—rare constraints and infrequent critical queries still matter.

A multicolumn index is not a substitute for understanding selectivity. Put columns in an order that matches common equality predicates, range conditions, and ordering requirements, then validate with representative parameter values.

## Practice

Given queries for a customer's latest 20 orders and for all expired sessions, propose indexes. Explain the column order and how you would validate the decision using plans and workload measurements.
