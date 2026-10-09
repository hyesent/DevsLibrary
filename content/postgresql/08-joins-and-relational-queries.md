# Joins and Relational Queries

A join combines rows according to a relationship predicate. The key question is not just which tables to join, but what one output row represents. A join that multiplies rows unexpectedly can corrupt totals and pagination even when its SQL is syntactically valid.

## Inner and outer joins

```sql
SELECT o.id, c.email, o.total
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id;
```

An inner join returns matching pairs. A left join preserves each row from the left side and fills right-side columns with null when no match exists:

```sql
SELECT c.id, c.email, o.id AS order_id
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id;
```

This can return multiple rows per customer if a customer has multiple orders. If you need one row per customer, aggregate or use an existence predicate rather than pretending the relationship is one-to-one.

## The outer-join filter trap

These queries are not equivalent:

```sql
-- Customers with no orders, plus customers with paid orders
SELECT c.id, o.id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'placed';

-- Filters after the join; customers without a matching order disappear
SELECT c.id, o.id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.status = 'placed';
```

A `WHERE` predicate on the nullable right side removes unmatched rows because the predicate becomes unknown. Put relationship matching criteria in `ON` when you intend to preserve left-side rows.

## Many-to-many and row multiplication

If an order has several lines and each product has several tags, joining both collections can create a product of lines × tags. Summing the order total after this join can overcount it. Aggregate each child relation to the desired grain before joining, or use `EXISTS` when only membership matters.

```sql
SELECT c.id, c.email
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id AND o.total > 100
);
```

`EXISTS` asks whether at least one qualifying row exists. It avoids duplicate customer rows caused by joining every matching order.

## Anti-joins

To find customers without orders:

```sql
SELECT c.id, c.email
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
```

This is often safer than `NOT IN` when the subquery might return null, because SQL's null semantics can make `NOT IN` evaluate to unknown.

## Join discipline

- State the output grain before writing the query.
- Join on key relationships, not coincidental text equality.
- Inspect row counts before and after each join.
- Check whether aggregates are computed before or after one-to-many multiplication.
- Use aliases consistently and qualify ambiguous column names.

## Validate cardinality before trusting totals

For every join, write down whether the relationship is one-to-one, one-to-many, or many-to-many. Then compare row counts and distinct entity counts before adding aggregates. If a customer has three orders and each order has two lines, joining customers → orders → lines produces six rows for that customer. Summing customer-level or order-level amounts after that expansion can multiply values.

When the task is to retrieve one representative related row, use a deterministic ranking or a purpose-built PostgreSQL pattern such as `DISTINCT ON`, with an explicit `ORDER BY`. Do not rely on whichever row happens to appear first in an unordered result.

## Practice

Report each customer and their order count, including customers with zero orders. Then find customers who have at least one placed order but no cancelled orders. Verify that the first query returns one row per customer.
