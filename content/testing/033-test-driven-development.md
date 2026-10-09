---
title: "Test-driven development"
order: 33
book: "testing"
---

# Test-driven development

TDD uses a short red-green-refactor cycle to shape behavior and design through executable feedback.

## The mental model

Red means write a focused test that fails for the intended reason. Green means make the smallest change that satisfies it. Refactor while preserving passing behavior. TDD works best when the behavior can be specified and feedback is fast; exploratory spikes may be useful when the design is unknown.

## How to apply it

Start from an observable example, avoid writing a large batch of speculative tests, and keep the cycle small. Use failures to clarify the interface. After green, improve names, duplication, and boundaries, then rerun tests. TDD is a design technique, not a guarantee of quality.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Writing a test that fails because of a syntax error is not meaningful red. Overfitting the implementation to one example can miss general behavior. TDD does not eliminate integration, usability, security, or exploratory testing.

## Practice lab

Implement a small parser or pricing rule using several red-green-refactor cycles. Explain what each test taught you about the design.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
