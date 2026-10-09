---
title: "CI pipelines and test selection"
order: 36
book: "testing"
---

# CI pipelines and test selection

Continuous integration turns tests into fast, repeatable feedback on every meaningful change.

## The mental model

A pipeline may run formatting, linting, type checks, unit tests, integration tests, security scans, builds, contract verification, and selected browser tests. Different stages have different costs and failure meanings. Test selection can use changed areas, but dependencies and cross-cutting risks must be considered.

## How to apply it

Run fast checks early and expensive suites where they provide value. Cache safely, shard tests when deterministic, publish reports, and preserve diagnostics. Require critical checks for protected branches. A failed required check should have clear ownership and actionable output.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Overly long pipelines encourage bypasses; overly narrow pipelines miss regressions. Caches can hide stale outputs if keys are wrong. A green pipeline is useful only when checks are trustworthy and actually run.

## Practice lab

Design a pipeline for a web service: identify the checks on every pull request, nightly checks, release gates, and the artifacts needed to debug a failure.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
