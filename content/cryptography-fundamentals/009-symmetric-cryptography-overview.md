---
title: "Symmetric cryptography overview"
order: 9
book: "cryptography-fundamentals"
---

# Symmetric cryptography overview

## Mental model

Symmetric algorithms use shared secret key material. Block ciphers transform fixed-size blocks; stream ciphers generate keystreams; hash functions are unkeyed digests; MACs authenticate messages with a shared key. These primitives solve different problems and are not interchangeable.

## Failure modes and design choices

Encrypting with a block cipher directly or using a hash as an improvised MAC can introduce structural weaknesses.

## Verification and engineering practice

Choose a construction that matches the required property, then use a vetted high-level API. AES is a block cipher, not a complete encryption protocol; ChaCha20 is a stream cipher and normally needs a suitable authentication construction.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
