# 027. Deployment, Gateways, Environments, and Safe Rollouts

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 27 of 30

## Learning goals
- Deploy API changes safely.
- Understand gateways, reverse proxies, and environment differences.
- Plan health checks, migrations, and rollback.

A gateway may handle TLS termination, routing, request limits, authentication integration, quotas, and telemetry, but application-level authorization still belongs in a trusted service boundary. Avoid duplicating policies in inconsistent ways. Define which component owns each control.

Separate development, staging, and production credentials and data. Configuration should be validated at startup; missing required settings should fail clearly rather than silently selecting unsafe defaults. Health checks should distinguish process liveness from readiness to serve traffic. Do not make readiness depend on every optional dependency if doing so causes cascading outages.

Use backward-compatible schema migrations and expand/contract changes when old and new application versions coexist. Roll out gradually where possible, monitor error and latency signals, and maintain rollback or forward-fix procedures. Never test destructive migration scripts on production without a reviewed plan and verified backup strategy.

## Practice
Write a release checklist for an API change that adds a required database field, updates a response schema, and introduces a downstream dependency.
