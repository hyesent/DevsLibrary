# INSERT, UPDATE, DELETE, and RETURNING

Data manipulation statements change persistent state. The most important discipline is to make the target set explicit and verify what changed. In application code, parameterize values instead of building SQL by string concatenation.

## Insert and retrieve generated values

```sql
INSERT INTO customers (email, display_name)
VALUES ($1, $2)
RETURNING id, email, created_at;
```

`$1` and `$2` illustrate driver parameters; in `psql`, use literal values or prepared statements instead. `RETURNING` returns values from rows affected by the statement, avoiding a separate query to guess which identity value was generated.

Multiple rows can be inserted in one statement:

```sql
INSERT INTO products (sku, name, current_price)
VALUES ('BK-101', 'Database Design', 24.99),
       ('BK-102', 'SQL Practice', 18.50);
```

If a constraint fails, the statement fails. Inside an explicit transaction, the transaction enters an error state until rolled back or recovered to a savepoint.

## Update narrowly

```sql
UPDATE orders
SET status = 'cancelled'
WHERE id = $1 AND status = 'draft'
RETURNING id, status;
```

The predicate includes the expected previous state. If no row is returned, the order may not exist or may no longer be a draft. This is a useful optimistic-concurrency pattern. Never run an update without checking the `WHERE` clause and the affected-row count. A missing predicate can update every row.

## Delete with intent

```sql
DELETE FROM sessions
WHERE expires_at < now()
RETURNING id;
```

For a destructive cleanup, first run the equivalent `SELECT` to estimate the target set, then execute in a controlled transaction or bounded batches if the table is large. Foreign keys can reject deletion or cascade to dependent rows. The right behavior depends on the data's lifecycle and audit requirements.

## Upsert is not magic

```sql
INSERT INTO inventory (sku, quantity)
VALUES ($1, $2)
ON CONFLICT (sku) DO UPDATE
SET quantity = inventory.quantity + EXCLUDED.quantity
RETURNING sku, quantity;
```

`EXCLUDED` represents the proposed row. This example adds quantity atomically for the unique SKU. `ON CONFLICT DO NOTHING` can be appropriate for deduplication, but do not use it to hide every integrity failure: a conflict on the wrong key or unexpected duplicate may indicate a bug.

## Avoid SQL injection

Safe: `WHERE email = $1` with email passed separately as a parameter. Unsafe: interpolating untrusted text into SQL syntax. Parameters represent values, not table or column names; dynamic identifiers require strict allowlists and correct identifier quoting in the driver.

## Treat row counts as part of the contract

For conditional updates, the number of returned rows is often the cleanest signal of success. A stock decrement with `WHERE quantity >= $1` avoids a separate read followed by an unsafe write. If the caller needs to distinguish “unknown SKU” from “not enough stock,” perform a follow-up read or use a carefully designed statement that returns a status, while keeping race conditions in mind.

Bulk modifications should be bounded when they could lock many rows or generate large WAL volumes. For archival jobs, select stable batches by primary key and commit between batches. Avoid relying on `ctid` as a long-lived application cursor because it is a physical row location, not a stable identity.

## Practice

Implement a stock adjustment that cannot make inventory negative, returns the new quantity, and distinguishes “SKU not found” from “insufficient stock.” Consider a conditional `UPDATE` with `quantity >= requested_amount` and examine affected-row count.
