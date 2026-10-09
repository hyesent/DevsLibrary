# 15. Security Architecture and Trust Boundaries

Security must be designed across identity, authorization, data flow, infrastructure, and operations. It cannot be added solely by putting authentication middleware in front of an application.

## Threat modeling

A practical threat model identifies assets, actors, trust boundaries, entry points, and plausible abuse cases. Ask what an attacker can control, which assumptions can fail, and what impact follows. Consider unauthorized data access, privilege escalation, injection, credential theft, replay, denial of service, and supply-chain compromise where relevant.

Threat modeling should focus on the system's actual data and workflows rather than copying a generic checklist without prioritization.

## Authentication and authorization

Authentication establishes an identity or verifies a credential. Authorization decides whether that identity may perform a particular action on a particular resource in the current context. A valid login does not imply permission to read every record. Enforce authorization on the server and near the data access path, especially for multi-tenant resources.

Use least privilege for users, services, database roles, CI jobs, and operators. Separate duties when the consequences of misuse justify it.

## Secrets and cryptography

Keep credentials out of source code, logs, and client bundles. Use a secrets-management process with rotation and scoped permissions. Use established cryptographic libraries and protocols rather than designing custom encryption. Protect keys separately from encrypted data, and define what happens when a key is rotated or compromised.

Encryption in transit and at rest does not replace authorization, input validation, or safe handling after data is decrypted.

## Secure defaults and failure behavior

Default-deny policies are safer than default-allow. Fail closed for access-control decisions when the system cannot establish permission, while considering carefully designed availability trade-offs for other controls. Avoid exposing internal details in errors. Rate limits and resource quotas can reduce abuse, but they need operational tuning and should not become a denial-of-service vector themselves.

## Security as a lifecycle

Include dependency updates, vulnerability response, audit logging, incident response, backup protection, and access review. Security controls that nobody monitors or maintains decay over time. Test authorization boundaries with negative cases, not only successful user journeys.

## Practice

Threat-model a file-sharing application. Identify sensitive assets, anonymous entry points, tenant boundaries, upload risks, download authorization, expiring links, and operator privileges. For each threat, record a mitigation and a test.

**Key idea:** security architecture makes trust assumptions explicit and enforces least privilege at every boundary.
