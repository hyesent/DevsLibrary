# Lesson 18: Testing Strategy: Unit, Integration, Contract, and Load

**Track:** Production

## Learning objectives
- Choose tests by risk and boundary
- Test failure paths and invariants
- Avoid confusing coverage with confidence

## Lesson
### Use the test pyramid as a cost model, not a law

Unit tests are fast and isolate domain rules. Integration tests verify that code works with a real database, queue, or runtime adapter. Contract tests verify assumptions between independently deployed components. End-to-end tests verify a few critical user journeys. Load and resilience tests explore capacity and failure behavior. Each layer catches a different class of defect.

A large number of mocks can create a false sense of safety if tests only prove that the code calls the mock in the expected order. Keep domain logic testable, but run integration tests against the real database engine or a faithful managed test environment for constraints, transactions, and query behavior.

### Test invariants, not implementation trivia

A strong test asks whether duplicate reservations are impossible, whether a user cannot read another tenant's record, whether retrying a webhook produces one effect, or whether a failed email does not erase a committed order. These tests protect behavior across refactors. Avoid tests that assert private helper call counts unless that interaction is itself part of the contract.

Use property-based tests when many input combinations should satisfy a general rule. For example, a money parser should never accept NaN or silently round an invalid precision. Fuzz parsers and validation boundaries where malformed inputs are likely.

### Test concurrency and race conditions

Race bugs often survive sequential tests. Run concurrent attempts to reserve one seat and assert that exactly one succeeds. Simulate a timeout after the remote provider has committed but before the caller receives a response. Crash a worker after an external side effect and before acknowledging the message. These tests expose the uncertain windows that define real reliability.

Avoid relying on sleeps as the only synchronization mechanism. Use barriers, controlled fakes, database state checks, and deterministic failure injection where possible.

### Contract tests and API compatibility

Validate request and response schemas, status codes, headers, and documented error codes. For webhooks, test the provider's exact signature format and raw-body handling. For edge functions, run tests in the provider-compatible runtime or deployment preview in addition to local unit tests. A test that passes under Node does not prove compatibility with an isolate-based runtime.

For APIs used by mobile or external clients, test old supported contract versions and deprecation behavior. A field removal can be a breaking change even when the newest frontend works.

### Load, security, and regression tests

Load tests should model realistic payloads, data distributions, authentication, and dependency latency. Security tests should include object-level authorization, tenant isolation, injection attempts, rate limiting, secret leakage, and malformed tokens. Regression tests should be added for incidents, not just code branches.

Define release gates based on risk: tests that protect payment correctness should block release; a noncritical cosmetic check may have a different gate. Report skipped tests and environment limitations rather than saying “all tests pass” when important layers were not exercised.

## Worked example

For a webhook processor, unit-test signature parsing and state transitions, integration-test the unique event constraint and transaction, contract-test provider headers and payloads, then run a failure-injection test where the external action succeeds but the worker crashes before acknowledgement.

## Exercises

1. Choose test layers for a database uniqueness invariant.
2. Design a concurrency test for a limited-inventory endpoint.
3. Explain why a passing Node unit test is not enough for an edge deployment.

## Solution notes

Integration testing must verify the real constraint; concurrent requests test the race. Runtime compatibility, provider bindings, timeouts, and network behavior require provider-compatible tests or deployment smoke tests.

## Review checklist

- Can I explain: choose tests by risk and boundary?
- Can I explain: test failure paths and invariants?
- Can I explain: avoid confusing coverage with confidence?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
