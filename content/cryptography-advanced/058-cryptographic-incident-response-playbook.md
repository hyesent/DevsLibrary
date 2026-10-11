---
title: "Cryptographic incident response playbook"
order: 58
book: "cryptography-advanced"
---

# Cryptographic incident response playbook

## Core model and mechanics

A cryptographic incident may involve key theft, nonce reuse, a vulnerable library, certificate misissuance, a protocol downgrade, or compromised signing authority. The right response depends on what property failed and what attacker access was possible.

## Analysis and design choices

Changing a password or rotating one secret may not contain a compromised signing key, stolen session tokens, or data already decrypted by an attacker.

## Engineering, research, and verification

Preserve evidence, identify affected keys and time windows, revoke or rotate with a tested plan, invalidate dependent credentials, assess stored data and signed artifacts, and communicate residual exposure. Assign one owner for each recovery action.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
