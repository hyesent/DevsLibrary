---
title: "Performance and load testing"
order: 29
book: "testing"
---

# Performance and load testing

Performance testing evaluates responsiveness, throughput, resource use, and behavior under load.

## The mental model

Load testing models expected traffic; stress testing pushes beyond it; spike testing examines sudden changes; endurance testing finds degradation over time; capacity testing estimates sustainable limits. Measure latency distributions, throughput, errors, saturation, and resource use. Average latency alone hides tail behavior.

## How to apply it

Define realistic workloads and success thresholds before running. Use representative data, warm-up where appropriate, controlled load generation, and a system close to production. Monitor dependencies and distinguish client generator bottlenecks from server limits.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A single local benchmark is not a production capacity plan. Unrealistic request mixes and tiny datasets can mislead. Load tests against production need explicit authorization, limits, and safeguards.

## Practice lab

Create a workload model for an API, set p95/p99 latency and error-rate objectives, then test normal, peak, and burst traffic while collecting server metrics.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
