# 026. API Security Review and Threat Modeling

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 26 of 30

## Learning goals
- Threat-model an API before release.
- Apply least privilege and layered controls.
- Turn security assumptions into testable requirements.

Start with assets, actors, entry points, trust boundaries, and abuse cases. Consider broken object-level authorization, broken authentication, excessive data exposure, mass assignment, injection, SSRF, misconfiguration, weak rate limits, unsafe consumption of third-party APIs, and resource exhaustion.

Mass assignment occurs when clients can set fields they should not control, such as `isAdmin`, `tenantId`, or payment status. Use explicit input DTOs or allowlists rather than binding arbitrary request fields directly to privileged models. Return only fields the caller is allowed to see.

Secrets need rotation and restricted scope. Dependencies and API gateways need patching and secure configuration. Security tests should include cross-tenant access, privilege escalation, malformed content, oversized bodies, replay, and abuse limits. A review is not complete until findings have owners and remediation plans.

## Practice
Threat-model an API for transferring funds. Identify the trust boundaries, high-impact abuse cases, required controls, and regression tests.
