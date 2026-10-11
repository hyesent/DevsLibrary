---
title: "AES-SIV and deterministic encryption"
order: 13
book: "cryptography-advanced"
---

# AES-SIV and deterministic encryption

## Core model and mechanics

Synthetic-IV constructions can provide deterministic or nonce-misuse-resistant authenticated encryption properties depending on the exact variant and usage. Determinism leaks equality of repeated plaintexts under the same key and context, which may be unacceptable for sensitive structured data.

## Analysis and design choices

An attacker may infer low-entropy values from repeated deterministic ciphertexts even without decrypting them.

## Engineering, research, and verification

Choose deterministic encryption only when equality leakage is explicitly acceptable and analyzed. Bind context using associated data and understand how message repetition, field frequency, and known-plaintext guesses affect privacy.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
