---
title: "Linear cryptanalysis"
order: 41
book: "cryptography-advanced"
---

# Linear cryptanalysis

## Core model and mechanics

Linear cryptanalysis searches for statistical correlations between selected plaintext, ciphertext, and key bits. A small bias can become useful when many observations are collected and combined according to the attack model.

## Analysis and design choices

A nonzero correlation is not automatically an exploitable break; the attacker must obtain enough observations and convert the signal into key information.

## Engineering, research, and verification

Practice with toy substitution-permutation networks and calculate biases explicitly. For each published result, distinguish a statistical distinguisher from full key recovery and compare data needs with realistic usage limits.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
