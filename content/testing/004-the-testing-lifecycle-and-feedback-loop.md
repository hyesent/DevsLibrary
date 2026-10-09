---
title: "The testing lifecycle and feedback loop"
order: 4
book: "testing"
---

# The testing lifecycle and feedback loop

Testing is most effective when it is continuous: clarify, design, implement, observe, learn, and refine.

## The mental model

A practical loop is: identify a behavior; define an oracle; create a minimal failing test when appropriate; implement; run the narrowest relevant test; run broader checks; inspect the diff; and preserve the test as regression protection. Exploratory testing complements scripted tests by discovering cases nobody anticipated.

## How to apply it

Use the shortest feedback loop during development and broaden checks before integration and release. Keep tests close to the code they protect, make them easy to run locally, and document any external service or environment needed. Test design begins before implementation, during requirements and interface design.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Treating testing as a final phase allows design problems and ambiguous requirements to become expensive. Running the entire slow suite after every tiny edit wastes feedback time; never running the full suite misses cross-module regressions.

## Practice lab

Practice test-first development on a small function, then use the same loop on a bug: reproduce, capture the failure, fix, rerun focused tests, and rerun relevant regressions.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
