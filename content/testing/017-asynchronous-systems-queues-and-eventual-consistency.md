---
title: "Asynchronous systems, queues, and eventual consistency"
order: 17
book: "testing"
---

# Asynchronous systems, queues, and eventual consistency

Asynchronous work introduces time, ordering, retries, duplicate delivery, and partial failure into the test model.

## The mental model

A message may be delivered more than once, delayed, or processed after a related state has changed. Eventual consistency means different views can temporarily disagree. Tests should model the contract: delivery guarantees, idempotency, retry policy, dead-letter handling, and when a result becomes observable.

## How to apply it

Use controllable clocks and queues where possible. Wait for a meaningful condition with a deadline, not a fixed sleep. Test duplicate messages, out-of-order events, transient failures, poison messages, and restart recovery. Verify transactional outbox or equivalent patterns where database state and message publication must align.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Assuming exactly-once delivery is a classic trap. A test that passes only when the machine is fast is flaky. Acknowledging a message before durable processing can lose work; retrying non-idempotent handlers can duplicate effects.

## Practice lab

Deliver the same “payment completed” event twice and verify the order is settled once. Then simulate a temporary downstream failure and confirm bounded retry and eventual recovery.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
