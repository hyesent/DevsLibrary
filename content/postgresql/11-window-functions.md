# Window Functions

A window function calculates a value across a related set of rows while preserving each row in the output. Unlike `GROUP BY`, it does not collapse the group into one result row. Window functions are useful for ranking, running totals, period-over-period comparisons, and selecting the latest row per entity.

## Ranking

```sql
SELECT customer_id, id, total,
       row_number() OVER (
         PARTITION BY customer_id
         ORDER BY total DESC, id
       ) AS position
FROM orders;
```

`PARTITION BY` starts a separate window for each customer. `row_number` gives every row a distinct position. `rank` leaves gaps after ties; `dense_rank` does not. A stable tie-breaker is important when a single row must win.

## Running totals

```sql
SELECT customer_id, created_at, id, total,
       sum(total) OVER (
         PARTITION BY customer_id
         ORDER BY created_at, id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_spend
FROM orders;
```

The explicit frame clarifies that the total advances row by row. Window frames matter: the default frame for an ordered window can include peers sharing the same ordering value. If a row-by-row result is required, specify the frame and deterministic order.

## Compare with the previous row

```sql
SELECT customer_id, created_at, total,
       lag(total) OVER (
         PARTITION BY customer_id ORDER BY created_at, id
       ) AS previous_total
FROM orders;
```

`lag` accesses an earlier row in the window. `lead` accesses a later row. These functions make sequence comparisons possible without manually joining a table to itself.

## Latest row per group

```sql
SELECT *
FROM (
  SELECT o.*,
         row_number() OVER (
           PARTITION BY customer_id
           ORDER BY created_at DESC, id DESC
         ) AS rn
  FROM orders o
) ranked
WHERE rn = 1;
```

The inner query assigns a rank within each customer, and the outer query filters it. PostgreSQL also offers `DISTINCT ON`, which can be concise for this task, but it requires ordering that makes the chosen row explicit.

## Performance considerations

Window functions often require sorting or buffering rows. Partition size, sort order, indexes, and the number of rows flowing into the window can influence cost. Filter early when semantically correct, and inspect `EXPLAIN (ANALYZE, BUFFERS)` on representative data.

## Window frames change the answer

`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` advances by physical rows in the ordered partition. A `RANGE` frame can include all peers sharing the current ordering value. For example, if several events share the same date and the window orders only by date, a running sum may include peer rows together. Add a unique ordering key and an explicit frame when the requirement is truly row-by-row.

Window functions run after the query's filtering and grouping stages, so a filter on a window result generally belongs in an outer query or a CTE. Keep the rows entering the window as small as semantics permit.

## Practice

For every product, rank monthly sales and calculate a running revenue total. Explain the difference between `rank`, `dense_rank`, and `row_number` when two products have the same revenue.
