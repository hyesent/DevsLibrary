---
title: "Hybrid key establishment and downgrade resistance"
order: 38
book: "cryptography-advanced"
---

# Hybrid key establishment and downgrade resistance

## Core model and mechanics

Hybrid key establishment combines classical and post-quantum mechanisms so that the shared secret is designed to remain secure if at least one component remains secure, subject to the exact combiner and protocol. Negotiation must prevent an attacker from silently stripping the stronger option.

## Analysis and design choices

Naively concatenating two secrets is not a complete proof of a secure hybrid combiner, and a downgradeable negotiation can erase the intended benefit.

## Engineering, research, and verification

Use a standardized hybrid protocol and verify transcript binding, combiner definition, fallback rules, and telemetry. Plan how clients signal support and how policy evolves as deployment coverage improves.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
