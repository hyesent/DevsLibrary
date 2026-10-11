---
title: "Birthday bounds and collision budgets"
order: 9
book: "cryptography-advanced"
---

# Birthday bounds and collision budgets

## Core model and mechanics

For an n-bit hash output, generic collision search becomes practical around 2^(n/2) evaluations due to the birthday effect, while generic preimage search has a different scale. Real protocols must also account for total messages, blocks, keys, and adversarial attempts.

## Analysis and design choices

A nominal 128-bit value does not provide 128 bits of collision resistance in every context.

## Engineering, research, and verification

Estimate cumulative use rather than citing output length alone. For block-cipher modes, respect per-key data limits and collision bounds; for hashes and identifiers, distinguish collision resistance from accidental collision probability.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
