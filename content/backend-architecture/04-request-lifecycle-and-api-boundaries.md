# Lesson 4: The Request Lifecycle and API Boundaries

**Track:** Core Design

## Learning objectives
- Trace a request end to end
- Separate transport validation from domain rules
- Design stable HTTP contracts

## Lesson
### Follow one request through every layer

A request usually enters through DNS, TLS termination, a load balancer or gateway, middleware, authentication, routing, validation, application logic, persistence or remote dependencies, response serialization, and logging. A failure at any stage may look to a user like “the API is broken,” so tracing the complete lifecycle is essential.

Document the path for a normal request and a failure request. For example, an authenticated `POST /enrollments` may validate JSON, verify identity, check course availability, insert enrollment in a transaction, publish an event through an outbox, and return `201 Created`. Each step has different failure semantics. If event publishing fails after the database commit, the design must not pretend the enrollment never happened.

### Validate at the boundary, enforce rules in the domain

Transport validation checks shape and representation: required fields, string lengths, number formats, supported content types, and JSON syntax. Domain validation checks whether an action is allowed: the course is open, the user is eligible, the reservation is not duplicated, or the requested state transition is legal. Do both. A well-shaped request can still violate a business invariant.

Return errors that help clients correct requests without exposing internals. Use consistent machine-readable codes, human-readable messages, and field details where appropriate. Do not send SQL error text, stack traces, secret values, or internal hostnames to public clients.

### HTTP semantics are part of architecture

Use methods and status codes consistently. `GET` should be safe; `PUT` is generally replacement-oriented and idempotent; `PATCH` describes partial modification; `DELETE` should have documented semantics. `201 Created` can include a `Location` header. `202 Accepted` means work was accepted but is not complete. `409 Conflict` is appropriate for some state conflicts, while `422 Unprocessable Content` can describe semantically invalid input. The exact policy matters less than consistency and documentation.

Idempotence deserves special attention for operations involving payments, orders, provisioning, and retries. A client can time out after the server commits but before it receives the response. Retrying a non-idempotent action may duplicate the effect unless the API defines a deduplication strategy.

### Pagination, filtering, and version evolution

Unbounded list endpoints become expensive and unreliable. Define maximum page sizes and deterministic ordering. Offset pagination is easy but can become slow or produce duplicates as data changes; cursor pagination is often better for large, changing datasets. Filtering and sorting parameters should be allowlisted rather than translated directly into database expressions.

Prefer additive API evolution when possible. Removing a field, changing its meaning, or tightening accepted input can break clients even if the server still returns HTTP 200. Track API usage, deprecate intentionally, and publish examples. Internal refactoring should not accidentally change the public contract.

### A boundary checklist

For each endpoint, document authentication, authorization, request schema, domain invariants, status codes, error schema, rate limit, idempotency behavior, pagination, logging fields, and compatibility expectations. This checklist is especially valuable for endpoints used by mobile clients, third parties, or webhook providers, where old clients may remain active for a long time.

## Worked example

A `POST /payments` endpoint accepts an idempotency key. The server stores the key and request fingerprint alongside the payment result. Reusing the same key and same request returns the stored result; reusing it with a different request is rejected. The database constraint, not a process-local map, protects against concurrent duplicate requests.

## Exercises

1. Trace a request from ingress to database and identify trust boundaries.
2. Explain the difference between shape validation and domain validation.
3. Design status codes for missing auth, invalid input, duplicate resource, and accepted background work.

## Solution notes

Use 401 for missing/invalid authentication, 400 or 422 according to the API's validation convention, 409 for a conflicting duplicate state, and 202 when work is queued but incomplete. Document the convention so endpoints behave consistently.

## Review checklist

- Can I explain: trace a request end to end?
- Can I explain: separate transport validation from domain rules?
- Can I explain: design stable http contracts?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
