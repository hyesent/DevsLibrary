# SELECT, Filtering, Sorting, and LIMIT

A query describes the rows and columns you need, not a procedural loop over the table. The planner chooses an execution strategy based on query shape, statistics, indexes, and estimated costs. Start by expressing correct semantics; optimize after measuring.

## Filtering

```sql
SELECT id, email, created_at
FROM customers
WHERE created_at >= $1
  AND email ILIKE $2
ORDER BY created_at DESC, id DESC
LIMIT 50;
```

`WHERE` filters rows before grouping. `AND` binds more tightly than `OR`, so use parentheses when the intended logic is not obvious. `ILIKE` is a PostgreSQL case-insensitive pattern match; `%` matches any sequence and `_` one character. A leading wildcard such as `'%book'` often cannot use a normal B-tree index for an efficient prefix lookup.

## NULL and three-valued logic

If `deleted_at` is nullable, `deleted_at IS NULL` is the correct active-row test. A predicate like `status <> 'cancelled'` does not include rows where status is null. This matters when a column is optional: decide whether unknown values should be excluded or explicitly included.

## Deterministic ordering

Without `ORDER BY`, row order is unspecified. Even with `ORDER BY created_at DESC`, rows sharing the same timestamp may appear in different relative orders. Add a unique tie-breaker such as `id DESC` when stable ordering matters.

`LIMIT` without deterministic ordering is especially risky. It can produce a different subset after an index change or a new plan. Pagination and API responses should use a defined ordering contract.

## Offset versus keyset pagination

Offset pagination is simple:

```sql
SELECT id, title FROM articles
ORDER BY created_at DESC, id DESC
LIMIT 20 OFFSET 1000;
```

Large offsets may require the database to walk past many rows, and concurrent inserts can cause records to shift between pages. Keyset pagination asks for rows after the last seen key:

```sql
SELECT id, title, created_at
FROM articles
WHERE (created_at, id) < ($1, $2)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

This requires the cursor to carry the last row's timestamp and id, and the comparison direction must match the ordering. Keyset pagination is generally more stable for long feeds.

## Avoid SELECT * in application contracts

`SELECT *` is useful while exploring, but production queries should select needed columns. Explicit projection reduces accidental coupling to schema changes and can avoid fetching large values that a screen does not need.

## Sargability and stable APIs

A predicate is often easier to optimize when the indexed column remains directly comparable to a value. `WHERE created_at >= $1` is generally more index-friendly than wrapping `created_at` in a function for every row. If a case-insensitive or computed lookup is essential, consider a matching expression index rather than assuming a normal index will help.

For cursor pagination, include every ordering key in the cursor and comparison. If ordering by nullable values, define null placement explicitly with `NULLS FIRST` or `NULLS LAST`, and make sure the cursor predicate reproduces that ordering. Otherwise users may see duplicates or skipped records as they page.

## Practice

Write a query for the 20 most recent non-cancelled orders for one customer. Make its ordering deterministic, decide how nullable statuses should behave, and compare an offset query with a keyset query.
