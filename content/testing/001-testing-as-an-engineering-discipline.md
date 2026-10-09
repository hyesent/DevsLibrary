---
title: "Testing as an engineering discipline"
order: 1
book: "testing"
---

# Testing as an engineering discipline

Testing is the deliberate collection of evidence about software behavior. It is not merely proving that code works; it is reducing uncertainty about whether a system meets its stated needs under relevant conditions.

## The mental model

A test observes a system under a controlled setup, applies an input or action, and compares an observable result with an explicit expectation. A useful test has a clear claim, a reliable setup, an informative failure, and an appropriate cost. Testing cannot prove the absence of every defect in a nontrivial system; it can reveal defects and increase confidence within a defined scope.

## How to apply it

Separate verification (did we build the thing according to its specification?) from validation (did we build the thing people actually need?). Treat tests as executable examples of requirements, not as a substitute for requirements. Prioritize risk: a payment calculation, authentication boundary, or data migration deserves more scrutiny than a decorative label.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A green test suite means only that the executed tests passed in that run. It does not mean the software is bug-free, the tests are correct, or production conditions were represented. Tests can encode the same mistaken assumption as the implementation.

## Practice lab

Choose a feature you know. Write its intended behavior in plain language, list what could go wrong, identify observable evidence, and rank the risks by impact and likelihood.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
