---
title: "Password-authenticated key exchange"
order: 50
book: "cryptography-advanced"
---

# Password-authenticated key exchange

## Core model and mechanics

PAKE protocols allow parties to establish a shared key using a human-memorable password while limiting offline guessing by a passive observer, under defined assumptions. They do not make weak passwords invulnerable to every online attack or remove the need for rate limits and endpoint security.

## Analysis and design choices

A custom challenge-response protocol based on hashing a password often gives attackers an offline verifier for guesses.

## Engineering, research, and verification

Use standardized PAKE protocols and audited libraries, define account recovery and server compromise behavior, and understand whether the scheme protects against malicious servers or only passive attackers.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
