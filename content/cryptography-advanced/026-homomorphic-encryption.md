---
title: "Homomorphic encryption"
order: 26
book: "cryptography-advanced"
---

# Homomorphic encryption

## Core model and mechanics

Homomorphic encryption permits selected computation on ciphertexts so a holder of the decryption key can recover a result corresponding to computation on plaintexts. Partially, somewhat, and fully homomorphic systems support different operation sets and costs.

## Analysis and design choices

Encrypted computation does not make outputs harmless: results and repeated queries may still leak sensitive information, and incorrect parameters can invalidate security or correctness.

## Engineering, research, and verification

Start from the computation and precision requirements, then evaluate ciphertext expansion, latency, key management, parameter selection, and noise or depth constraints. Use established libraries and benchmark realistic workloads.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
