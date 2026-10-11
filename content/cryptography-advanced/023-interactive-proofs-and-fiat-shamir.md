---
title: "Interactive proofs and Fiat–Shamir"
order: 23
book: "cryptography-advanced"
---

# Interactive proofs and Fiat–Shamir

## Core model and mechanics

Interactive proofs exchange challenges and responses; the Fiat–Shamir transform can convert certain interactive protocols into non-interactive ones by deriving challenges from a hash of the transcript. Security depends on the protocol and model, not merely adding a hash call.

## Analysis and design choices

Omitting a public input from the transcript can let a proof be reused in a different context.

## Engineering, research, and verification

Bind all public inputs and transcript elements in the specified order, use the intended domain labels, and follow the scheme's challenge encoding. Do not design a custom transform from a paper's high-level description.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
