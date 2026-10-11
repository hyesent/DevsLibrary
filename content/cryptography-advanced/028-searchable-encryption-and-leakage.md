---
title: "Searchable encryption and leakage"
order: 28
book: "cryptography-advanced"
---

# Searchable encryption and leakage

## Core model and mechanics

Searchable encryption supports selected queries over encrypted data, but practical schemes often reveal patterns such as repeated queries, matching-document access, result sizes, or update behavior. Leakage profiles are central to security, not an implementation footnote.

## Analysis and design choices

Repeated search patterns can reveal document contents through auxiliary information even when ciphertext remains encrypted.

## Engineering, research, and verification

List every observable value and access pattern. Evaluate known-query and chosen-keyword attacks against the actual dataset, and compare searchable encryption with trusted execution, client-side search, or narrower data collection.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
