---
title: "Arrange, Act, Assert and readable tests"
order: 5
book: "testing"
---

# Arrange, Act, Assert and readable tests

A test should tell a reader what scenario exists, what action occurs, and what observable outcome matters.

## The mental model

Arrange establishes inputs and dependencies; Act invokes the behavior; Assert checks the result. Given/When/Then expresses the same structure in behavior language. Use descriptive names that include scenario and expected behavior, such as `rejectsExpiredSession`, not `test2`.

## How to apply it

Keep one principal reason to fail per test where practical. Use helper builders to reduce irrelevant setup, but do not hide the scenario behind opaque factories. Assert externally meaningful behavior and avoid checking every private implementation detail.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A test with many unrelated actions and assertions is difficult to diagnose. Excessive abstraction makes tests harder to read than production code. Conversely, repeating a little obvious setup can be clearer than a generic test framework of your own.

## Practice lab

Take a 50-line test and split it by behavior. Remove assertions that do not support its name; make the remaining setup understandable without opening several helper files.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
