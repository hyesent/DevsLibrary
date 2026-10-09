# 008. Request and Response Schemas, Validation, and Error Contracts

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 8 of 30

## Learning goals
- Separate syntax parsing from schema and domain validation.
- Return actionable, stable errors.
- Avoid accidentally exposing internal implementation details.

A robust request pipeline is: enforce transport/body limits → authenticate → parse → validate shape and types → normalize → authorize → apply domain rules → persist → serialize. Exact ordering varies; for example, authentication may precede expensive parsing to reduce abuse, but the contract should be intentional.

An error representation should be predictable. A common pattern includes a stable machine-readable code, a human-readable summary, field errors where relevant, and a request or trace ID. Do not make clients parse free-form English messages to decide behavior. Avoid returning stack traces, SQL, internal file paths, secrets, or raw dependency errors.

Validation rules include required fields, length limits, numeric ranges, allowed enum values, format checks, cross-field constraints, and resource ownership. Be explicit about unknown fields and coercion. Silent coercion can create surprising behavior; strict schemas are often easier for clients to reason about.

## Practice
Specify a create-user request schema and error response for missing fields, invalid email, duplicate account, and forbidden role assignment.
