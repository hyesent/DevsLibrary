# Relational Design and Normalization

Relational design is the work of deciding what each row represents, how entities relate, and which facts should be stored once. Good design reduces contradictory data and makes updates predictable. Normalization is not an academic ritual; it prevents anomalies that appear when the same fact is copied into several places.

## Start with grain

Before creating a table, finish this sentence: **one row represents ...** Examples: one customer, one order, one product line within an order, or one recorded payment attempt. If a row mixes several independent concepts, updates become fragile.

Suppose an order table repeats customer email and address on every order. When the customer changes email, every old order may need updating. If only some rows change, the database now disagrees with itself. A customer table stores the customer's current contact data once; an order references the customer by key. If historical addresses are legally or operationally important, model address snapshots or address history explicitly instead of relying on accidental duplication.

## Functional dependencies

A functional dependency `A -> B` means that a value of A determines a value of B in the modeled domain. If `product_id` determines `product_name`, repeating the product name in every order line creates update anomalies unless the line intentionally records the historical name at sale time.

First normal form means values are represented in a form the model can address consistently, rather than hiding repeating groups in a single field. Second and third normal forms build on key dependencies and reducing dependencies on only part of a composite key or on non-key attributes. You do not need to recite every formal definition to benefit: identify facts, keys, and the lifecycle of each fact.

## A normalized baseline

```sql
CREATE TABLE products (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku text NOT NULL UNIQUE,
  name text NOT NULL,
  current_price numeric(12,2) NOT NULL CHECK (current_price >= 0)
);
CREATE TABLE order_lines (
  order_id bigint NOT NULL REFERENCES orders(id),
  product_id bigint NOT NULL REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price_at_purchase numeric(12,2) NOT NULL CHECK (unit_price_at_purchase >= 0),
  PRIMARY KEY (order_id, product_id)
);
```

`unit_price_at_purchase` intentionally duplicates a price because it is a historical fact for that sale, not a copy of the product's current price. This is a legitimate snapshot, not necessarily a normalization error.

## When denormalization is justified

Denormalization can improve read performance or preserve historical meaning, but it adds consistency obligations. If you cache a count on a parent row, define which transaction updates it, how repairs work, and how concurrent increments avoid lost updates. If you copy data for analytics, document its freshness and source of truth.

## Practical modeling sequence

1. List entities and events.
2. Define row grain and candidate keys.
3. Mark required versus optional attributes.
4. Draw one-to-many and many-to-many relationships.
5. Put each fact with the entity or event that owns its meaning.
6. Add constraints for uniqueness and valid relationships.
7. Test insert, update, delete, and historical-data scenarios.

## Model lifecycle, not just nouns

Two rows that look similar may represent different facts because their lifetimes differ. A product's current price changes, but a completed order's agreed unit price normally does not. A person's current address may change, while an invoice's billing address may need to remain historically accurate. Write down which values are snapshots and which are live references. That decision prevents accidental historical edits.

For a many-to-many relationship, the join table may have its own attributes—membership role, enrollment date, position, or status. Once it has lifecycle or behavior, treat it as a first-class entity rather than a hidden implementation detail.

## Practice

Model students enrolling in courses. Explain why a student and course need a join table, whether repeated enrollment is allowed, and what a grade row represents if a course can be retaken.
