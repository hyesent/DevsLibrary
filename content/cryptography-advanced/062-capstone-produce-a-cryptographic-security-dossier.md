---
title: "Capstone: produce a cryptographic security dossier"
order: 62
book: "cryptography-advanced"
---

# Capstone: produce a cryptographic security dossier

## Core model and mechanics

A security dossier makes a system's cryptographic claims reviewable. It includes data flows, threat models, primitive inventory, key ownership, protocol state, implementation dependencies, operational limits, failure handling, and evidence for each claim.

## Analysis and design choices

The goal is not to claim that every corner is solved. It is to make unknowns visible, connect every primitive to a justified purpose, and establish a repeatable process for closing gaps.

## Engineering, research, and verification

For a real or fictional system, produce an asset and key inventory, assumptions register, data-flow diagram, security-property matrix, abuse cases, nonce and randomness plan, rotation and recovery runbooks, test evidence, migration roadmap, and prioritized residual risks.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
