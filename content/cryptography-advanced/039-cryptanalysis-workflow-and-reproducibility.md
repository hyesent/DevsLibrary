---
title: "Cryptanalysis workflow and reproducibility"
order: 39
book: "cryptography-advanced"
---

# Cryptanalysis workflow and reproducibility

## Core model and mechanics

Cryptanalysis is disciplined testing of a defined security claim. It begins by identifying the primitive or protocol, threat model, available observations, and target property; then it forms hypotheses, develops experiments, and measures whether the result violates the claim.

## Analysis and design choices

A successful attack on a deliberately tiny teaching key does not establish that a production key size is broken.

## Engineering, research, and verification

Keep experiments reproducible with exact versions, parameters, seeds where appropriate, scripts, and clear success criteria. Separate toy demonstrations from evidence against production parameters and disclose findings responsibly.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
