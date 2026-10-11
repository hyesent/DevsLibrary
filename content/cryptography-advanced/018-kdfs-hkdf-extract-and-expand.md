---
title: "KDFs: HKDF extract and expand"
order: 18
book: "cryptography-advanced"
---

# KDFs: HKDF extract and expand

## Core model and mechanics

HKDF separates input-keying-material extraction from expansion. Extraction produces a pseudorandom key from input material; expansion derives context-specific output keys. The context string is an important boundary between protocols, roles, and key purposes.

## Analysis and design choices

Deriving multiple keys from one root without context separation can create cross-protocol confusion and accidental key reuse.

## Engineering, research, and verification

Use distinct labels for encryption, authentication, export, client/server direction, protocol version, and tenant where the design requires it. Follow the protocol's exact salt and info requirements instead of inventing substitutions.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
