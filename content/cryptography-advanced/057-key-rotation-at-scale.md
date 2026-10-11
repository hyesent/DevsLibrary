---
title: "Key rotation at scale"
order: 57
book: "cryptography-advanced"
---

# Key rotation at scale

## Core model and mechanics

Large deployments rotate keys while old ciphertext, cached sessions, offline clients, and queued messages remain in circulation. Rotation therefore requires staged acceptance, version metadata, migration progress, and a plan for eventually retiring old keys.

## Analysis and design choices

Keeping old keys enabled indefinitely weakens the purpose of rotation; retiring them too early can make data unrecoverable.

## Engineering, research, and verification

Separate active encryption keys from decryption-only historical keys when appropriate, track key usage and ciphertext age, re-encrypt data in controlled batches, and test recovery during partial rollout.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
