# Capstone: Deploy a Production-Ready Library API

## Goal
Design a complete cloud deployment for a small library API with a frontend, relational database, uploaded assets and asynchronous exports. The deliverable is a deployment plan that another engineer can review—not merely a successful demo URL.

## Requirements
- The frontend is served over HTTPS on a custom domain.
- The API authenticates users and enforces authorization on every protected operation.
- PostgreSQL stores durable application data; object storage stores uploads and exports.
- Long-running exports run through a queue and worker.
- CI tests and builds an immutable artifact, then deploys through a controlled release process.
- Logs, metrics, alerts, backups and a restore runbook exist before launch.
- Production credentials are never available to untrusted pull-request code.

## Reference architecture
Use a static hosting/CDN service for the frontend if the framework permits it, a managed application or container service for the API, a managed PostgreSQL service, object storage for files, and a queue plus worker for exports. Put the database on private connectivity where supported. Use a secret manager or workload identity for credentials. This is one reasonable design, not a provider-neutral guarantee that every service has identical behavior.

## Implementation stages
1. Create separate development and production environments and define identity boundaries.
2. Configure domain, TLS and routing; verify certificate renewal and redirects.
3. Build and test the API and frontend locally, then produce identifiable artifacts.
4. Provision infrastructure through reviewed IaC or documented managed-service configuration.
5. Deploy the database schema with backward-compatible migrations and a verified backup plan.
6. Deploy the API and worker with resource bounds, health checks and graceful shutdown.
7. Deploy the frontend with safe cache headers and no client-side secrets.
8. Run smoke tests for authentication, authorization, reads, writes, uploads and exports.
9. Configure dashboards, alerts, budget alerts and access logs.
10. Exercise rollback, database restore and a simulated dependency outage.

## Acceptance criteria
- A release can be traced to a source commit and immutable artifact identifier.
- A failed deployment can be stopped or rolled back without an unsafe schema mismatch.
- Secrets are scoped to the relevant workload and do not appear in logs or client bundles.
- A database restore has been tested and measured against agreed RPO/RTO targets.
- A queue message can be retried without duplicating the export or notification.
- The team can diagnose a 5xx spike using documented dashboards and a runbook.
- Cost assumptions and resource owners are recorded.

## Review questions
What happens if a zone fails? What happens if a deployment succeeds but the database migration fails? How are leaked credentials revoked? Can an uploaded file be made public by mistake? How will the team know that exports are falling behind? Which parts of this architecture depend on one cloud provider? What is the tested restore time?

## Final deliverable
Submit an architecture diagram, environment/configuration inventory, release pipeline, security review, monthly cost estimate, monitoring plan, backup/restore evidence and incident runbooks. Any untested assumption should be explicitly labeled rather than presented as a guarantee.
