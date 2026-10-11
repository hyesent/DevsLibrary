---
title: "Encoding, parsers, and malleable formats"
order: 55
book: "cryptography-advanced"
---

# Encoding, parsers, and malleable formats

## Core model and mechanics

Cryptographic operations consume bytes, but protocol implementations parse structured formats. Multiple encodings for the same value, duplicate fields, integer overflows, trailing bytes, or permissive parsers can create signature bypasses and cross-component disagreement.

## Analysis and design choices

If one service verifies a message and another interprets it differently, cryptography may authenticate bytes that do not have the intended meaning.

## Engineering, research, and verification

Use strict parsers, canonical encodings where specified, length limits, and rejection of malformed or non-canonical values. Ensure every component verifies the same representation that later components interpret.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
