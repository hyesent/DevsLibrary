---
title: "Threshold cryptography and secret sharing"
order: 33
book: "cryptography-advanced"
---

# Threshold cryptography and secret sharing

## Core model and mechanics

Secret sharing splits a secret into shares such that a defined threshold can reconstruct it while fewer shares reveal limited information. Threshold signatures and threshold decryption distribute a cryptographic operation so no single participant necessarily holds the complete private key.

## Analysis and design choices

A threshold design can still fail if shares are stored together, administrators collude, or the protocol leaks information through repeated malformed requests.

## Engineering, research, and verification

Define threshold, participant identities, share refresh, backup, compromise response, and recovery. Use reviewed protocols and protect against collusion and inconsistent participant views.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
