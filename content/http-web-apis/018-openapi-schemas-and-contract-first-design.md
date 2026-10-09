# 018. OpenAPI, Schemas, and Contract-First Design

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 18 of 30

## Learning goals
- Document APIs machine-readably.
- Generate useful client and server artifacts carefully.
- Keep documentation aligned with actual behavior.

OpenAPI describes paths, operations, parameters, request bodies, responses, schemas, security schemes, and metadata. It can support documentation, validation, mock servers, client generation, and contract tests. A schema is a specification, not proof that runtime behavior matches it.

Document required versus optional properties, nullability, formats, constraints, enum evolution, pagination, error shapes, authentication, rate limits, and idempotency. Add examples that match real responses. Validate the OpenAPI document in CI and test representative requests and responses against it.

Generated clients can save time but may encode assumptions about language types, unknown fields, and error handling. Review generated code and pin generator versions. Contract-first works best when teams agree on behavior before implementation and use the contract as a shared artifact.

## Practice
Write an OpenAPI operation for listing and creating tasks. Include authentication, request schema, success response, validation errors, and rate-limit response.
