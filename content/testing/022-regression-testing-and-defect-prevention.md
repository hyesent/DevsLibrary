---
title: "Regression testing and defect prevention"
order: 22
book: "testing"
---

# Regression testing and defect prevention

Regression tests preserve previously correct behavior when the system changes.

## The mental model

A regression test begins with a reproducible defect or an explicitly identified risk. It should fail before the fix, pass after it, and assert the user-visible or contractual behavior that was broken. Regression suites should remain curated so they protect important lessons without becoming an unmaintainable pile.

## How to apply it

When practical, capture the smallest failing case before changing code. After fixing, run the narrow test, related tests, and broader suite. Record why the case matters in the name or context. For recurring incidents, consider whether a missing invariant or architecture boundary deserves a stronger test.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A test written only after a fix can accidentally assert the new implementation rather than the original requirement. Adding a duplicate regression test for every symptom can create noise if one higher-level invariant would cover the same risk better.

## Practice lab

Take a production-like bug report, reproduce it, write a failing test, apply a fix, and demonstrate the test fails against the old implementation.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
