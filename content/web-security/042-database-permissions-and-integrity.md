---
title: "Database Permissions and Integrity"
order: 42
book: "web-security"
---

## Mental model

A compromised web process should not automatically have database administration rights. Separate runtime, migration, reporting, and operational identities. Restrict schemas, tables, rows, network access, and high-risk operations.

## Failure modes and design choices

Use constraints and transactions for invariants such as uniqueness and referential integrity. Check-then-insert application logic can race; a database uniqueness constraint is a durable guarantee. Row-level security can add defense in depth but must be tested with owners, privileged roles, connection pooling, and background jobs.

## Verification and engineering practice

Test database grants, constraints, tenant policies, backup restoration, and behavior under concurrent writes.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
