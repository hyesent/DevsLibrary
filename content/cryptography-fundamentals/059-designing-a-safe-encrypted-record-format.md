---
title: "Designing a safe encrypted-record format"
order: 59
book: "cryptography-fundamentals"
---

# Designing a safe encrypted-record format

## Mental model

An encrypted record needs a version, algorithm policy, nonce or IV, ciphertext, authentication tag, and any required key identifier. These fields must be parsed unambiguously and authenticated where appropriate; versioning must not enable downgrade.

## Failure modes and design choices

If a record can be moved between accounts and still decrypt successfully, the encryption may be authenticating the bytes but not their intended ownership.

## Verification and engineering practice

Specify a byte-level format, length limits, unknown-version behavior, and migration strategy. Authenticate record identifiers and tenant context as associated data, and test malformed and truncated inputs.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
