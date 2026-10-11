---
title: "Fault attacks and fault injection"
order: 43
book: "cryptography-advanced"
---

# Fault attacks and fault injection

## Core model and mechanics

Fault attacks deliberately induce errors through voltage, clock, temperature, electromagnetic effects, laser exposure, or software-level glitches. Comparing correct and faulty computations can reveal secret-dependent information, especially in cryptographic hardware and embedded devices.

## Analysis and design choices

A device that detects a fault but then continues using a corrupted result may be more vulnerable than one that fails safely.

## Engineering, research, and verification

Assess the physical threat model and use implementation-level protections such as redundant checks, fault detection, safe error handling, and verified hardware features. Test whether a detected fault can bypass signature verification or leak intermediate values.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
