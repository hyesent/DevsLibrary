---
title: "Architecture review: encrypted cloud data"
order: 60
book: "cryptography-advanced"
---

# Architecture review: encrypted cloud data

## Core model and mechanics

Cloud encryption must align data keys, key-encryption keys, tenant authorization, workload identity, backup recovery, audit logs, and region or service boundaries. The phrase 'encrypted at rest' leaves open who can request decryption and where plaintext exists.

## Analysis and design choices

If a broad service role can decrypt every customer record, storage encryption alone may offer limited protection against that service's compromise.

## Engineering, research, and verification

Map the plaintext path from client through API, queue, worker, storage, backup, analytics, and support tooling. Bind ciphertext to its intended tenant and record; limit decrypt permissions and test a compromised application identity scenario.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
