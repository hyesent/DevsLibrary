---
title: "Multi-user and multi-key security"
order: 8
book: "cryptography-advanced"
---

# Multi-user and multi-key security

## Core model and mechanics

Real deployments use many keys across users, tenants, services, devices, and sessions. A bound proven for one key may degrade as the number of keys and total operations grows. Shared libraries and global key mistakes can turn a local failure into a fleet-wide one.

## Analysis and design choices

A system cannot evaluate security solely by looking at one isolated key when millions of keys and billions of operations exist.

## Engineering, research, and verification

Track aggregate query counts, per-key data volume, key reuse across contexts, and blast radius. Use separate keys or domain-separated derivations for independent purposes, and set explicit limits where the scheme requires them.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
