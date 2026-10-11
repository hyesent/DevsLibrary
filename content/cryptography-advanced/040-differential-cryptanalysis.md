---
title: "Differential cryptanalysis"
order: 40
book: "cryptography-advanced"
---

# Differential cryptanalysis

## Core model and mechanics

Differential cryptanalysis studies how input differences propagate to output differences through a cipher. It searches for differential characteristics or trails that occur more often than expected under a random permutation, potentially enabling key recovery with enough chosen or known data.

## Analysis and design choices

A distinguisher against reduced rounds may not scale to the full standardized cipher or violate its practical security margin.

## Engineering, research, and verification

Learn the method first on small toy ciphers, tracking probability across rounds and how key additions affect differences. When reading real attacks, record data complexity, time complexity, memory, chosen-input assumptions, and the exact round count attacked.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
