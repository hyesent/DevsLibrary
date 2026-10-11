---
title: "Hash design: Merkle–Damgård and sponge"
order: 15
book: "cryptography-advanced"
---

# Hash design: Merkle–Damgård and sponge

## Core model and mechanics

Many SHA-2 hashes use a Merkle–Damgård-style iteration, while SHA-3 uses a sponge construction. Internal structure affects properties such as length extension and how the hash can safely be used in constructions. A hash digest is not automatically a keyed authenticator.

## Analysis and design choices

A secret-prefix hash can be vulnerable to length extension when used as an improvised message authenticator.

## Engineering, research, and verification

Know the construction family when evaluating protocol designs. Use HMAC or another standardized MAC rather than `hash(secret || message)`, and understand why some constructions need domain separation or explicit length framing.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
