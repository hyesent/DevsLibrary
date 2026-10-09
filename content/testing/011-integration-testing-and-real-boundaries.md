---
title: "Integration testing and real boundaries"
order: 11
book: "testing"
---

# Integration testing and real boundaries

Integration tests establish whether separately correct units actually work together.

## The mental model

Integration targets include application-to-database mapping, serialization, filesystem behavior, cache clients, queues, framework middleware, and configuration. They catch schema mismatch, transaction behavior, encoding, query assumptions, and wiring errors that isolated tests cannot observe.

## How to apply it

Use disposable databases or isolated schemas, realistic migrations, known seed data, and cleanup that remains safe after a failure. Test the real adapter with the production database engine when SQL dialect behavior matters. Keep the scope focused enough to diagnose.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

An in-memory substitute may not implement the same constraints or transaction semantics as production. Shared test databases lead to order-dependent failures and data leakage. A test that only verifies the mock received a query is not a database integration test.

## Practice lab

Create an integration suite that migrates an empty database, inserts a record through the repository, reads it back, verifies constraints, and rolls back or cleans up reliably.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
