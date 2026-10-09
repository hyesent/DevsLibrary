# 023. Observability and Correlation Across API Boundaries

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 23 of 30

## Learning goals
- Correlate work across services.
- Monitor latency, failures, and saturation.
- Protect sensitive data in telemetry.

A request ID helps correlate logs for a single service; distributed tracing propagates trace context across services. Accept externally supplied correlation identifiers only under a clear policy, validate length and format, and avoid using them as trusted identity. W3C Trace Context defines interoperable trace headers; tracing systems still need sampling and privacy controls.

Useful metrics include request rate, error rate, latency percentiles, resource saturation, dependency latency, queue depth, and rate-limit events. Avoid high-cardinality labels such as raw user IDs or arbitrary URLs. Logs, metrics, and traces should not include secrets or unnecessary personal data.

Define service-level objectives around user-visible behavior. Alerts should be actionable. During incidents, distinguish symptoms from causes and track the impact of mitigation. Observability should support diagnosis without becoming a new privacy or cost risk.

## Practice
Define dashboards and alerts for a checkout API. Include one latency SLO, one availability SLO, and a policy for sensitive attributes in traces.
