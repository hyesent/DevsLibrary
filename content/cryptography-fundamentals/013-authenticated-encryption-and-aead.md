---
title: "Authenticated encryption and AEAD"
order: 13
book: "cryptography-fundamentals"
---

# Authenticated encryption and AEAD

## Mental model

Authenticated encryption with associated data (AEAD) provides confidentiality and integrity for plaintext while authenticating additional unencrypted context. Associated data can bind ciphertext to a record ID, protocol version, tenant, or other context without hiding that context.

## Failure modes and design choices

Treating unauthenticated plaintext as valid before tag verification can turn a correct primitive into an application vulnerability.

## Verification and engineering practice

Use a single high-level encrypt/decrypt operation. On decryption, release no plaintext until authentication succeeds. Define exactly which metadata is authenticated and ensure the same canonical bytes are supplied during verification.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
