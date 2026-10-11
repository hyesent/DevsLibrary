---
title: "Secure erasure and cryptographic deletion"
order: 32
book: "cryptography-advanced"
---

# Secure erasure and cryptographic deletion

## Core model and mechanics

Cryptographic erasure makes data inaccessible by destroying or invalidating the keys needed to decrypt it. It can be more tractable than overwriting every physical copy, but only if all relevant copies and wrapped keys are understood and no plaintext replicas remain.

## Analysis and design choices

Deleting the primary key while an old backup retains a usable copy does not accomplish cryptographic erasure.

## Engineering, research, and verification

Map every key copy, backup, cache, export, replica, and recovery mechanism. Test deletion against disaster recovery procedures and define evidence that deletion has actually taken effect.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
