---
title: "Testing distributed systems and resilience"
order: 39
book: "testing"
---

# Testing distributed systems and resilience

Distributed systems fail in combinations: partial outages, delays, partitions, duplicate work, and inconsistent observations.

## The mental model

Resilience tests examine timeouts, retries, circuit breakers, bulkheads, backpressure, leader changes, replication lag, service discovery, and dependency degradation. Fault injection introduces controlled failures to verify that the system fails safely and recovers.

## How to apply it

Use a failure matrix to enumerate component failures and expected behavior. Set strict limits on fault experiments, isolate environments, and monitor system health. Verify recovery and data consistency after the fault, not just graceful error display during it.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Retry storms can amplify an outage. A circuit breaker test that never exercises half-open recovery is incomplete. Fault injection without guardrails can cause real data loss.

## Practice lab

Simulate a dependency that is slow, unavailable, and intermittently failing. Verify bounded latency, graceful degradation, alerting, and recovery without duplicate side effects.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
