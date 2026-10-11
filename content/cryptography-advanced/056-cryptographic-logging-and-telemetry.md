---
title: "Cryptographic logging and telemetry"
order: 56
book: "cryptography-advanced"
---

# Cryptographic logging and telemetry

## Core model and mechanics

Logs help diagnose cryptographic failures but can accidentally expose tokens, keys, plaintext, certificate private material, or sensitive identifiers. Logging too little obscures incidents; logging too much creates a second sensitive data store.

## Analysis and design choices

A debug log that captures raw request headers or decrypted payloads can defeat otherwise sound encryption and token protection.

## Engineering, research, and verification

Log event type, key identifier, algorithm/version, outcome, and correlation IDs without logging secrets or plaintext. Restrict log access, set retention, and test that exception messages and traces do not leak secret-bearing objects.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
