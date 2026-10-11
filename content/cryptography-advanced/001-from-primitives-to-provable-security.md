---
title: "From primitives to provable security"
order: 1
book: "cryptography-advanced"
---

# From primitives to provable security

## Core model and mechanics

A primitive is a component with a defined interface; a construction combines primitives into a scheme; a protocol coordinates schemes across parties and time. Security does not automatically compose upward. A proof for a primitive only supports a system-level claim when the construction satisfies the proof's assumptions and the implementation preserves its model.

## Analysis and design choices

A proof can be correct while the deployed system is insecure because the theorem excludes compromised endpoints, side channels, bad randomness, or misuse of the API.

## Engineering, research, and verification

For each design, write the security game, assumptions, adversary capabilities, and reduction argument in plain language before looking at code. Identify every point where real systems depart from the idealized model: parsing, timing, state persistence, key storage, concurrency, and human trust.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
