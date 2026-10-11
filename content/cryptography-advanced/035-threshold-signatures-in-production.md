---
title: "Threshold signatures in production"
order: 35
book: "cryptography-advanced"
---

# Threshold signatures in production

## Core model and mechanics

Threshold signing splits signing authority across participants. A protocol can reduce single-key compromise risk, but introduces coordination, nonce or preprocessing state, participant availability, and complex abort handling.

## Analysis and design choices

Retrying a failed threshold-signing session with reused ephemeral material can compromise the distributed key in schemes with strict nonce requirements.

## Engineering, research, and verification

Choose a protocol with a clearly defined malicious-adversary model, audit its implementation, and test crashes and retries without reusing one-time signing material. Define who can initiate signatures and what each signature authorizes.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
