---
title: "Code coverage and what it does not prove"
order: 21
book: "testing"
---

# Code coverage and what it does not prove

Coverage measures which parts of code were executed by a test run; it does not directly measure correctness.

## The mental model

Line coverage records executed lines; statement coverage tracks statements; branch coverage checks decision outcomes; condition coverage examines boolean subexpressions; function coverage records called functions. Coverage can reveal untested areas and help target review.

## How to apply it

Use coverage reports to ask why important code lacks tests. Prioritize error paths, authorization branches, boundary conditions, and complex logic. Interpret coverage with mutation results and requirement traceability rather than setting one universal percentage as a definition of quality.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A test can execute every line without asserting a meaningful result. High line coverage can hide untested branches; 100% branch coverage still cannot enumerate all input values, concurrency schedules, or user workflows.

## Practice lab

Inspect a coverage report and identify code that ran but was not meaningfully asserted. Add tests for missing decisions, not just lines to raise the number.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
