# Reliability: Timeouts, Retries, Queues, and Limits

## Learning goals
Design for partial failures, where a dependency is slow or unavailable while other components still run.

## Failures are often partial
A database may accept connections but respond slowly; a remote API may succeed while the response is lost; a queue may deliver a message more than once. Treat network calls as fallible and bound their resource use. Every outbound request should have a suitable timeout, and connection pools should have limits.

## Retries require care
Retries can recover from transient failures, but they can amplify overload. Use bounded retries, exponential backoff and jitter, and retry only operations that are safe to repeat or protected by idempotency. A timeout does not prove the remote operation failed: the server may have completed a payment or write while the response was lost. Retrying without an idempotency strategy can duplicate side effects.

## Queues and asynchronous work
Queues decouple request handling from slower tasks and absorb bursts. They also introduce eventual completion, retries, duplicate delivery, poison messages and backlogs. Consumers should be idempotent, messages should have bounded size, and dead-letter handling should include inspection and replay policy. A queue does not make work reliable automatically; it changes the failure modes.

## Backpressure and limits
When the system is overloaded, reject or defer work rather than accepting unlimited requests that exhaust memory and connections. Apply rate limits, concurrency limits, queue capacity and payload size limits. Prefer explicit overload responses over mysterious timeouts. Ensure autoscaling does not increase pressure on a fixed-size database without connection and query controls.

## Graceful degradation
Identify which features can be temporarily disabled or served from cached data when a dependency fails. Do not silently return stale or incomplete data where correctness is critical. Communicate degraded behavior in metrics and logs so operators can distinguish it from healthy operation.

## Practice
Trace a request that calls a third-party service and writes to a database. Define timeouts, retry policy, idempotency key, concurrency cap, alert and user-visible behavior. Simulate the third-party service becoming slow and verify the API does not accumulate unbounded work or exhaust the database pool.
