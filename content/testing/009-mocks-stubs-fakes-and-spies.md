---
title: "Mocks, stubs, fakes, and spies"
order: 9
book: "testing"
---

# Mocks, stubs, fakes, and spies

Test doubles replace or observe collaborators, but each kind provides different evidence.

## The mental model

A stub returns predefined responses. A mock often verifies expected interactions. A fake is a lightweight working implementation, such as an in-memory repository. A spy records calls while retaining behavior. A dummy fills a parameter that is irrelevant to the test. These distinctions are useful even when frameworks use the names loosely.

## How to apply it

Replace slow, costly, nondeterministic, or hard-to-trigger external systems at the boundary. Keep core business logic real. Prefer simple fakes for stateful behavior and reserve interaction assertions for important protocols, such as “send one message after commit.”

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Mocking every internal method creates tests that mirror the implementation and break during harmless refactors. A mock cannot prove that a real database, browser, or payment provider behaves the same way.

## Practice lab

Test an order service with a fake repository and a stubbed payment gateway. Then add one integration test against the real database adapter to validate the adapter contract.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
