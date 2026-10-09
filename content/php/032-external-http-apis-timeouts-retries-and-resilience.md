# 032. External HTTP APIs, Timeouts, Retries, and Resilience

> Book: PHP · Level: beginner to advanced · Part 32 of 45

# Learning goals
- Call external services safely.
- Set timeouts and bound retries.
- Design for partial failure.

Use a maintained HTTP client when practical. Set connection and total timeouts; handle DNS, TLS, transport, HTTP status, and decoding failures separately. Never disable TLS certificate verification as a troubleshooting shortcut in production.

Retries should be bounded and use backoff with jitter. Retry only errors likely to be transient, and consider whether the operation is idempotent. A timed-out POST may have succeeded remotely even if the caller did not receive the response. Use idempotency keys or reconciliation for operations with financial or irreversible effects.

Circuit breakers, bulkheads, concurrency limits, and fallback behavior can prevent a failing dependency from exhausting the whole application. Cache only when data freshness and authorization rules permit. Treat external responses as untrusted input.

## Practice
Build a client adapter that distinguishes transport failure, non-2xx response, invalid JSON, and domain-level error. Test each case without hitting the real service.
