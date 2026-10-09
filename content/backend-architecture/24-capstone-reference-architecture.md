# Lesson 24: Capstone: A Production-Ready Learning Platform

**Track:** Capstone

## Learning objectives
- Combine architectural concepts into one design
- Specify synchronous and asynchronous flows
- Create a launch and operations checklist

## Lesson
### System requirements

Build a learning platform with public course browsing, authenticated enrollment, progress tracking, instructor publishing, payment confirmation, email notifications, and exports. Public reads should be responsive; users must never see another tenant's private data; duplicate payment/webhook delivery must not grant duplicate entitlements; and exports must survive request disconnections.

State measurable targets before choosing infrastructure. Define the expected peak workload, latency targets for key endpoints, acceptable queue delay, recovery objectives, data retention, and the consequences of temporary dependency failure. Keep assumptions explicit.

### Proposed component boundaries

Start with a modular monolith for identity integration, catalogue, enrollment, progress, and billing coordination if one team owns the product. Use a relational database as the source of truth for transactional entities. Add a durable queue and worker for email, exports, and webhook follow-up. Use a CDN or edge layer for public caching and redirects where measured benefit exists.

A Supabase-based implementation could use Supabase Auth, Postgres, row-level security, and Edge Functions for narrow request-bound operations. A conventional API can own complex transactional workflows. The design should not force every business operation into Edge Functions merely because the platform provides them.

### Critical request flows

For enrollment, authenticate, authorize the course action, validate prerequisites, and insert the enrollment under database constraints. If payment is required, model pending and confirmed states rather than pretending the external provider call is part of the database transaction. Use idempotency keys and durable provider operation IDs. The UI should be able to query status after a timeout.

For public course reads, define cache headers and cache keys. Do not share personalized enrollment data in a public cache. For instructor publishing, validate content, enforce instructor ownership, record an audit event, and invalidate or version the public cache after the database commit.

### Events and Edge Function use

A webhook function verifies the raw-body signature, deduplicates the provider event using a unique constraint, and durably hands off processing. It returns a fast acknowledgement only after the event is safely recorded. A worker applies the state transition, reconciles ambiguous payment outcomes, and emits the appropriate domain event. Edge Functions can handle lightweight authenticated reads/writes or provider webhooks if their runtime, database path, timeout, and secrets model fit the workload.

Keep privileged service credentials inside server-side deployment secrets. If a function bypasses row-level security, it must implement equivalent authorization checks and have tests for forbidden access. Include provider-specific runtime smoke tests rather than relying exclusively on local Node tests.

### Reliability and operations plan

Track API error rate and latency, database query and pool waits, queue age, webhook signature failures, duplicate deliveries, payment reconciliation, and export completion time. Define alerts with runbooks. Use an outbox for events that must correspond to a committed database change. Give workers bounded retries, idempotent effects, dead-letter handling, and replay tools.

Deploy schema changes with expand-and-contract. Roll out risky code progressively, use smoke tests, and retain a known-good artifact. Set RTO/RPO targets, test backups by restoring them, and practice rollback. Use a staging environment with separate credentials and synthetic data.

### Launch review

Before launch, verify authentication and object-level authorization; tenant isolation; rate limits; secret handling; request validation; schema constraints; webhook signatures; duplicate-delivery behavior; queue recovery; database backups; observability; and incident ownership. Test concurrent enrollment and payment retries. Measure realistic load and record the first bottleneck rather than guessing.

A reference architecture is a starting point, not a universal prescription. Remove components that do not solve a real requirement, and add complexity only when a measured need or correctness constraint justifies it.

## Worked example

The capstone's most important invariant is that a payment event grants an entitlement once, even if the provider retries, the function times out, or the worker crashes after the provider confirms payment. Durable event IDs, unique constraints, explicit state transitions, idempotent processing, and reconciliation work together to protect that invariant.

## Exercises

1. Draw a component diagram for the platform and mark trust boundaries.
2. Describe the webhook flow from signature verification to entitlement grant.
3. Create a launch checklist with at least ten checks and identify the three highest-risk failure tests.

## Solution notes

A strong design separates public reads, authenticated domain operations, durable background jobs, and provider integrations. The webhook is verified, deduplicated, persisted, queued, processed idempotently, and reconciled when the outcome is ambiguous. Highest-risk tests include tenant isolation, concurrent/duplicate payment events, and retry after uncertain external success.

## Review checklist

- Can I explain: combine architectural concepts into one design?
- Can I explain: specify synchronous and asynchronous flows?
- Can I explain: create a launch and operations checklist?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
