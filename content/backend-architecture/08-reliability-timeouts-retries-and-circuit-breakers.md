# Lesson 8: Reliability: Timeouts, Retries, and Bulkheads

**Track:** Production

## Learning objectives
- Set bounded timeouts
- Avoid retry amplification
- Design graceful degradation

## Lesson
### Every network call needs a deadline

Without a timeout, a request can wait indefinitely for a dependency that is stalled rather than dead. Timeouts should fit within an overall request deadline. If the caller has 800 ms remaining, starting a dependency call with a 5-second timeout cannot meet the caller's contract. Propagate deadlines where the protocol and libraries support it.

Choose connection, response, and total-operation timeouts according to the dependency and operation. A connection timeout is not the same as a read timeout. Record timeout rates separately from other errors so you can tell whether the dependency is slow or unavailable.

### Retries can multiply an outage

Retries help with brief transient failures, but synchronized retries can overwhelm a recovering dependency. If five layers each retry three times, one original request can trigger many downstream attempts. Keep retry ownership clear, bound attempts, use exponential backoff with jitter, and honor provider rate limits. Retry only when the operation is safe or protected by idempotency.

A timeout does not prove that the operation failed. The remote system may have completed it and lost the response. For payments, provisioning, and writes, query the operation status or use an idempotency key before repeating a side effect.

### Circuit breakers and bulkheads

A circuit breaker stops sending calls to a dependency after a failure threshold and periodically allows a probe to test recovery. It can protect a service from waiting on a dependency that is clearly unhealthy. It is not a replacement for timeouts and can be misconfigured if a small sample or a transient burst opens the circuit too readily.

Bulkheads isolate resource pools so one slow dependency does not consume every worker, connection, or thread. For example, limit concurrent calls to a recommendation provider separately from payment calls. A system can then continue processing critical work even while a noncritical integration is degraded.

### Graceful degradation and fallback

Degradation should be designed before an incident. A product catalogue might serve cached data while recommendations are unavailable. A payment flow should not silently claim success if the payment provider is down. Define which features can be omitted, which can use stale data, and which must fail closed.

Fallbacks can also create hidden correctness problems. Falling back to a secondary data source with a different consistency model can show conflicting state. Make degraded responses observable to operators and, when relevant, clear to clients.

### Failure testing and recovery

Test slow responses, connection resets, rate limits, malformed provider responses, database exhaustion, and partial success. Chaos testing is useful only when the environment and blast radius are controlled. For each failure, verify bounded latency, useful logs, no duplicate effects, and a recovery path. Runbooks should say who owns the incident, how to assess impact, how to disable a feature, and how to restore service safely.

## Worked example

A search endpoint calls a noncritical recommendation provider. Set a 150 ms deadline for recommendations inside a 500 ms total budget. If it times out, return search results without recommendations and emit a metric. Do not retry the recommendation call three times inside the same 500 ms budget.

## Exercises

1. Explain why a timeout can leave write outcome uncertain.
2. Design a bounded retry policy for a rate-limited read API.
3. Name two ways a bulkhead prevents cascading failure.

## Solution notes

The server may commit before the response is lost. Use bounded exponential backoff with jitter and provider rate-limit guidance. Separate pools or concurrency limits prevent a failing integration from exhausting all request workers or connections.

## Review checklist

- Can I explain: set bounded timeouts?
- Can I explain: avoid retry amplification?
- Can I explain: design graceful degradation?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
