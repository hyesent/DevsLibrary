---
title: "Stream ciphers and keystream reuse"
order: 11
book: "cryptography-fundamentals"
---

# Stream ciphers and keystream reuse

## Mental model

A stream cipher combines plaintext with a pseudorandom keystream. If the same keystream is reused, XOR relationships between plaintexts become exposed; known or guessed portions can reveal corresponding portions of other messages.

## Failure modes and design choices

A nonce is often public, but that does not make reuse safe. For many schemes, repeated nonce-key pairs are catastrophic.

## Verification and engineering practice

Use a reviewed construction such as ChaCha20-Poly1305 through a high-level API, or a well-configured AES-GCM implementation. Track nonce requirements precisely and treat uniqueness as a protocol invariant.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
