# Observability, Logs, Metrics, and Traces

## Learning goals
Build a useful operational view of a deployed service without confusing telemetry volume with understanding.

## Three complementary signals
Logs describe discrete events with context. Metrics summarize numeric measurements over time. Traces show how a request crosses components and where time is spent. They answer different questions and are most useful when correlated with a request or trace ID.

## Start with user-facing indicators
Useful service indicators include request success rate, latency percentiles, traffic volume and saturation (for example, CPU, memory, queue depth or connection pool use). Average latency can hide a slow tail; p95 or p99 may reveal the users experiencing the worst delays. Define service-level objectives (SLOs) around outcomes that matter to users rather than collecting every metric a platform exposes.

## Structured logs
Prefer structured fields such as timestamp, severity, service, version, environment, request ID and event name. Avoid logging passwords, access tokens, session cookies, payment details or unnecessary personal data. Sanitize untrusted values to prevent log injection, and restrict who can search sensitive operational logs. Set retention according to troubleshooting, compliance and cost needs.

## Alerts should prompt action
An alert should have a clear owner, severity and runbook. Alert on symptoms and user impact when possible; use resource metrics to diagnose causes. A CPU spike without user impact may be a dashboard observation rather than a page. Conversely, a high error rate with low CPU is still an incident.

## Cardinality and cost
A metric label containing a unique user ID or request ID can create huge cardinality and cost. Put per-request identifiers in logs or traces, not high-cardinality metric labels. Sample traces thoughtfully, while ensuring errors and slow requests are captured sufficiently to diagnose problems.

## Deploy markers
Annotate dashboards with release versions and deployment times. When latency rises, operators need to compare the change with a known release, traffic shift or dependency incident. Observability should help answer what changed, who is affected, and whether rollback or mitigation is working.

## Practice
For a library API, define an SLO for successful reads, a latency indicator, a database saturation metric and a queue-depth alert. Draft a dashboard and one-page runbook for elevated 5xx responses. Ensure logs allow a request to be followed across the proxy and application without exposing credentials.
