---
title: "One-way functions and trapdoors"
order: 8
book: "cryptography-fundamentals"
---

# One-way functions and trapdoors

## Mental model

A one-way function is easy to compute but infeasible to invert for an efficient adversary; a trapdoor adds secret information that makes a related inversion feasible. These are conceptual foundations for public-key encryption, signatures, and commitments, though practical security depends on precise constructions and assumptions.

## Failure modes and design choices

“Hard to reverse” is not a complete proof: structure, side channels, weak parameters, and implementation behavior can expose shortcuts.

## Verification and engineering practice

Distinguish mathematical intuition from a security reduction. Ask which problem is assumed hard, which parameters matter, and whether the scheme’s exact construction follows from that assumption.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
