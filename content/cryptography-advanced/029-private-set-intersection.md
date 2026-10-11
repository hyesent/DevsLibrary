---
title: "Private set intersection"
order: 29
book: "cryptography-advanced"
---

# Private set intersection

## Core model and mechanics

Private set intersection lets parties discover the intersection of their sets while limiting disclosure of nonmatching elements according to the protocol. Variants differ in malicious-security guarantees, cardinality leakage, and whether payloads can be attached to matching items.

## Analysis and design choices

A PSI result can itself be sensitive, and repeated intersection queries can leak more than one isolated execution suggests.

## Engineering, research, and verification

Define set sizes, duplicate handling, output visibility, malicious behavior, and rate limits. Use a reviewed PSI implementation and avoid exposing repeated queries that allow reconstruction of another party's dataset.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
