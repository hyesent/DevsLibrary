# 6. The Relational Model and Integrity

A relational database represents data as relations, commonly implemented as tables. A row represents a tuple, a column has a defined domain, and keys and constraints express relationships and rules. SQL tables can include implementation details that do not map perfectly to the mathematical relational model, but the model still provides a powerful way to reason about consistency.

## Integrity categories

- **Entity integrity:** each row can be identified; in common SQL practice a primary key is unique and not null.
- **Referential integrity:** a foreign key references an existing permitted key value.
- **Domain integrity:** a value belongs to its intended domain, such as a valid range or enumerated set.
- **Business integrity:** combinations of values satisfy the domain's rules, such as a line quantity being positive.

For example:

```sql
CREATE TABLE order_line (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0)
);
```

The database protects these rules for writes from any client, not only the application's normal code path. That is a major reason to place durable invariants in constraints where feasible.

## NULL is not an ordinary value

SQL `NULL` represents missing, unknown, or inapplicable information, depending on the domain. It is not equal to zero, an empty string, or another `NULL`. Comparisons involving `NULL` usually evaluate to unknown, so `column = NULL` does not test for missing values; use `IS NULL`.

Three-valued logic can produce surprising filters. `WHERE active = true` excludes rows where `active` is null. A `CHECK` constraint in PostgreSQL passes when its expression evaluates to true or unknown, so `CHECK (amount > 0)` alone does not forbid null; add `NOT NULL` if required. Constraint behavior varies across engines, so verify the specific database.

## Functional dependencies

A functional dependency `A → B` means that for each value of A, there is at most one corresponding value of B in the relation. If `country_code` determines `country_name`, storing country names repeatedly in every customer row introduces an update anomaly when the name changes. A separate country table can centralize the fact.

Functional dependencies help identify candidate keys and reason about normalization. They are not inferred merely from current sample data. A few rows where every email is unique do not prove that email is a stable unique identifier; the rule must come from domain requirements.

## Integrity belongs in design

A schema that accepts contradictory states is often expensive to repair later. Use appropriate types, `NOT NULL`, `CHECK`, `UNIQUE`, primary keys, and foreign keys. Use transactions for rules that span multiple statements or rows, and carefully handle concurrent updates. Some cross-row rules cannot be expressed as a simple check constraint; use a suitable unique/exclusion constraint, transaction strategy, trigger, or application-level workflow with database-safe concurrency control.

## Practice

For a payment table, list the rules for identity, amount, currency, payment status, and order reference. Mark which can be enforced by a column type or declarative constraint and which require state-transition or external-provider logic.

**Key idea:** constraints are executable documentation and a last line of defense against invalid data.
