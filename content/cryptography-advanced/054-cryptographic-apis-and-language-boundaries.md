---
title: "Cryptographic APIs and language boundaries"
order: 54
book: "cryptography-advanced"
---

# Cryptographic APIs and language boundaries

## Core model and mechanics

A cryptographic API can expose safe high-level operations or dangerous low-level primitives. Type systems, ownership models, byte encodings, error types, and async behavior affect whether callers misuse keys or accidentally continue after verification fails.

## Analysis and design choices

An API that returns plaintext plus a separate 'valid' flag encourages callers to use plaintext before checking authenticity.

## Engineering, research, and verification

Prefer APIs that make invalid states hard to represent: distinct key types, explicit nonce parameters, authenticated decryption results, and narrowly scoped capabilities. Wrap low-level APIs behind small reviewed interfaces.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
