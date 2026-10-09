---
title: "API and UI test doubles: when to mock"
order: 31
book: "testing"
---

# API and UI test doubles: when to mock

Mocking is a design trade-off: it increases control while reducing evidence about real integration.

## The mental model

Mock external systems when their cost, instability, or failure modes need precise control. Keep meaningful domain logic real. Use contract and integration tests to close the confidence gap introduced by doubles. The choice depends on whether the assertion concerns decisions made by the unit or behavior of the collaborator.

## How to apply it

For a payment workflow, unit-test decisions with a stubbed gateway, contract-test the gateway adapter, and integration-test persistence and transaction handling. Avoid mocking a function merely because it is easy to mock. Verify important interaction ordering only when order is part of the contract.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Over-mocking can make tests pass even when production wiring is broken. Under-mocking can make tests slow and nondeterministic. Neither “mock everything” nor “never mock” is a useful universal rule.

## Practice lab

For each dependency in a feature, state what evidence is needed and select unit, fake, contract, or integration coverage accordingly.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
