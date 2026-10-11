---
title: "ChaCha20-Poly1305 construction details"
order: 14
book: "cryptography-advanced"
---

# ChaCha20-Poly1305 construction details

## Core model and mechanics

ChaCha20 generates a keystream through add-rotate-XOR operations; Poly1305 authenticates messages using arithmetic modulo a prime. The combined AEAD construction carefully derives and uses one-time authentication key material and defines nonce and counter handling.

## Analysis and design choices

Reusing the one-time Poly1305 key can expose authentication secrets; hand-rolled composition is not an acceptable shortcut.

## Engineering, research, and verification

Use a standard library's combined AEAD interface. Avoid manually stitching ChaCha20 and Poly1305 together, and respect nonce uniqueness and maximum-message limits in the specific API.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
