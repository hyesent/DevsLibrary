---
title: "Length-extension attacks"
order: 16
book: "cryptography-advanced"
---

# Length-extension attacks

## Core model and mechanics

For certain Merkle–Damgård hashes, an attacker who knows H(secret || message) may be able to compute a digest for an extended message without learning the secret, if the application accepts the forged format. The issue is not a broken hash but an incorrect construction.

## Analysis and design choices

Appending a secret to the end instead of the beginning does not create a generally sound MAC construction either.

## Engineering, research, and verification

Replace secret-prefix hash authentication with HMAC or a standardized MAC. Test legacy signing formats with an adversarial model and include unambiguous framing in authenticated inputs.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
