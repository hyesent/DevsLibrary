# 23. Reviewing and Testing a Data Model

A data model should be reviewed like executable system design. A diagram can look tidy while missing uniqueness rules, historical requirements, tenant boundaries, or concurrency hazards. A review should test both normal workflows and the states the system must refuse.

## Review checklist

- Are entities and value concepts distinguished clearly?
- Does every table have an intentional key?
- Are business uniqueness rules explicit?
- Are foreign keys and delete behaviors deliberate?
- Are nullable fields meaningful?
- Are types, units, and time semantics clear?
- Are lifecycle transitions defined?
- Is historical information preserved where required?
- Are privacy, retention, and authorization addressed?
- Can expected queries be supported with reasonable indexes?
- Are derived values rebuildable or reconcilable?
- Can schema changes be deployed safely?

## Test invariants, not just examples

A few seed rows show that a happy path works; they do not prove the schema enforces its rules. Test that duplicate business keys fail, nonexistent references fail, invalid values fail, and valid edge cases succeed. Include boundary conditions such as empty optional values, maximum lengths, daylight-saving transitions, retries, and concurrent writes.

For concurrency invariants, run two operations at the same time in a controlled test. A “check then insert” workflow may pass sequential tests but fail under race conditions. Prefer database-enforced uniqueness and transactions with suitable isolation/locking for cross-row rules.

## Property-based and generative testing

Property-based tests generate many inputs and assert general rules, such as “no order line has a negative quantity” or “each active membership is unique per tenant and user.” Generative tests can uncover combinations that manually written fixtures miss. They complement, rather than replace, targeted scenario tests and production monitoring.

## Test migrations with realistic data

Migrations should be tested from the prior schema version with representative data volume and edge cases. Check data counts, constraints, lock duration, replication impact, and rollback or roll-forward procedures. Test restore as well as backup creation: a backup that cannot be restored is not a reliable recovery plan.

## Practice

For a reservation system, write tests for no overlapping bookings of a resource, valid booking states, tenant isolation, and idempotent request retries. State which rules need database constraints and which require transaction-level logic.

**Key idea:** a model is credible when its invariants are explicit and tested under realistic failure conditions.
