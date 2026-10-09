# 024. Testing APIs: Unit, Integration, Contract, and End-to-End

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 24 of 30

## Learning goals
- Test the contract and behavior at the right layers.
- Exercise failure modes, not only happy paths.
- Make tests reproducible and safe.

Unit tests cover validation and domain behavior. Integration tests exercise a real database or message broker. Contract tests verify schema and compatibility between providers and consumers. End-to-end tests exercise a critical user journey against a deployed-like system. Use each where it provides confidence; mocking every boundary can conceal integration defects.

Test status codes, headers, response schema, content type, authorization, pagination, rate limits, idempotency, and concurrency conflicts. Include malformed JSON, oversized requests, missing fields, unknown enum values, timeouts, duplicate webhooks, and dependency failure. Use isolated test credentials and data; never run destructive tests against production by default.

Keep fixtures deterministic and assert behavior rather than internal call counts unless those calls are part of the contract. Validate OpenAPI documents and run compatibility checks in CI.

## Practice
Create a test matrix for a task API covering unauthenticated, unauthorized, invalid, duplicate, conflicting, and successful requests.
