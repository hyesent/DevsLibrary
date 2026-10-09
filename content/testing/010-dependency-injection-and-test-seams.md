---
title: "Dependency injection and test seams"
order: 10
book: "testing"
---

# Dependency injection and test seams

Testability is largely an architectural property: dependencies must be replaceable at sensible boundaries.

## The mental model

A seam is a point where behavior can be substituted or observed. Constructor injection, function parameters, adapters, ports, environment configuration, and module boundaries create seams. A clock, random-number source, filesystem, network client, and queue are all dependencies that can make tests nondeterministic.

## How to apply it

Pass a clock or ID generator into logic that needs time or randomness. Wrap external APIs behind small interfaces. Keep production defaults convenient while allowing tests to supply deterministic collaborators. Avoid global mutable state because it creates hidden coupling between tests.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Do not introduce a complex dependency-injection framework solely to test a tiny function. The aim is explicit dependencies and clear ownership, not abstraction for its own sake.

## Practice lab

Refactor a report generator so the current date and data source can be supplied explicitly. Verify that tests do not depend on the machine clock or network.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
