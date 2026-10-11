---
title: "Power and electromagnetic analysis"
order: 44
book: "cryptography-advanced"
---

# Power and electromagnetic analysis

## Core model and mechanics

Power analysis observes consumption correlated with internal computation. Simple power analysis looks for visible patterns; differential power analysis statistically combines traces to infer secret-dependent operations. Electromagnetic analysis can observe related emissions without measuring supply current directly.

## Analysis and design choices

Software-level constant-time claims alone do not guarantee power or electromagnetic resistance on a physical target.

## Engineering, research, and verification

Treat physical side-channel resistance as a specialized hardware discipline. Use vetted countermeasures, balanced or masked implementations where appropriate, realistic evaluation traces, and independent lab assessment for high-value devices.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
