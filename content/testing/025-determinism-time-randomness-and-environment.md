---
title: "Determinism, time, randomness, and environment"
order: 25
book: "testing"
---

# Determinism, time, randomness, and environment

A deterministic test produces the same result for the same controlled inputs and environment.

## The mental model

Sources of nondeterminism include wall-clock time, random values, scheduling, network availability, locale, time zone, filesystem ordering, ports, external services, and shared state. Tests should make relevant environmental assumptions explicit and control them where practical.

## How to apply it

Inject clocks and random generators; pin dependencies; isolate ports and temporary directories; set locale and time zone deliberately; avoid depending on test order. When concurrency is the behavior under test, control synchronization and assert invariants rather than relying on lucky timing.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Freezing time globally can interfere with timers or libraries that use different clocks. Over-mocking concurrency can hide real race conditions. A deterministic test environment should not erase the production behavior you need to validate.

## Practice lab

Run a test suite in a different time zone and with randomized test order. Identify hidden assumptions and replace them with explicit setup.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
