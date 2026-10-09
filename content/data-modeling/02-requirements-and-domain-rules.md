# 2. Requirements, Questions, and Domain Rules

A data model is only as accurate as the requirements behind it. Requirements should describe facts the system must represent, operations it must support, and invariants that must never be violated. Vague statements such as “store customers” are not enough. A useful requirement might be: “A customer may have several delivery addresses, and each order must retain the address used when the order was placed.”

## Convert narratives into facts

Take a short business description and mark:
- **Nouns** that may be entities or value concepts.
- **Verbs** that may describe relationships or events.
- **Rules** that constrain allowed states or quantities.
- **Time language** such as “at the time of purchase,” “currently,” or “historically.”
- **Exceptions** that challenge the apparent default.

Nouns are clues, not automatic tables. “Address” could be a value object, a separate entity, or a historical snapshot depending on whether addresses have independent identity, reuse, and lifecycle.

## Write testable rules

Compare these statements:

- Vague: “Orders should have products.”
- Testable: “An order contains one or more order lines, and each line refers to one product.”
- More precise: “A draft order may be empty, but an order cannot be submitted until it contains at least one valid line.”

The third statement distinguishes lifecycle states. The schema may enforce some rules through constraints, while the application or transaction logic enforces others. Record where each rule lives and why.

Useful rule categories include:
- **Identity:** what makes a record distinguishable?
- **Cardinality:** how many related records are allowed?
- **Validity:** which values or states are permitted?
- **Uniqueness:** which combinations must not repeat?
- **Temporal:** when does a fact become effective, and can it be revised?
- **Authorization:** who may see or change the fact?
- **Lifecycle:** when may a record be created, changed, archived, or deleted?

## Separate current state from events

A stock quantity is current state; a stock receipt or sale is an event that changes it. Depending on audit and reconciliation needs, a system may store both. The event history can explain how the current quantity was reached, while the current-state value makes common reads fast. If both are stored, define the authoritative source and a reconciliation strategy.

## Discover requirements with examples

Use concrete scenarios rather than asking only abstract questions:
- Can a course have no instructor temporarily?
- Can an order be cancelled after shipment?
- Can a user have two active subscriptions?
- Does changing a product's name alter old invoices?
- Can a booking cross a daylight-saving transition?
- What happens if two users claim the last available seat?

These questions reveal cardinality, history, concurrency, and lifecycle details that a happy-path description misses.

## Practice

Choose a small system you know. Write ten domain rules in the form “A … may/must …”. Label each as identity, relationship, validity, uniqueness, temporal, authorization, or lifecycle. For each rule, identify whether it should be enforced by a database constraint, a transaction, application logic, or a human process.

**Key idea:** turn informal expectations into explicit rules that can be tested and assigned to an enforcement layer.
