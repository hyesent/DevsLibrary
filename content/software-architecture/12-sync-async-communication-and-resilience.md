# 12. Synchronous and Asynchronous Communication

Synchronous communication waits for a response during the current interaction. Asynchronous communication lets the sender proceed while work is completed later. Both are useful; choosing between them changes user experience, coupling, failure behavior, and consistency.

## Synchronous calls

An HTTP request-response call is straightforward when the caller needs an immediate answer. It also couples the caller to the dependency's availability and latency. A chain of synchronous calls adds latency and creates more places where a request can fail.

Set timeouts explicitly. A timeout limits how long the caller waits; it does not prove the remote operation failed. The remote system may have completed the work before the response was lost.

## Asynchronous messaging

A queue or event stream can buffer work and absorb bursts. The sender may receive an acknowledgement that a message was accepted, not that the business operation completed. The product should communicate pending states when necessary, and the system needs retry, dead-letter, and reconciliation behavior.

Asynchronous work can improve resilience but makes state transitions less immediate. Do not use a queue to hide a workflow that actually requires a synchronous, authoritative decision.

## Retries and backoff

Retries can recover from transient errors, but repeated requests can overload an already struggling dependency. Use bounded retries, exponential backoff, and jitter where appropriate. Retry only errors that are plausibly transient, and make side effects idempotent. A retry budget or circuit breaker may prevent uncontrolled amplification.

## Circuit breakers and bulkheads

A circuit breaker temporarily stops calls to a dependency after a defined failure pattern, allowing recovery and protecting callers. A bulkhead isolates resources so one slow dependency does not consume every thread or connection. These patterns require careful thresholds, fallback semantics, and monitoring; a fallback must not return misleading success for a critical operation.

## Backpressure

When incoming work exceeds processing capacity, queues grow. Systems need limits, load shedding, producer throttling, or admission control. An unbounded queue can turn a short overload into a long recovery problem.

## Practice

Design notification delivery for a booking system. Decide what the booking API returns before email is sent, how retries work, how a permanent failure is surfaced, and how queue growth triggers operator action.

**Key idea:** communication style defines failure and freshness semantics; choose it based on what the caller and business actually need.
