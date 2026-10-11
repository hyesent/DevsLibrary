---
title: "Oblivious pseudorandom functions"
order: 51
book: "cryptography-advanced"
---

# Oblivious pseudorandom functions

## Core model and mechanics

An OPRF lets a client obtain a pseudorandom function result on an input without revealing that input to the server, while the client learns no more than the protocol permits. Variants are useful in privacy-preserving password protection and private lookup systems.

## Analysis and design choices

An OPRF does not hide the user's network identity or stop a server from limiting, logging, or correlating requests through surrounding metadata.

## Engineering, research, and verification

Use a standardized OPRF protocol with its exact group, blinding, validation, and rate-limit requirements. Consider server compromise, malicious clients, input entropy, and whether the result is stable across contexts.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
