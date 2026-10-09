---
title: "Exploratory testing and session-based charters"
order: 23
book: "testing"
---

# Exploratory testing and session-based charters

Exploratory testing is simultaneous learning, test design, and execution—not random clicking.

## The mental model

A charter defines a mission, such as “explore recovery when uploads fail,” with boundaries and questions. The tester observes behavior, varies conditions, records evidence, and adapts based on discoveries. Session-based testing time-boxes this work and captures notes, coverage, risks, and defects.

## How to apply it

Explore personas, unusual sequences, interruption, permissions, responsive layouts, keyboard-only use, slow networks, stale data, and confusing messages. Turn valuable discoveries into reproducible defect reports and automated regression tests where automation is economical.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Unstructured exploration can miss areas and be difficult to repeat. Over-scripted exploration loses the benefit of following surprising behavior. Track the areas explored and remaining uncertainty.

## Practice lab

Run a 30-minute charter against a file upload feature. Record setup, actions, observations, bugs, unanswered questions, and follow-up automation candidates.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
