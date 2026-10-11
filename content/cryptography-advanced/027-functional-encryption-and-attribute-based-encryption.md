---
title: "Functional encryption and attribute-based encryption"
order: 27
book: "cryptography-advanced"
---

# Functional encryption and attribute-based encryption

## Core model and mechanics

Functional encryption aims to reveal only a function of encrypted data to a key holder, while attribute-based encryption ties access to attributes or policies. These schemes can express rich access models but have complex assumptions, revocation concerns, and deployment costs.

## Analysis and design choices

Cryptographic policy enforcement does not fix incorrect attribute assignment or prevent a user from redistributing plaintext they legitimately obtained.

## Engineering, research, and verification

Use these schemes only when their specialized access model is necessary and expert-reviewed. Define policy updates, key issuance, collusion assumptions, and how compromised or departed users lose future access.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
