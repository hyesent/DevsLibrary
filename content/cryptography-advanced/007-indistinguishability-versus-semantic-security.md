---
title: "Indistinguishability versus semantic security"
order: 7
book: "cryptography-advanced"
---

# Indistinguishability versus semantic security

## Core model and mechanics

Semantic security informally says ciphertext reveals no efficiently exploitable information beyond what was already known. Indistinguishability gives a game-based formulation: an attacker chooses two permitted messages and tries to tell which one was encrypted. Under standard conditions, these views capture closely related goals.

## Analysis and design choices

Encryption can be semantically secure for message contents while leaking a great deal through sizes and access patterns.

## Engineering, research, and verification

Ask what information is intentionally leaked, such as message length, timing, recipient, or traffic volume. Security definitions normally abstract away some metadata, so system design must decide whether and how to hide it.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
