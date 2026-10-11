---
title: "Cryptographic failure handling"
order: 53
book: "cryptography-fundamentals"
---

# Cryptographic failure handling

## Mental model

Authentication failure, invalid signatures, malformed points, expired certificates, and unavailable KMS services must lead to safe states. Fail-open behavior often converts an availability issue into a confidentiality or integrity breach.

## Failure modes and design choices

Failing closed can still require thoughtful operations: an outage needs safe queuing or recovery, not silent security bypass.

## Verification and engineering practice

Define error categories internally, return appropriately generic external errors, alert on meaningful rates, and never accept unauthenticated plaintext as a fallback. Keep availability strategies separate from trust decisions.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
