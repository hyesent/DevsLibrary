---
title: "Researching a cryptographic claim"
order: 61
book: "cryptography-advanced"
---

# Researching a cryptographic claim

## Core model and mechanics

A responsible review distinguishes a standard, a formal proof, a cryptanalysis result, a vendor claim, and an implementation audit. Each answers different questions and has different assumptions and reproducibility requirements.

## Analysis and design choices

A headline such as 'broken' may refer to a reduced-round variant, a side channel, a parameter issue, or a practical attack; these are not interchangeable.

## Engineering, research, and verification

Locate the primary specification or paper, identify version and date, reproduce the claim's exact scope, inspect known limitations, and compare independent analyses. Record unresolved questions rather than smoothing them into a confident conclusion.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
