# 14. API Contracts and Versioning

An API contract defines the operations a component offers, the inputs and outputs, error semantics, security requirements, and compatibility expectations. A stable contract lets implementations evolve independently; a vague contract transfers hidden assumptions to every consumer.

## Design contracts around use cases

Avoid exposing internal database tables directly as public API shapes. A database schema may change for indexing or normalization reasons that should not force every client to change. Design resource and operation semantics around the consumer's needs, including authorization and lifecycle rules.

Document required and optional fields, validation, pagination, ordering, idempotency, error codes, and rate limits. Clarify whether a response means a change has committed or merely been accepted for asynchronous processing.

## Backward compatibility

Adding an optional response field is often compatible, but not always if clients reject unknown fields. Making a formerly optional request field required is generally breaking. Changing field meaning, units, enum values, ordering guarantees, or error behavior can be breaking even when the schema appears unchanged.

Versioning is not a substitute for thoughtful evolution. Prefer additive changes when they preserve semantics, and use explicit versioning or a migration plan when a breaking change is unavoidable.

## Contract testing

Consumer-driven contract tests can capture assumptions that a consumer relies on. Provider tests then verify those assumptions against the actual implementation. Contract tests do not replace end-to-end testing, but they can find compatibility failures earlier and more narrowly.

## Timeouts, retries, and errors

The contract should state which errors may be retried and whether a timeout leaves the outcome unknown. For non-idempotent operations, define an idempotency mechanism or explain how clients should resolve an ambiguous outcome. Error responses should be actionable without leaking internal stack traces, secrets, or sensitive data.

## Practice

Design an API for creating a booking, checking its status, and cancelling it. Specify the behavior for duplicate submissions, concurrent cancellation, validation errors, pending confirmation, and a client that times out after submitting the request.

**Key idea:** an API is a behavioral promise, not merely a set of endpoint paths and JSON fields.
