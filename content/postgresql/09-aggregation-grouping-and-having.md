# Aggregation, GROUP BY, and HAVING

Aggregate functions summarize rows: `count`, `sum`, `avg`, `min`, and `max` are common examples. `GROUP BY` defines the grain of each output row. `WHERE` filters input rows; `HAVING` filters groups after aggregation.

## A basic report

```sql
SELECT customer_id,
       count(*) AS order_count,
       sum(total) AS lifetime_order_value,
       avg(total) AS average_order_value
FROM orders
WHERE status = 'placed'
GROUP BY customer_id
HAVING count(*) >= 3
ORDER BY lifetime_order_value DESC;
```

This reports only placed orders, groups them by customer, and keeps customers with at least three such orders. It does not include customers with zero qualifying orders because no group exists for them. To include those customers, start from `customers` and left join an aggregate of orders.

## NULL behavior

`count(*)` counts rows. `count(column)` counts rows where that column is not null. `sum`, `avg`, `min`, and `max` ignore null input values; when there are no non-null inputs, the result can be null. `COALESCE(sum(amount), 0)` may be suitable for a financial report, but only if “no recorded amounts” really means zero for that report.

## Grouping mistakes

Every selected expression must either be grouped, aggregated, or functionally dependent on grouped keys in a way PostgreSQL can recognize. More importantly, do not add columns to `GROUP BY` merely to silence an error: doing so changes the result grain and may split groups unexpectedly.

## Conditional aggregation

```sql
SELECT customer_id,
       count(*) FILTER (WHERE status = 'placed') AS placed_count,
       count(*) FILTER (WHERE status = 'cancelled') AS cancelled_count,
       sum(total) FILTER (WHERE status = 'placed') AS placed_value
FROM orders
GROUP BY customer_id;
```

`FILTER` lets several aggregates use different predicates without repeating the table scan in separate subqueries. It is particularly useful for dashboards and summary reports.

## Avoid fan-out before summing

If a query joins an order to every line and then sums `orders.total`, an order with four lines may be counted four times. Aggregate the lines to one row per order first, or sum line-level values if those are the intended source of truth. Aggregates should be computed at the correct grain.

## Reporting across empty periods

A fact table contains only periods with facts, so grouping sales by month omits months with zero sales. Generate a calendar series or join to a date dimension, then left join the aggregate and apply `COALESCE` to the measure where zero is the intended display. This is a modeling choice: an empty month may mean zero sales, but it may also mean data ingestion failed. Operational reports should distinguish those conditions where necessary.

Be explicit about currency and rounding when aggregating amounts. Rounding every line and then summing can differ from summing precise values and rounding once. The business rule should determine where rounding occurs.

## Practice

Create a monthly sales report with order count, revenue, and average order value. Define the time zone used to decide which month a timestamp belongs to. Add a second query that includes months with no sales and explain where a calendar table or `generate_series` can help.
