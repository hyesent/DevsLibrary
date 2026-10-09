# 029. Capstone: Design and Specify a Production-Ready Task API

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 29 of 30

## Objective
Design a task-management API with a realistic contract and threat model. The project can be implemented in any language; the focus is API design, correctness, and operability.

## Required endpoints
- `GET /v1/tasks` with bounded pagination and filtering.
- `POST /v1/tasks` with validation and idempotency strategy where appropriate.
- `GET /v1/tasks/{id}` with ownership checks.
- `PATCH /v1/tasks/{id}` with concurrency control.
- `DELETE /v1/tasks/{id}` with documented semantics.
- A webhook event for task completion or another well-defined state transition.

## Deliverables
1. OpenAPI specification.
2. Request and response examples for success and errors.
3. Authentication and authorization matrix.
4. Pagination, caching, rate-limit, and retry policies.
5. Threat model covering object-level authorization, injection, replay, and abuse.
6. Test matrix with unit, integration, contract, and end-to-end cases.
7. Observability plan with request correlation, metrics, and privacy rules.
8. Deployment and rollback checklist.

## Acceptance criteria
- Every endpoint has explicit method and status semantics.
- Invalid input is rejected consistently.
- A user cannot access another user's tasks by guessing IDs.
- Updates cannot silently overwrite a newer version.
- Retries do not create unintended duplicates.
- Error responses are stable and reveal no secrets.
- Pagination and request sizes are bounded.
- Webhook authenticity and duplicate delivery are handled.
- Documentation matches the contract and tests.

## Extension challenges
Add an asynchronous report endpoint returning 202 Accepted and a status resource, conditional GET with ETags, and an API version deprecation plan.
