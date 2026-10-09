---
title: "Flaky tests and failure diagnosis"
order: 26
book: "testing"
---

# Flaky tests and failure diagnosis

A flaky test passes and fails without a relevant code change, weakening trust in the suite.

## The mental model

Common causes include race conditions, shared state, unstable selectors, arbitrary sleeps, network dependence, resource contention, and nondeterministic ordering. Diagnose by collecting repeated runs, environment details, logs, traces, screenshots, and timing data.

## How to apply it

Reproduce with repetition and randomized order. Determine whether the test, product, or environment is nondeterministic. Replace fixed waits with condition-based waits, isolate data, and fix real race conditions. Quarantine only as a temporary, visible measure with an owner and deadline.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Blind retries can hide product defects and make CI appear healthier than it is. Do not simply increase timeouts without understanding what is slow or unstable. Treat flaky failures as engineering work, not background noise.

## Practice lab

Build a flaky-test report showing frequency, recent history, ownership, and suspected cause. Fix the highest-impact flaky test and verify it over repeated runs.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
