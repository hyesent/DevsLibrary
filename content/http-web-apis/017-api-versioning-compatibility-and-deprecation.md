# 017. API Versioning, Compatibility, and Deprecation

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 17 of 30

## Learning goals
- Evolve APIs without surprising clients.
- Distinguish additive and breaking changes.
- Plan deprecation and removal responsibly.

Versioning strategies include path versions (`/v1`), media-type negotiation, and header-based approaches. Each has trade-offs in discoverability, routing, and client tooling. A version number alone does not guarantee compatibility; maintain a written policy and automated contract tests.

Adding an optional response field is often compatible, but clients that reject unknown fields can still break. Changing field types, meanings, enum possibilities, default behavior, authentication requirements, or error semantics can be breaking. Removing an endpoint or changing pagination order may also break clients.

Deprecation should include a timeline, migration guidance, telemetry to understand usage, and a communication path. Avoid maintaining old versions indefinitely without a security and support plan. Prefer shared internal logic across versions to avoid divergent fixes, while preserving intentional differences.

## Practice
Review a proposed API change list and classify each as likely compatible, conditionally compatible, or breaking. Write a migration note for a breaking change.
