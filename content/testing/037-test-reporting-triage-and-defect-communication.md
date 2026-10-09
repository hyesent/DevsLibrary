---
title: "Test reporting, triage, and defect communication"
order: 37
book: "testing"
---

# Test reporting, triage, and defect communication

A test result is useful when it helps someone make a decision and take the next action.

## The mental model

Reports should identify the failing test, expected versus actual behavior, environment, relevant logs, and artifacts. Defect reports include reproducible steps, impact, frequency, scope, and supporting evidence. Triage separates product defects, test defects, environment failures, and requirement ambiguity.

## How to apply it

Use consistent severity and priority definitions. Minimize reproduction steps without removing necessary context. Preserve trace IDs, screenshots, browser traces, and sanitized request data. Track flaky failures and recurring root causes. Do not paste secrets or sensitive user data into tickets.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A screenshot without steps may not reproduce the issue. “It is broken” gives little direction. Treating every failure as a product bug wastes time, but dismissing intermittent failures can hide real races.

## Practice lab

Write a high-quality bug report for a reproducible checkout defect with environment, exact steps, expected/actual results, impact, and diagnostic evidence.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
