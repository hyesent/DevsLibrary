# 24. Capstone: Model a Library Platform

This capstone brings together requirements discovery, keys, relationships, normalization, temporal data, access boundaries, and physical design. The goal is not to produce the largest schema; it is to create a model whose decisions can be explained and tested.

## Requirements

A library platform manages organizations, members, bibliographic titles, physical or digital copies, loans, holds, and payments for certain fees. A member belongs to an organization. A title may have multiple authors and editions. An edition may have multiple physical copies. A copy can be loaned repeatedly over time but must not have two overlapping active loans. Members may place holds on titles. Historical loans must remain auditable after a copy is withdrawn or a member account is deactivated.

## Logical model

A reasonable starting point includes:
- `organization`
- `member`
- `title`
- `author`
- `title_author`
- `edition`
- `copy`
- `loan`
- `hold`
- `fee_payment` or an equivalent payment record

Use explicit relationships. `title_author` is a junction table because titles and authors are many-to-many. `copy` belongs to an edition; `loan` refers to a copy and member. Decide whether digital licenses should share the copy model or use a separate concept, based on whether their lifecycle and availability rules are genuinely the same.

## Keys and integrity

Use stable primary keys and add business uniqueness constraints such as a unique external catalog identifier when the domain guarantees it. Include tenant/organization scope in the model where records are organization-owned. A foreign key from a loan to a copy prevents loans for nonexistent copies. A status check constrains allowed status labels, but does not by itself prevent invalid transitions.

The “no overlapping active loans for one copy” rule needs stronger enforcement than checking availability in application code. Depending on the database, use a range/exclusion constraint, a transaction with appropriate locking, or a serialization strategy. A naive read-then-insert can allow two requests to loan the same copy concurrently.

## Historical semantics

Store checkout, due, return, and creation timestamps with clear time semantics. Define whether a title or author name change should update historic loan displays. Keep bibliographic current state separate from historical transaction facts when audit or reporting requires it. If a member is deactivated, retain loan records under a defined retention policy rather than cascading away the history.

## Query and index design

Typical queries include:
- List currently available copies of an edition.
- Show a member's active and past loans.
- Find overdue loans for an organization.
- List holds for a title in queue order.
- Report monthly loans by title or category.

Derive indexes from these query shapes and realistic cardinalities. For example, indexes may be useful on loan copy references and active/due-date access patterns, but exact choices depend on the database and whether partial indexes are available. Confirm using query plans and representative data.

## Transactions and reliability

A checkout operation should atomically confirm eligibility, claim the copy, create the loan, and record relevant state. If payment processing involves an external provider, do not pretend a database transaction can atomically commit the provider's side effect. Use an explicit workflow with idempotency, persisted state, retries, and reconciliation.

## Deliverables

1. A relationship diagram with cardinality and optionality.
2. A data dictionary defining columns and units.
3. SQL DDL with keys, foreign keys, checks, and uniqueness constraints.
4. Five representative queries and justified indexes.
5. Tests for duplicate memberships, invalid references, tenant isolation, and simultaneous checkout attempts.
6. A migration plan for adding a new field to loans without downtime.
7. A retention and backup/restore plan.

## Evaluation rubric

Score the model on domain accuracy, integrity, history semantics, security boundaries, query support, migration safety, and explainability. A schema that runs but cannot explain its assumptions is unfinished. Review the model with example edge cases before calling it production-ready.

**Key idea:** a strong data model is a set of explicit business facts and enforceable invariants, supported by tested operational practices.
