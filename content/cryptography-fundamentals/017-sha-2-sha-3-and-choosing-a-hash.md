---
title: "SHA-2, SHA-3, and choosing a hash"
order: 17
book: "cryptography-fundamentals"
---

# SHA-2, SHA-3, and choosing a hash

## Mental model

SHA-2 and SHA-3 are distinct standardized hash families with different internal constructions. Selection depends on protocol interoperability, ecosystem support, performance, and required security properties—not on the assumption that the newest name is always best.

## Failure modes and design choices

Replacing a hash in a signature, key derivation, or wire protocol can break interoperability or invalidate security assumptions.

## Verification and engineering practice

Follow the protocol or platform standard rather than swapping hashes independently. For passwords, use a password-hashing scheme instead of a fast general-purpose digest.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
