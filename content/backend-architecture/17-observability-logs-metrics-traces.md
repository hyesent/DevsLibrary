# Lesson 17: Observability: Logs, Metrics, Traces, and SLOs

**Track:** Production

## Learning objectives
- Design telemetry around user-visible behavior
- Use structured logs and distributed traces
- Define service-level indicators and objectives

## Lesson
### Monitoring answers known questions; observability helps investigate unknowns

A metric is a numeric time series suited to trends and alerting. A log is a timestamped event with contextual detail. A trace shows how one operation crosses components and where time or errors accumulate. These signals complement one another. A dashboard can show elevated latency, a trace can locate the slow dependency, and structured logs can reveal the specific error category.

Do not instrument everything indiscriminately. Define the questions operators need to answer during a failure: which users or endpoints are affected, when it began, what dependency changed, whether writes succeeded, and whether recovery is progressing.

### Structured logging and safe context

Prefer structured fields such as timestamp, severity, service, environment, request ID, trace ID, route template, status, duration, and error code. Route templates avoid creating a separate metric/log category for every user ID. Redact tokens, passwords, session cookies, and sensitive payloads. Logging a complete request object is convenient during development but dangerous in production.

Use correlation IDs consistently across HTTP requests, queue jobs, and provider calls. Do not trust a client-supplied ID blindly; validate its format and create an internal ID when necessary. A correlation ID should help connect events, not act as an authorization credential.

### Metrics and cardinality

Useful service metrics include request rate, error rate, latency percentiles, saturation, queue age, database pool wait, cache hit rate, and dependency outcomes. Avoid high-cardinality labels such as raw user IDs, email addresses, full URLs with query parameters, or arbitrary error messages. High cardinality can make monitoring expensive and slow.

Instrument business outcomes too: successful checkouts, failed payment attempts, enrollment completion, and job processing delay. Technical health does not always reveal product failure; an API can return 200 while silently producing the wrong result.

### Tracing across asynchronous boundaries

Distributed tracing records spans for a request and its downstream calls. Propagate trace context through HTTP headers and queue metadata where supported. A worker that processes a job minutes later should retain a link to the originating operation, but trace retention and sampling policies may require a linked trace rather than one long open trace.

Sampling reduces cost but can hide rare failures if applied carelessly. Consider keeping all errors and sampling normal high-volume traffic. Avoid placing secrets or sensitive user content in span attributes.

### SLOs, error budgets, and alerts

A service-level indicator (SLI) is a measurement of user-visible behavior, such as the fraction of valid requests completed successfully within 300 ms. A service-level objective (SLO) is the target over a defined window. An error budget expresses how much failure is allowed by that target. SLOs help teams balance reliability work against feature delivery.

Alert on symptoms and sustained impact. An alert that fires on every transient exception creates fatigue. Define an actionable runbook for each alert and verify that the alert actually triggers under a controlled test.

## Worked example

An API SLO might target 99.9% of valid requests returning a non-server-error response within 500 ms over a rolling 30-day window. This does not mean every request must be under 500 ms; it defines the measured fraction and window. Track dependency latency and queue age to explain misses.

## Exercises

1. Choose one SLI for a public read endpoint and one for a background queue.
2. List fields for a structured error log without exposing secrets.
3. Explain how high-cardinality labels can damage a metrics system.

## Solution notes

A read SLI can measure successful requests within a latency threshold; a queue SLI can measure jobs completed within a target age. Include request ID, route, status, duration, error code, and trace ID. Per-user labels create huge numbers of time series and increase storage/query cost.

## Review checklist

- Can I explain: design telemetry around user-visible behavior?
- Can I explain: use structured logs and distributed traces?
- Can I explain: define service-level indicators and objectives?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
