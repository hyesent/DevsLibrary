---
title: "Digital signatures and their guarantees"
order: 27
book: "cryptography-fundamentals"
---

# Digital signatures and their guarantees

## Mental model

A digital signature allows anyone with the relevant public key to verify that a signature corresponds to a message and private key. It supports integrity and key-based origin authentication, but the interpretation of that origin depends on how the public key is trusted.

## Failure modes and design choices

A valid signature proves neither that the statement is factually true nor that the signer understood or approved an unstated interpretation.

## Verification and engineering practice

Sign a canonical, versioned message format and include context to prevent a signature for one purpose from being reused for another. Use established signature APIs and verify before acting on signed data.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
