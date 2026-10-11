---
title: "Zero-knowledge proof intuition"
order: 22
book: "cryptography-advanced"
---

# Zero-knowledge proof intuition

## Core model and mechanics

A zero-knowledge proof allows a prover to convince a verifier that a statement is true without revealing the witness beyond what the statement itself implies. Formal definitions involve completeness, soundness, and zero knowledge, with variants depending on interaction and assumptions.

## Analysis and design choices

A proof can be valid for the wrong statement if the circuit or constraints fail to encode the intended business rule.

## Engineering, research, and verification

Separate the statement, public inputs, private witness, setup assumptions, and verification process. For practical systems, use established proof systems and audited libraries, and understand trusted setup or transparent setup requirements.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
