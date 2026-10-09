# Tables, Keys, and Constraints

A table describes a set of entities or facts. Its columns should have stable meanings, and its constraints should reject states that the domain says are invalid. Application validation improves feedback, but database constraints protect against bugs, scripts, background workers, and concurrent requests that bypass a particular UI.

## Primary and foreign keys

```sql
CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  display_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id bigint NOT NULL REFERENCES customers(id),
  status text NOT NULL CHECK (status IN ('draft','placed','cancelled')),
  total numeric(12,2) NOT NULL CHECK (total >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);
```

A primary key is unique and not null. A foreign key enforces referential integrity: an order cannot reference a nonexistent customer. The default foreign-key action restricts deleting a referenced parent. `ON DELETE CASCADE` is powerful but can delete large dependent graphs; choose it only when dependent rows truly have no independent lifetime.

Identity columns generate values, but they do not guarantee gapless numbering. Rollbacks and concurrent inserts can consume sequence values. Never use a sequence as a count of business events or assume IDs reflect exact commit order.

## Unique constraints and NULL

A `UNIQUE` constraint prevents duplicate key combinations. By default, PostgreSQL treats nulls as distinct for uniqueness, so multiple rows may contain null in a unique column. PostgreSQL versions that support `NULLS NOT DISTINCT` can alter that behavior. Better still, decide whether the value is required and use `NOT NULL` when appropriate.

Composite uniqueness expresses a business rule such as one membership per user per organization:

```sql
CREATE TABLE memberships (
  organization_id bigint NOT NULL,
  user_id bigint NOT NULL,
  role text NOT NULL CHECK (role IN ('member','admin')),
  PRIMARY KEY (organization_id, user_id)
);
```

## Check constraints and defaults

A default is used when an insert omits a column; it does not validate an explicitly supplied value. A check constraint rejects values for which its expression is false, but a `CHECK` expression that evaluates to null does not reject the row. Pair checks with `NOT NULL` when null is invalid.

```sql
quantity integer NOT NULL CHECK (quantity > 0)
```

## Changing a schema safely

For a large live table, adding a constraint may require scanning rows or taking locks. Plan migrations around lock duration and existing data. A common staged approach is to add a constraint as `NOT VALID` where supported, repair invalid rows, then validate it separately. Test the exact migration on a realistic copy before production.

## Constraint names and migration ergonomics

Name important constraints explicitly (`orders_customer_id_fkey`, `orders_total_nonnegative`) so migrations and error handling do not depend on auto-generated names. A foreign key does not automatically create an index on the referencing column. If the application frequently finds all orders for a customer or deletes a parent row, an index on `orders(customer_id)` may be important to avoid scanning the child table.

Be careful with cross-row rules. A `CHECK` constraint is intended to validate the row being written and should not be used to query other rows for a global invariant. Use unique/exclusion constraints, normalized relationships, or transaction logic with proper locking for rules spanning rows.

## Practice

Add a `line_items` table with a foreign key to orders, positive quantity, nonnegative unit price, and uniqueness for one product per order. Decide whether deleting an order should cascade to its lines and justify the decision.
