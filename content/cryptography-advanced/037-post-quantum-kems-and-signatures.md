---
title: "Post-quantum KEMs and signatures"
order: 37
book: "cryptography-advanced"
---

# Post-quantum KEMs and signatures

## Core model and mechanics

Post-quantum cryptography uses constructions intended to resist known classical and quantum attacks. Key-encapsulation mechanisms establish shared secrets; digital signature schemes provide verification. Their key sizes, signatures, failure modes, and operational characteristics differ from classical systems.

## Analysis and design choices

A standardized post-quantum primitive still needs safe protocol composition, implementation review, and secure key management.

## Engineering, research, and verification

Follow current standards and vetted implementations. Measure handshake size, fragmentation, certificate-chain growth, device constraints, and interoperability; avoid choosing based only on a headline security level.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
