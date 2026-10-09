# Lesson 9: Identity, Authorization, and Trust Boundaries

**Track:** Security

## Learning objectives
- Separate identity from permission
- Enforce ownership server-side
- Avoid trusting client-controlled claims

## Lesson
### Authentication answers who; authorization answers what

Authentication establishes an identity or credential. Authorization decides whether that identity may perform a specific action on a specific resource under current conditions. A valid login token does not automatically permit access to every record. Authorization must consider resource ownership, tenant boundaries, role, state, and sometimes context such as a verified email or recent re-authentication.

A common vulnerability is checking that a user is signed in but failing to check whether the requested record belongs to that user. Every object-level endpoint should make its ownership or policy check explicit. Do not rely on hidden UI controls to enforce security.

### Trust boundaries and least privilege

Treat browser input, query parameters, uploaded files, webhook bodies, and third-party API responses as untrusted. Validate and normalize them before they reach business logic. Treat internal network location as no proof of trust; a service-to-service request still needs an identity and permission model.

Give each runtime only the privileges it needs. A public read endpoint should not carry a database credential that can delete every table. Separate migration credentials from runtime credentials, and separate public client keys from privileged server secrets. Least privilege limits the damage from a bug or compromise.

### Sessions, tokens, and revocation

Cookie sessions can be effective for browser applications when cookies use appropriate `HttpOnly`, `Secure`, and `SameSite` settings and the application handles CSRF according to its authentication model. Bearer tokens are useful across APIs but must be protected from leakage. Do not store long-lived secrets in browser-accessible storage without understanding the XSS threat.

JWTs are signed claims, not encrypted secrets. Validate issuer, audience, expiry, signature, and allowed algorithms. A valid token may still represent stale authorization. Design token lifetimes and revocation strategy around the risk of delayed permission changes.

### Tenant isolation

Multi-tenant systems must define how a tenant is selected and how every data access is constrained to that tenant. Never accept a tenant ID from a client and assume it is authorized. Derive tenant context from authenticated identity and verify membership. Database row-level security can add defense in depth, but policies must be tested with both allowed and forbidden cases.

Cross-tenant bugs are especially dangerous because each individual query can look syntactically correct. Add adversarial tests where a user changes a resource ID, tenant header, cursor, or nested object identifier.

### Auditability and sensitive data

Record security-relevant actions such as role changes, privileged data exports, payment adjustments, and failed administrative attempts. An audit record should identify actor, action, target, timestamp, outcome, and correlation ID without copying secrets or unnecessary personal data. Restrict audit-log access and protect retention integrity.

Logs are not a safe place to dump entire request objects. Redact authorization headers, cookies, passwords, tokens, and sensitive payload fields. Security observability requires enough context to investigate without turning the log system into a secondary data breach.

## Worked example

For `GET /users/{id}/progress`, the handler verifies the session, then authorizes access to that user's progress. If instructors can view student progress, that policy is a separate explicit branch based on course membership and role—not a blanket “authenticated” check.

## Exercises

1. Write the authorization checks for a tenant-scoped invoice endpoint.
2. List the JWT claims and signature checks an API should validate.
3. Explain why a service-role key must never be sent to browser code.

## Solution notes

Verify identity, derive tenant from trusted claims/session, check invoice belongs to tenant, and check actor has the required permission. Validate signature, issuer, audience, expiry, and allowed algorithm. A service-role key can bypass ordinary access controls and grants privileged server-side access.

## Review checklist

- Can I explain: separate identity from permission?
- Can I explain: enforce ownership server-side?
- Can I explain: avoid trusting client-controlled claims?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
