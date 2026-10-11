---
title: "Password pepper and split knowledge"
order: 20
book: "cryptography-advanced"
---

# Password pepper and split knowledge

## Core model and mechanics

A pepper is an additional secret kept separately from password hashes, often in a secret manager or HSM. It can reduce the usefulness of a database-only breach, but adds availability, rotation, and recovery complexity.

## Analysis and design choices

A pepper cannot prevent guessing after an attacker compromises both the password database and the pepper access path.

## Engineering, research, and verification

Document where pepper material lives, how it is accessed, and how hashes are migrated if it rotates. Keep the pepper out of the password database and avoid one global secret becoming an unbounded failure point.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
