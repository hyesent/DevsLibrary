---
title: "Negative testing and error behavior"
order: 8
book: "testing"
---

# Negative testing and error behavior

A robust system must fail predictably when inputs, dependencies, permissions, or assumptions are wrong.

## The mental model

Negative tests cover invalid input, missing data, unauthorized access, unavailable services, timeouts, conflicts, malformed payloads, and resource exhaustion. Verify not only that an error occurs but also its type, safe message, state effects, and recovery path.

## How to apply it

Check that failed operations do not partially persist changes. Ensure retries do not duplicate payments or messages. Distinguish expected domain errors from unexpected failures; callers should receive stable contracts while sensitive implementation details remain in logs rather than user-facing responses.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A broad assertion such as “throws any error” can pass because of an unrelated bug. Tests that expect exact internal exception wording may become brittle. A system that reports an error after secretly completing the action is especially dangerous.

## Practice lab

Simulate a database timeout during order creation. Verify the API response, transaction rollback, idempotency behavior, and whether a safe retry is possible.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
