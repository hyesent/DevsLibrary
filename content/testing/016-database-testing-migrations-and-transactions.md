---
title: "Database testing, migrations, and transactions"
order: 16
book: "testing"
---

# Database testing, migrations, and transactions

Persistence behavior requires tests against schemas, constraints, query semantics, and transaction boundaries.

## The mental model

Test migrations from a clean database and from supported previous versions. Verify uniqueness, foreign keys, nullability, defaults, indexes where behavior matters, transaction rollback, concurrent updates, and data transformation. Query correctness includes sorting, pagination, time zones, and null semantics.

## How to apply it

Prefer isolated databases per test worker or transaction-based cleanup when compatible. Use realistic data volumes for query plans and performance checks. Test migrations as a sequence, not only the latest schema snapshot. Backups and restore procedures also need rehearsal.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Tests against SQLite may miss PostgreSQL-specific behavior. A migration that works on an empty database can fail on real historical data. Do not assume rollback is always possible after destructive schema changes.

## Practice lab

Test a migration with representative old rows, including nulls and duplicate candidates. Verify transformed values, constraints, and application compatibility during rollout.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
