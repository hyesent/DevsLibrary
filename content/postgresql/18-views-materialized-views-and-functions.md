# Views, Materialized Views, and Functions

Views provide named query interfaces. Materialized views store the results of a query and must be refreshed. Functions encapsulate reusable database logic, but they also create an API and security boundary that deserves versioning and tests.

## Views as contracts

```sql
CREATE VIEW app.customer_order_summary AS
SELECT c.id AS customer_id,
       c.email,
       count(o.id) AS order_count,
       coalesce(sum(o.total) FILTER (WHERE o.status = 'placed'), 0) AS placed_value
FROM app.customers c
LEFT JOIN app.orders o ON o.customer_id = c.id
GROUP BY c.id, c.email;
```

A view can centralize complex joins and present a stable shape to reporting consumers. A normal view does not store a cached result; its query is expanded into the consuming query. Changes to underlying columns can affect dependent views and application expectations.

## Materialized views

Materialized views persist a result set, which can make expensive reports faster at the cost of freshness and refresh work. `REFRESH MATERIALIZED VIEW CONCURRENTLY` has prerequisites, including a suitable unique index, and it is not free. Decide how stale the report may be and how refresh failures are detected.

## SQL functions

Functions can return scalar values or rows. Keep them focused and document null behavior, volatility, and side effects. Volatility labels (`IMMUTABLE`, `STABLE`, `VOLATILE`) are promises to the planner; falsely labeling a function can cause incorrect results. A function that reads changing tables should not be called immutable.

## Security-definer functions

`SECURITY DEFINER` runs with the function owner's privileges. It can safely expose a narrow operation to callers without granting broad table access, but careless search paths and dynamic SQL can create privilege-escalation vulnerabilities. Set a safe fixed `search_path`, schema-qualify objects, validate inputs, and restrict who can replace the function.

## Avoid hidden business logic

Putting logic in the database can be appropriate for invariants, reporting, and operations close to the data. But business rules split across triggers, functions, and application code can become difficult to test and deploy. Choose a clear ownership model and ensure migrations update function definitions predictably.

## Treat database routines as versioned APIs

A function used by several applications has callers, compatibility expectations, and deployment order just like an HTTP endpoint. Changing its parameter types or result columns can break consumers. Prefer additive changes, deploy callers in a coordinated sequence, and test functions through the runtime role. Avoid broad grants on every function in a schema if only a small subset should be callable.

Materialized-view refreshes can contend with other work and may require substantial temporary disk or I/O. Schedule and monitor refreshes, expose the timestamp of the last successful refresh, and make stale data visible to users when the freshness requirement matters.

## Practice

Create a view for a customer dashboard, then create a materialized view for a large monthly report. Document the freshness contract and what alert should fire if refresh fails.
