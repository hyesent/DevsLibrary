---
title: "Secrets management and deployment"
order: 34
book: "cryptography-fundamentals"
---

# Secrets management and deployment

## Mental model

Secrets include API credentials, private keys, database passwords, signing keys, and bootstrap tokens. They can leak through source control, build logs, environment dumps, crash reports, images, and overly broad runtime permissions.

## Failure modes and design choices

Environment variables are a delivery mechanism, not a complete secret-management strategy. Any secret delivered to an untrusted client must be treated as public.

## Verification and engineering practice

Use a managed secret store or platform identity where appropriate, grant least privilege, rotate exposed credentials, and scan repositories and build artifacts. Avoid embedding long-lived secrets in mobile or browser-delivered code.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
