# 028. Documentation, Developer Experience, and Client SDKs

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 28 of 30

## Learning goals
- Make an API understandable to consumers.
- Keep examples and contracts accurate.
- Design SDKs that expose useful errors and safe defaults.

Good API documentation explains authentication, base URLs, environments, request schemas, responses, status codes, pagination, rate limits, idempotency, retries, webhooks, deprecation, and support. Examples should be copyable and should not contain real credentials. Document timestamps, money, identifiers, nullability, and error codes explicitly.

SDKs should expose idiomatic types while preserving access to status codes, request IDs, and structured errors. Avoid automatic retries for non-idempotent operations unless they use safe semantics. Make timeouts configurable and provide secure defaults. Generated SDKs should be versioned and tested against the API contract.

Developer experience includes clear local setup, sandbox credentials, predictable errors, changelogs, and a migration guide. Documentation is part of the public contract; changes should be reviewed alongside implementation.

## Practice
Draft a quickstart for creating and retrieving a resource. Include safe credential handling, an error example, pagination, and retry guidance.
