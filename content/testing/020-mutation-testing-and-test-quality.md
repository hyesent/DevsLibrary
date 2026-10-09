---
title: "Mutation testing and test quality"
order: 20
book: "testing"
---

# Mutation testing and test quality

Mutation testing asks whether the suite detects small, intentional defects inserted into the code.

## The mental model

A mutation might invert a comparison, remove a condition, change an arithmetic operator, or replace a return value. A surviving mutant indicates either a missing assertion, an untested behavior, an equivalent mutation, or a test environment problem. The mutation score is the proportion of non-equivalent mutants killed.

## How to apply it

Use mutation testing on high-risk business logic and critical calculations. Inspect surviving mutants rather than chasing a score blindly. Combine it with code review, branch coverage, and real defect history to assess whether assertions are meaningful.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Mutation testing can be expensive and scores can be gamed. Some mutations are behaviorally equivalent under the domain constraints. A high score does not prove the specification is right or that all integration boundaries work.

## Practice lab

Run a mutation tool on a discount or permission module. For each surviving mutant, decide whether the behavior is untested, impossible, irrelevant, or wrongly specified.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
