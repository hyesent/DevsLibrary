---
title: "Hybrid encryption and envelope encryption"
order: 31
book: "cryptography-fundamentals"
---

# Hybrid encryption and envelope encryption

## Mental model

Hybrid encryption combines public-key mechanisms for establishing or wrapping a small secret with symmetric encryption for bulk data. Envelope encryption commonly encrypts data with a data-encryption key, then protects that key with a key-encryption key managed separately.

## Failure modes and design choices

Encrypting every large object directly with public-key encryption is inefficient; storing an unprotected data key beside ciphertext defeats the design.

## Verification and engineering practice

Keep data keys distinct from wrapping keys. Store the encrypted data key and the required algorithm metadata with the ciphertext, but control access to the key-encryption service and its audit trail.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
