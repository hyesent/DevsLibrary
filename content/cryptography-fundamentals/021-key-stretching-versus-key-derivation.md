---
title: "Key stretching versus key derivation"
order: 21
book: "cryptography-fundamentals"
---

# Key stretching versus key derivation

## Mental model

Key stretching increases the cost of guessing a password-derived secret; a general KDF safely derives keys from existing key material. They address different input assumptions and should not be casually substituted for one another.

## Failure modes and design choices

Running HKDF repeatedly on a weak password does not turn it into a password-hardening function.

## Verification and engineering practice

Identify whether the input is high-entropy key material or a human-chosen password. Use HKDF for the former where appropriate and a password KDF for the latter.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
