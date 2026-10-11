---
title: "Reductions and tightness"
order: 3
book: "cryptography-advanced"
---

# Reductions and tightness

## Core model and mechanics

A reduction shows that an efficient attacker against a construction could be transformed into an attacker against an underlying assumption. The reduction's loss matters: if the transformed attacker is much weaker or needs far more resources, the theorem may provide a loose concrete bound.

## Analysis and design choices

Saying 'the scheme is proven secure' without naming the model, assumption, and reduction loss hides important qualifications.

## Engineering, research, and verification

When reading a proof, track the number of oracle queries, guessing steps, rewinds, and probability losses. Ask whether the reduction is tight enough for the intended parameter sizes and usage limits.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
