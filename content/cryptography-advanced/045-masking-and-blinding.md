---
title: "Masking and blinding"
order: 45
book: "cryptography-advanced"
---

# Masking and blinding

## Core model and mechanics

Masking splits sensitive values into randomized shares so individual intermediate values reveal less about the secret. Blinding randomizes inputs or computations to reduce exploitable correlations. Both techniques have subtle composition, randomness, and implementation requirements.

## Analysis and design choices

Incorrect masking can leak through combinations of shares, and bad randomness can collapse the protection entirely.

## Engineering, research, and verification

Use proven countermeasures matched to the device and leakage model. Evaluate glitches, compiler transformations, randomness quality, and composability; do not assume adding random values automatically provides a formal protection.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
