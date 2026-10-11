---
title: "Block-cipher security and ideal permutations"
order: 10
book: "cryptography-advanced"
---

# Block-cipher security and ideal permutations

## Core model and mechanics

A block cipher is often modeled as a pseudorandom permutation: to a computationally bounded observer, its keyed permutation should look like a random permutation. Security bounds depend on how many blocks are processed and how the mode transforms the primitive.

## Analysis and design choices

AES-256 does not make every mode safe for unlimited data under one key; mode-specific bounds still apply.

## Engineering, research, and verification

Read usage limits alongside the cipher name. Understand that block size can dominate birthday-bound concerns even when the key is very large, and do not exceed standard-defined volume or nonce constraints.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
