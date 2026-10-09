---
title: "Unit testing and pure functions"
order: 6
book: "testing"
---

# Unit testing and pure functions

Unit tests are most economical when the behavior has clear inputs and outputs and few hidden dependencies.

## The mental model

Pure functions return results determined by their arguments and have no externally visible side effects. They are straightforward to test with examples, boundary values, and properties. Stateful units can still be unit-tested, but their state transitions and collaborators need explicit control.

## How to apply it

Cover ordinary cases, boundaries, invalid inputs, empty collections, and meaningful combinations. Test return values and relevant effects. Do not aim for a large count of trivial assertions; aim for cases that distinguish correct behavior from plausible defects.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Testing every line does not guarantee meaningful behavior coverage. A test that only checks a value is defined can pass while the value is wrong. Avoid tests coupled to local variable names or private helper structure unless that structure is itself a deliberate contract.

## Practice lab

Write tests for a discount function including zero subtotal, exact threshold, one unit below, maximum discount, invalid percentage, and currency rounding.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
