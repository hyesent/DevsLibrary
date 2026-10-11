---
title: "SNARKs, STARKs, and proof-system tradeoffs"
order: 24
book: "cryptography-advanced"
---

# SNARKs, STARKs, and proof-system tradeoffs

## Core model and mechanics

Succinct proof systems aim to make verification much cheaper than re-executing a computation. SNARK and STARK families differ in assumptions, proof size, prover cost, transparency, and post-quantum considerations. These are families, not single interchangeable algorithms.

## Analysis and design choices

A tiny proof does not imply cheap proving, and cryptographic soundness cannot compensate for a circuit that omits a required check.

## Engineering, research, and verification

Evaluate the exact implementation, circuit language, trusted setup if any, field constraints, recursion support, verifier deployment, and proof-generation cost. Audit the relation being proved, not just the cryptographic library.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
