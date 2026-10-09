# 7. Normalization: The First Principles

Normalization organizes relational data to reduce undesirable redundancy and modification anomalies. It is not a contest to maximize the number of tables. The aim is to represent each fact in a place consistent with its meaning and dependencies.

Consider a table that repeats customer name and address on every order. When the address changes, many rows may need updating. If one row is missed, the database contains contradictory answers. This is an **update anomaly**. An **insertion anomaly** occurs when a fact cannot be recorded without inventing an unrelated fact. A **deletion anomaly** occurs when removing one record accidentally erases the only copy of another fact.

Normalization addresses these problems by decomposing relations based on dependencies while preserving the ability to reconstruct required information through joins.

## The practical sequence

1. Identify the facts and candidate keys.
2. Identify attributes that depend on those keys.
3. Look for repeating groups and attributes that contain multiple values.
4. Look for attributes that depend on only part of a composite key.
5. Look for non-key attributes that depend on other non-key attributes.
6. Check that decomposition preserves important dependencies and does not lose information when relations are joined.

The formal normal forms provide increasingly strong criteria. In day-to-day work, the important habit is to ask: “What fact does this column represent, and what determines it?”

## Redundancy is not always wrong

A customer name may be duplicated onto an invoice intentionally because the invoice must preserve the name shown at the time of sale. This is a historical snapshot, not accidental duplication, if the rule is explicit. Similarly, a cached aggregate can be useful for performance if the system defines how it is refreshed and reconciled.

Normalization does not mean never repeating any value. It means avoiding uncontrolled redundancy that creates ambiguity about which copy is authoritative.

## Normalize before optimizing

Start with a correct, understandable model. Measure actual query patterns before introducing denormalized copies. Premature denormalization makes every write path more complicated and can make data inconsistencies difficult to detect. When denormalization is justified, document:
- The performance problem it solves.
- Which representation is authoritative.
- How changes propagate.
- What happens when propagation fails.
- How discrepancies are monitored and repaired.

## Practice

Design an order and order-line model. Decide whether customer address, product name, and unit price should be referenced from current records or captured as historical snapshots. Explain the business meaning of each choice rather than treating it as a purely technical preference.

**Key idea:** normalize facts according to their dependencies; duplicate deliberately only when semantics or measured performance justify it.
