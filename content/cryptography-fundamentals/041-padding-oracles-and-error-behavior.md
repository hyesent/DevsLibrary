---
title: "Padding oracles and error behavior"
order: 41
book: "cryptography-fundamentals"
---

# Padding oracles and error behavior

## Mental model

A padding oracle occurs when a system reveals whether decrypted ciphertext has valid padding or otherwise exposes distinguishable decryption failures. Attackers can use repeated chosen ciphertexts to recover plaintext in vulnerable constructions.

## Failure modes and design choices

Changing the error message alone may not remove an oracle if timing or downstream behavior still distinguishes cases.

## Verification and engineering practice

Prefer AEAD rather than legacy encrypt-then-check patterns. Do not expose padding-specific failures; authenticate ciphertext before processing and use a well-reviewed implementation.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
