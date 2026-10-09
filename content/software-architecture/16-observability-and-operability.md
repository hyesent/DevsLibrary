# 16. Observability and Operability

A system is operable when its owners can understand its behavior, detect failure, diagnose causes, and recover safely. Observability uses telemetry—logs, metrics, traces, and domain signals—to infer internal behavior from external outputs.

## Logs, metrics, and traces

- **Logs** describe discrete events with context.
- **Metrics** summarize numeric behavior over time.
- **Traces** connect work across components and time.

Use correlation or trace IDs to connect a user request with downstream operations. Avoid putting secrets or unnecessary personal data into telemetry. High-cardinality metric labels, such as arbitrary user IDs, can create large costs and poor query performance.

## Measure user outcomes

Infrastructure CPU and memory matter, but users care about outcomes: successful checkout rate, booking confirmation time, failed imports, or time to deliver notifications. Pair technical metrics with domain metrics so the team can distinguish “server is up” from “the business workflow works.”

## Service-level objectives

A service-level indicator (SLI) is a measured property; a service-level objective (SLO) is a target for that property over a period. For example, a target may specify the fraction of valid requests completed successfully within a latency threshold. The exact objective should reflect user expectations and the service's purpose.

An error budget expresses the amount of unreliability permitted by an SLO. It can inform release risk and reliability investment, but it is useful only when the measurement and response process are understood by the team.

## Health checks

Liveness asks whether a process should be restarted. Readiness asks whether it should receive traffic. A dependency outage should not automatically make every process fail liveness and restart in a loop. Health checks must reflect what the platform uses them for.

## Runbooks and recovery

A useful alert has an owner, a severity, and a response path. A runbook should include diagnosis, safe mitigation, rollback or failover, and verification. Test recovery procedures through exercises; documentation that has never been used may omit critical steps.

## Practice

Define telemetry and SLOs for an API that creates orders and publishes events. Include request success, latency, outbox lag, consumer lag, and failed payment reconciliation. Specify which alerts page an operator and which belong on a dashboard.

**Key idea:** production architecture is incomplete until the team can observe, diagnose, and recover the system.
