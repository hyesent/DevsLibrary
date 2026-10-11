---
title: "Certificates and public-key infrastructure"
order: 29
book: "cryptography-fundamentals"
---

# Certificates and public-key infrastructure

## Mental model

A certificate binds an identity claim to a public key under a certificate authority’s signature. PKI defines issuance, chain construction, validity, name constraints, revocation-related mechanisms, and trust-anchor configuration.

## Failure modes and design choices

A certificate is a signed assertion within a trust system, not a universal proof that a site or organization is benevolent.

## Verification and engineering practice

Validation must check the intended hostname or identity, chain to a trusted anchor, validity, key usage, algorithm policy, and relevant constraints. Do not disable verification to “fix” a certificate error.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
