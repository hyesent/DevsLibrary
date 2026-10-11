---
title: "Protocol verification with state machines"
order: 48
book: "cryptography-advanced"
---

# Protocol verification with state machines

## Core model and mechanics

Protocol analysis models parties, messages, state transitions, adversary-controlled networks, and claims such as secrecy or authentication. State-machine errors often arise from role confusion, missing context, unexpected message order, or reuse of old sessions.

## Analysis and design choices

A proof about an idealized protocol can miss implementation behavior if the real parser or state machine accepts extra message forms.

## Engineering, research, and verification

Specify roles and states before coding. Use established formal tools or protocol-analysis methods, model replay and concurrency, and compare the implementation's actual messages and error paths to the analyzed protocol.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
