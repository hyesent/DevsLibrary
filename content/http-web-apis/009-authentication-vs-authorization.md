# 009. Authentication vs Authorization

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 9 of 30

## Learning goals
- Explain identity verification versus permission checking.
- Choose suitable API authentication mechanisms.
- Enforce access control on every resource operation.

Authentication establishes who or what is making a request. Authorization decides whether that principal can perform an action on a resource under the current policy. A valid token does not mean the caller can access every record.

Common mechanisms include server-side sessions for browser applications, API keys for specific machine-to-machine use cases, and OAuth 2.0/OIDC-based flows for delegated access and identity. Bearer tokens should be treated as secrets: use TLS, short lifetimes when suitable, secure storage, rotation and revocation strategy, and avoid URL transport. API keys should have limited scope and rotation support; they are not a substitute for user identity when per-user authorization is needed.

Check tenant boundaries, ownership, roles, and resource-level policies server-side. Avoid insecure direct object references: changing `/users/123` to `/users/124` must not bypass authorization. Design least privilege and deny by default.

## Practice
Create an authorization matrix for reader, editor, owner, and administrator roles. Add tenant isolation rules and tests for cross-tenant access.
