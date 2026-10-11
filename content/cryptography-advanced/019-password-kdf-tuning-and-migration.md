---
title: "Password KDF tuning and migration"
order: 19
book: "cryptography-advanced"
---

# Password KDF tuning and migration

## Core model and mechanics

Password KDF parameters balance offline-guessing cost against legitimate login latency and resource exhaustion. Memory hardness raises the cost of parallel guessing, but server-side verification also creates a denial-of-service surface.

## Analysis and design choices

A parameter set suitable for a low-volume service may be unsafe for a high-volume public login endpoint, or too expensive under attack.

## Engineering, research, and verification

Benchmark on production-like hardware, rate-limit authentication, store algorithm and parameter identifiers, and upgrade hashes after successful login. Maintain a plan for old hashes and emergency parameter changes.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
