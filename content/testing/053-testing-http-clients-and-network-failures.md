---
title: "Testing HTTP clients and network failures"
order: 53
book: "testing"
---

# Testing HTTP clients and network failures

Network clients need tests for serialization, headers, status handling, timeout behavior, retry rules, and response parsing.

## The mental model

A client typically converts domain inputs into a request and converts status/body data into a result or typed error. Test the request contract and the response contract separately. A local fake server or request interception tool can simulate deterministic responses without depending on the public internet.

## How to apply it

Cover success, empty body, malformed JSON, non-success status, timeout, connection reset, cancellation, and retry exhaustion. Verify that retries apply only to safe or idempotent operations, or that idempotency keys protect side effects.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A test that reaches the live internet can fail for reasons unrelated to the code and may create real side effects. Retrying every error can duplicate writes or amplify outages.

## Practice lab

Use a local server or network interceptor to simulate 200, 404, 500, malformed payload, and timeout responses; verify the client’s documented behavior.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
