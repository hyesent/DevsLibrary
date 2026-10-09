---
title: "Contract testing between services"
order: 15
book: "testing"
---

# Contract testing between services

Contracts make assumptions between service providers and consumers explicit and testable.

## The mental model

A consumer-driven contract captures the interactions a consumer relies on: request shape, response fields, status behavior, and relevant error cases. Provider verification checks that the service still satisfies those interactions. Schema validation and compatibility tests are related approaches but do not cover every behavioral assumption.

## How to apply it

Test required fields and behavior that consumers actually use. Make additive changes carefully: optional response fields are usually safer than removing or changing existing fields. Include error responses and versioning expectations. Run provider verification in CI and publish compatibility results.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A schema can be valid while semantics are wrong—for example, a `total` field may unexpectedly change from cents to dollars. Contracts should describe meaningful behavior, not merely JSON shape. Avoid overconstraining fields consumers do not use.

## Practice lab

Write a contract for a client that requests an order and relies on its ID, currency, amount, and status. Verify both the provider and a representative consumer.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
