---
title: "Testing caches and performance-sensitive data paths"
order: 40
book: "testing"
---

# Testing caches and performance-sensitive data paths

Caches introduce freshness, invalidation, key design, and concurrency behaviors that ordinary happy-path tests miss.

## The mental model

Test cache hit and miss behavior, expiration, invalidation after writes, tenant-aware keys, stale data policy, serialization, cache outages, and stampedes. A cache may be an optimization or part of the user-visible freshness contract; the distinction determines acceptable failure behavior.

## How to apply it

Use a controllable clock for TTL tests and verify both cached and uncached correctness. Ensure keys include all authorization and query dimensions. Test fallback behavior when the cache is unavailable, and avoid depending on a shared real cache in unit tests.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A cache can leak data between users if keys omit tenant or permission context. Invalidating only one of several derived keys causes stale reads. Tests that assert only “cache called” miss incorrect values.

## Practice lab

Test a profile update, verify stale data is invalidated, advance a fake clock past TTL, and confirm a cache outage does not expose another user’s data.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
