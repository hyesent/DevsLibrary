---
title: "Test levels and the test pyramid"
order: 3
book: "testing"
---

# Test levels and the test pyramid

Test levels describe the scope of the behavior under examination; they are not competing religions.

## The mental model

Unit tests isolate a small unit; component tests examine a UI or service component; integration tests exercise boundaries between real collaborators; contract tests verify agreements between independently developed systems; end-to-end tests exercise a user-visible path through a running application. System and acceptance tests evaluate broader requirements.

## How to apply it

Prefer many fast, focused tests, a meaningful layer of integration tests, and a smaller set of high-value end-to-end journeys. The ideal mix depends on architecture: a distributed system may need substantial contract and integration coverage. Choose the lowest level that can convincingly prove the behavior in question.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A “unit” test is not defined solely by file size or by mocking everything. A large end-to-end test can be valuable, but using it for every tiny rule makes feedback slow and failures hard to diagnose. The pyramid is a heuristic, not a mandatory shape.

## Practice lab

For a checkout feature, map price arithmetic to unit tests, database persistence to integration tests, payment-provider agreement to contract tests, and one critical purchase journey to end-to-end testing.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
