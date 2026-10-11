---
title: "Domain separation and context binding"
order: 36
book: "cryptography-fundamentals"
---

# Domain separation and context binding

## Mental model

Domain separation makes outputs from one use distinguishable from outputs in another use, even when they share underlying key material or primitives. Context binding attaches identity, purpose, version, or session information to a cryptographic operation.

## Failure modes and design choices

Without framing, fields like ('ab','c') and ('a','bc') may produce the same byte string even though the application thinks they differ.

## Verification and engineering practice

Use documented labels and unambiguous encoding for KDF contexts, signed payloads, MAC inputs, and transcript hashes. Define how fields are framed so concatenations cannot be interpreted in multiple ways.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
