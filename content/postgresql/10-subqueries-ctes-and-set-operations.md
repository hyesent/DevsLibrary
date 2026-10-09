# Subqueries, CTEs, and Set Operations

Subqueries express a query inside another query. Common table expressions (CTEs) give intermediate query steps names. Set operations combine compatible result sets. Use these tools to make logic clearer, but remember that query structure and execution strategy are related without being identical.

## Scalar and correlated subqueries

A scalar subquery returns one value, such as an aggregate:

```sql
SELECT c.id, c.email,
       (SELECT count(*) FROM orders o WHERE o.customer_id = c.id) AS order_count
FROM customers c;
```

The inner query references the outer row, so it is correlated. PostgreSQL may optimize many such forms, but for large workloads compare plans rather than assuming repeated execution or assuming perfect optimization.

## CTEs for named steps

```sql
WITH monthly_sales AS (
  SELECT date_trunc('month', created_at) AS month,
         sum(total) AS revenue
  FROM orders
  WHERE status = 'placed'
  GROUP BY 1
), ranked AS (
  SELECT month, revenue,
         dense_rank() OVER (ORDER BY revenue DESC) AS revenue_rank
  FROM monthly_sales
)
SELECT * FROM ranked ORDER BY month;
```

A CTE helps separate filtering, aggregation, and ranking. In modern PostgreSQL, non-recursive CTEs can often be inlined into the surrounding query; `MATERIALIZED` and `NOT MATERIALIZED` influence planning in specific cases. Do not use CTEs solely because you believe they always force a temporary result.

## UNION, INTERSECT, EXCEPT

`UNION` combines rows and removes duplicates. `UNION ALL` preserves duplicates and is usually cheaper when deduplication is unnecessary. `INTERSECT` returns common rows; `EXCEPT` returns rows from the first result absent from the second. Each side must return compatible column counts and types.

```sql
SELECT email FROM newsletter_subscribers
UNION
SELECT email FROM customers;
```

This returns distinct email values across both sources. If source identity matters, include a source column and use `UNION ALL`.

## Recursive CTEs

Recursive CTEs can traverse hierarchies such as category trees or reporting structures. They have a non-recursive seed and a recursive term. Guard against cycles and unbounded traversal; a malformed hierarchy can otherwise generate excessive work. For graph traversal, define cycle detection and maximum depth according to the domain.

## When to choose which form

- `EXISTS`: test whether related rows exist.
- Scalar subquery: compute one related value.
- CTE: name logical query stages or use recursion.
- Join: combine row sets when the output grain supports it.
- Set operation: combine compatible result sets from separate sources.

## Make recursion terminate

For recursive queries, test shallow, deep, empty, and cyclic data. A hierarchy that was assumed to be a tree may later contain a cycle after a bad import. PostgreSQL supports cycle-detection facilities in recursive CTEs in supported versions, and manual path tracking is another option. Set an intentional depth bound when the domain has one; do not use an arbitrary limit to hide malformed data without reporting it.

CTEs are a readability tool first. If a CTE is referenced multiple times or contains expensive work, inspect whether it is inlined or materialized in the target version. Compare plans before forcing a materialization boundary.

## Practice

Use a CTE to calculate each customer's most recent order and then filter to customers whose latest order is older than 90 days. Decide how customers with no orders should be represented.
