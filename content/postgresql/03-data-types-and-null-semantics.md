# Data Types and NULL Semantics

Choosing a PostgreSQL type is part of data modeling. Types constrain invalid values, communicate intent, determine operators, and influence storage and indexing. Do not store everything as `text` and hope application code keeps it consistent.

## Common choices

- `smallint`, `integer`, `bigint`: exact whole numbers with different ranges.
- `numeric(p,s)`: exact decimal arithmetic, often appropriate for money-like quantities when the domain needs fixed precision.
- `real`, `double precision`: approximate floating-point values; avoid for exact currency calculations.
- `text` and `varchar(n)`: variable-length text. A length limit is a domain rule, not a performance magic switch.
- `boolean`: true/false/unknown (because a nullable boolean can be `NULL`).
- `date`: calendar date without a time zone.
- `timestamp`: date and time without a time zone.
- `timestamptz`: an instant normalized internally; rendered in the session time zone.
- `uuid`: globally unique identifiers when UUID semantics are useful.
- `jsonb`: queryable JSON data when a portion of the record is intentionally flexible.

For event times, `timestamptz` is usually the right default. For a birthday or due date, `date` often expresses the domain more accurately. A time zone is not stored as a label in `timestamptz`; choose a display zone at the application boundary.

## NULL is not an ordinary value

`NULL` means missing, unknown, or not applicable according to your domain. It is not equal to itself:

```sql
SELECT NULL = NULL;       -- NULL, not TRUE
SELECT NULL IS NULL;      -- TRUE
```

Use `IS NULL` / `IS NOT NULL`. Comparisons with `NULL` generally produce unknown, and a `WHERE` clause keeps only rows whose predicate is true. This can surprise developers:

```sql
SELECT * FROM orders WHERE cancelled_at = NULL; -- returns no matches
SELECT * FROM orders WHERE cancelled_at IS NULL; -- correct test
```

`COALESCE(value, fallback)` returns the first non-null argument. Use it when the fallback has meaningful semantics, not just to hide missing data. `NULLIF(a,b)` returns null when the values are equal.

## Constraints make types useful

```sql
CREATE TABLE product_prices (
  product_id bigint PRIMARY KEY,
  amount numeric(12,2) NOT NULL CHECK (amount >= 0),
  currency char(3) NOT NULL
    CHECK (currency ~ '^[A-Z]{3}$')
);
```

The check here validates a simple shape, not whether a currency is supported by the business. A constraint cannot replace a domain decision. Keep invariants close to the data so every writer—not only one application screen—must respect them.

## Casts and implicit conversion

Use explicit casts where meaning could be ambiguous: `created_at::date`, `value::numeric`, or `CAST(value AS integer)`. Implicit casts can make expressions harder to reason about and can interfere with index use when a column is wrapped in a conversion.

## Time, money, and identifiers need domain decisions

Store an event as an instant (`timestamptz`) and render it in a chosen zone. Store a future appointment that belongs to a named local time zone with enough information to preserve the intended local time when daylight-saving rules change; a bare timestamp cannot represent every scheduling intention. For money, define currency and rounding policy alongside precision. `numeric(12,2)` rounds inputs to scale; it does not decide whether that rounding is acceptable for tax or exchange calculations.

Enums can make a finite state set explicit, but changing enum values has deployment considerations. A checked text column is easier to evolve in some systems. Choose based on the lifecycle of the allowed values, not style preference.

## Practice

Design types for a book publication date, account balance, login timestamp, and optional middle name. Explain why floating point is risky for exact monetary totals and why `NULL` should not automatically mean zero or an empty string.
