---
title: "Chosen-plaintext and chosen-ciphertext security"
order: 5
book: "cryptography-advanced"
---

# Chosen-plaintext and chosen-ciphertext security

## Core model and mechanics

Chosen-plaintext security asks whether an attacker who chooses messages can distinguish their encryptions. Chosen-ciphertext security additionally models decryption access, typically excluding the exact challenge ciphertext. The stronger model captures systems where attackers can submit crafted ciphertexts to a decryption endpoint.

## Analysis and design choices

A construction that resists passive eavesdropping may fail badly when attackers can adapt queries based on responses.

## Engineering, research, and verification

Map the model to application interfaces: error pages, token validators, encrypted cookies, file previewers, and API endpoints may accidentally become decryption oracles. Prefer authenticated encryption and ensure unauthenticated data cannot trigger meaningful processing.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
