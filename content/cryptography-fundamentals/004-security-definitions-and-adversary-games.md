---
title: "Security definitions and adversary games"
order: 4
book: "cryptography-fundamentals"
---

# Security definitions and adversary games

## Mental model

Formal definitions make vague goals testable. IND-CPA models whether ciphertexts reveal which of two chosen plaintexts was encrypted under specified conditions; INT-CTXT models resistance to creating a new accepted ciphertext; EUF-CMA models forging a signature after chosen-message queries.

## Failure modes and design choices

A scheme secure under passive observation may fail under chosen-ciphertext attacks. The attack model is part of the claim.

## Verification and engineering practice

Read the game: what may the adversary choose, what oracle access is allowed, what counts as winning, and what assumptions bound the advantage? A theorem only guarantees the property represented by that game.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
