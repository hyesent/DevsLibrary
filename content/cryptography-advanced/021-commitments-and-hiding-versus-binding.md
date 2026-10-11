---
title: "Commitments and hiding versus binding"
order: 21
book: "cryptography-advanced"
---

# Commitments and hiding versus binding

## Core model and mechanics

A commitment lets a party commit to a value now and reveal it later without changing the committed value. Hiding means the commitment does not reveal the value; binding means the committer cannot feasibly open it as two different values. Schemes trade these properties according to assumptions.

## Analysis and design choices

A plain hash can act as a commitment only under appropriate entropy and protocol conditions; low-entropy values can be guessed by hashing candidates.

## Engineering, research, and verification

Use standardized commitment schemes in protocols that need sealed bids, delayed reveals, or cryptographic commitments to data. Include context and randomness, and define exactly what is committed as bytes.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
