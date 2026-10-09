---
title: "API testing and HTTP contracts"
order: 14
book: "testing"
---

# API testing and HTTP contracts

API tests validate externally observable behavior at the request/response boundary.

## The mental model

Test methods, paths, status codes, headers, schemas, content types, authentication, authorization, pagination, filtering, sorting, idempotency, rate limits, and error formats. Verify semantics such as safe GET behavior and appropriate cache controls, not just whether JSON parses.

## How to apply it

Build requests through the same routing and middleware stack used in production. Validate both success and failure contracts. For pagination, test first, middle, last, empty, and invalid pages or cursors. Ensure errors do not leak stack traces or secrets.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A unit test of a handler function does not prove routing, middleware, or serialization works. A test that accepts any 2xx status may miss a contract regression. Keep API schemas and expectations synchronized deliberately.

## Practice lab

Design a table-driven API suite for an authenticated resource: anonymous request, wrong role, valid request, malformed body, missing field, duplicate request, and unavailable dependency.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
