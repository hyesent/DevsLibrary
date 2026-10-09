# 24. Capstone: Architecture for a Learning Platform

Design a learning platform that supports learner accounts, courses, lesson content, enrollments, progress tracking, assessments, notifications, and instructor administration. The objective is to explain a coherent architecture and its trade-offs, not to maximize the number of services.

## Requirements and constraints

Assume an initial small engineering team, a web client, a relational database, uploaded media, and external email delivery. The platform must protect learner data, preserve assessment results, support retries without duplicate enrollment, and remain operable by the team. Traffic is expected to grow, but no evidence yet requires independent service deployment.

Write measurable quality scenarios for login, lesson access, assessment submission, email failure, database restore, and a burst of enrollment requests. Mark which operations need immediate confirmation and which may complete asynchronously.

## Initial architecture

A reasonable starting point is a modular monolith with modules such as:
- Identity and access integration.
- Course catalog and content metadata.
- Enrollment.
- Learning progress.
- Assessment.
- Notifications.
- Administration and reporting.

Use a relational database for authoritative transactional records and object storage or a media service for large content assets. Treat email delivery as an external dependency that may fail independently. Keep module ownership explicit even if all modules are deployed together.

## Critical workflow: assessment submission

1. Authenticate the learner and authorize access to the assessment.
2. Validate the submission and the assessment's current state.
3. Commit the submission and its stable identity transactionally.
4. Return the committed result or a clearly defined pending status.
5. Publish follow-up work through a durable outbox if asynchronous processing is needed.
6. Make grading or notification processing idempotent.
7. Monitor processing lag and expose a recovery path for failed work.

The exact sequence depends on whether grading is immediate, human-reviewed, or performed by an external service. Do not let a notification failure erase a committed assessment.

## Security and data ownership

Enforce authorization on every sensitive operation, including instructor tools and exports. Scope records to the relevant institution or tenant if the product supports multiple organizations. Keep secrets out of telemetry and define retention for learner submissions and audit records. Test cross-tenant access with negative cases.

## Reliability and operations

Define service-level indicators for successful lesson access, assessment submission, and background-work completion. Specify database backup and restore objectives. Use correlation IDs across request handling and asynchronous processing. Create runbooks for failed email delivery, queue backlog, and database recovery.

## Growth path

Do not split modules into services merely because they have separate names. Reconsider extraction if there is measured need for independent scaling, ownership, security isolation, or release cadence. Before extraction, define data ownership, API contracts, idempotency, and migration/reconciliation plans.

## Deliverables

1. System context and runtime diagrams.
2. Module responsibilities and dependency rules.
3. Data ownership and transaction-boundary description.
4. Threat model and tenant-isolation tests.
5. Critical workflow sequence diagram.
6. SLOs, telemetry, backup/restore plan, and runbooks.
7. ADR explaining the initial modular-monolith decision and conditions for revisiting it.

## Evaluation rubric

Assess requirement traceability, clarity of boundaries, consistency guarantees, failure recovery, security, operability, and proportionality. A good architecture is not the one with the most components; it is the one whose decisions fit the stated needs and can be validated in practice.

**Key idea:** start with clear module boundaries and measurable requirements, then let evidence—not fashion—drive complexity.
