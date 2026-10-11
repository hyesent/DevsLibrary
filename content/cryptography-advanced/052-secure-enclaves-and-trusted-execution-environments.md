---
title: "Secure enclaves and trusted execution environments"
order: 52
book: "cryptography-advanced"
---

# Secure enclaves and trusted execution environments

## Core model and mechanics

Trusted execution environments aim to isolate code and data from some software-level attackers. Their guarantees depend on hardware, firmware, attestation, memory encryption, side-channel exposure, and the trust placed in the vendor and provisioning service.

## Analysis and design choices

An enclave does not automatically protect against every physical attack, side channel, malicious input, or flaw in code running inside it.

## Engineering, research, and verification

Define which attacker the enclave excludes, how attestation is validated, how keys are provisioned, and what happens when firmware is revoked. Minimize secrets inside the enclave and assess rollback and side-channel risks.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
