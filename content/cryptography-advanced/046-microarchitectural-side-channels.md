---
title: "Microarchitectural side channels"
order: 46
book: "cryptography-advanced"
---

# Microarchitectural side channels

## Core model and mechanics

Caches, branch predictors, speculative execution, translation lookaside buffers, and shared execution units can expose information across security boundaries. The attacker may infer secret-dependent memory access or timing without directly reading the victim's memory.

## Analysis and design choices

A source-level operation that appears constant-time can become data-dependent after compilation or interact with processor behavior in unexpected ways.

## Engineering, research, and verification

Minimize secret-dependent access patterns, follow platform and language guidance, isolate mutually untrusted workloads, and track hardware and runtime mitigations. Evaluate whether shared tenancy and JIT behavior belong in the threat model.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
