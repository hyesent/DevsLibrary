---
title: "Key derivation functions"
order: 20
book: "cryptography-fundamentals"
---

# Key derivation functions

## Mental model

A KDF derives one or more cryptographic keys from input key material. HKDF uses extract-and-expand stages and is designed for key derivation from suitable input keying material; password-based KDFs instead compensate for guessable passwords.

## Failure modes and design choices

Domain separation reduces accidental cross-protocol key reuse and makes it harder for one context to be confused with another.

## Verification and engineering practice

Use separate derived keys for separate purposes, with context labels, protocol versions, and identities where appropriate. Never use a password directly as an AES key or assume a hash alone is a suitable KDF in every setting.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
