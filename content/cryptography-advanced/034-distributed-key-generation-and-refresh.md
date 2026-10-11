---
title: "Distributed key generation and refresh"
order: 34
book: "cryptography-advanced"
---

# Distributed key generation and refresh

## Core model and mechanics

Distributed key generation creates a shared public key and secret shares without one participant ever assembling the full secret. Refresh protocols can update shares while keeping the underlying secret or public key unchanged, depending on the construction.

## Analysis and design choices

A distributed protocol is not secure merely because no single server stores a full key; its messages and participants must satisfy the protocol's assumptions.

## Engineering, research, and verification

Model network partitions, participant replacement, malicious participants, transcript authentication, and recovery. Treat setup ceremonies and refresh events as security-critical operations with audit and monitoring.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
