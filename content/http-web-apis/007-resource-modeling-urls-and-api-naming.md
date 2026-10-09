# 007. Resource Modeling, URLs, and API Naming

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 7 of 30

## Learning goals
- Design resource-oriented URLs.
- Distinguish resources, actions, and representations.
- Create predictable nested and collection endpoints.

Prefer stable resource nouns and consistent identifiers: `/v1/users`, `/v1/users/{userId}`, `/v1/orders/{orderId}/items`. Use query parameters for filtering, sorting, pagination, and representation options when appropriate. Avoid embedding mutable display names into resource identity unless the API intentionally treats them as stable slugs.

Nested paths should express meaningful relationships but should not become arbitrarily deep. If an item has an independent lifecycle, it may deserve its own top-level endpoint. Avoid exposing database table names as a public contract by accident. Public URLs should be designed for clients, not mirror internal implementation.

Actions that do not map neatly to CRUD can be modeled as explicit commands or subresources, such as `/orders/{id}/cancel`, but define their semantics and idempotency. Versioning policy, deprecation policy, identifier format, and URL normalization should be documented.

## Practice
Design endpoints for a library: books, authors, loans, renewals, and overdue notices. Explain which objects have independent identity and lifecycle.
