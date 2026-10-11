---
title: "CCA security and non-malleability"
order: 6
book: "cryptography-advanced"
---

# CCA security and non-malleability

## Core model and mechanics

Non-malleability concerns whether an attacker can transform a ciphertext into a related ciphertext whose plaintext has a predictable relationship to the original. CCA security is a powerful formulation for many encryption settings, but exact definitions and permitted oracle access matter.

## Analysis and design choices

Ciphertext modification may be useful to an attacker even if the attacker never learns the original plaintext.

## Engineering, research, and verification

Do not build protocols around raw ciphertext algebra or assume that ciphertext integrity follows from secrecy. Use standardized constructions and authenticate protocol context, version, and recipient where required.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
