---
title: "Behavior-driven development and acceptance criteria"
order: 34
book: "testing"
---

# Behavior-driven development and acceptance criteria

BDD connects shared examples of behavior to implementation and automated checks.

## The mental model

Given/When/Then scenarios describe context, an action, and an expected outcome. Good scenarios are concrete, business-readable, and independent of UI mechanics unless UI behavior is the requirement. They can guide acceptance tests and help product, design, and engineering align.

## How to apply it

Keep scenarios focused on rules and outcomes. Use examples that distinguish important cases. Automate at the appropriate layer rather than driving every scenario through a browser. Treat feature files as living specifications only if teams keep them accurate.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A large feature file full of low-level clicks is not automatically BDD. Duplicated prose that drifts from tests becomes dead documentation. Avoid ambiguous steps whose meaning changes by context.

## Practice lab

Write acceptance scenarios for subscription cancellation, including active subscription, already cancelled state, failed billing dependency, and confirmation of access end date.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
