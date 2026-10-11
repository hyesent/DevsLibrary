---
title: "Block ciphers and AES"
order: 10
book: "cryptography-fundamentals"
---

# Block ciphers and AES

## Mental model

AES is a standardized block cipher with a 128-bit block and 128-, 192-, or 256-bit keys. It applies repeated substitution, permutation, and key-mixing transformations. Security depends not only on AES’s core but also on mode, nonce handling, authentication, and implementation.

## Failure modes and design choices

A sound primitive can be defeated by ECB pattern leakage, nonce reuse in a mode that forbids it, or unauthenticated ciphertext modification.

## Verification and engineering practice

Prefer platform or library APIs that expose authenticated encryption rather than raw AES rounds. Understand that a block size is not the key size and that a larger key does not automatically solve protocol flaws.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
