---
title: "End-to-end and browser automation"
order: 12
book: "testing"
---

# End-to-end and browser automation

End-to-end tests verify critical user journeys across a deployed-like application boundary.

## The mental model

A browser automation test typically starts or connects to the app, navigates pages, interacts with controls, waits for observable conditions, and checks user-visible results. Test stable journeys: sign in, create an important record, search, update, and recover from a meaningful error.

## How to apply it

Use semantic locators such as role and accessible name, isolate test data, and wait for a condition rather than sleeping a fixed number of milliseconds. Capture traces, screenshots, console errors, and network context on failure. Keep the suite small enough to run reliably.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Brittle selectors tied to CSS classes, arbitrary sleeps, shared accounts, and tests that depend on prior tests are common sources of flakiness. Do not make every edge case an end-to-end test when lower layers can cover it faster.

## Practice lab

Automate one journey from a clean account through a completed task. Run it repeatedly and in parallel to reveal data collisions and timing assumptions.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
