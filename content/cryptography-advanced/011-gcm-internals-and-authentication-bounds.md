---
title: "GCM internals and authentication bounds"
order: 11
book: "cryptography-advanced"
---

# GCM internals and authentication bounds

## Core model and mechanics

GCM combines counter-mode encryption with polynomial authentication over a finite field. Its speed and parallelism are attractive, but its security relies on nonce discipline and bounded use. Nonce reuse can damage both confidentiality and authenticity.

## Analysis and design choices

A random 96-bit nonce strategy needs a quantified collision budget; a counter strategy needs durable coordination and safe recovery from snapshots or forks.

## Engineering, research, and verification

Use vetted implementations and obey the standard's per-key invocation and data limits. Design unique nonce allocation across replicas and restarts, and ensure failed tag verification releases no plaintext.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
