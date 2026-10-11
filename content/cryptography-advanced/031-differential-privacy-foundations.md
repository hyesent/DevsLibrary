---
title: "Differential privacy foundations"
order: 31
book: "cryptography-advanced"
---

# Differential privacy foundations

## Core model and mechanics

Differential privacy bounds how much the output distribution of a randomized analysis changes when one person's data is added or removed. It is a formal privacy guarantee for outputs, not a method of encrypting the dataset or hiding data from the analyst who holds it.

## Analysis and design choices

A nominal epsilon without a threat model, sensitivity bound, and composition accounting is not a meaningful privacy claim.

## Engineering, research, and verification

Define the neighboring-dataset relation, privacy parameters, contribution bounds, and complete release process. Track composition across repeated queries and include preprocessing, filtering, and auxiliary outputs in the analysis.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
