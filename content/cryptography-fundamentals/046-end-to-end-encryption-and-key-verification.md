---
title: "End-to-end encryption and key verification"
order: 46
book: "cryptography-fundamentals"
---

# End-to-end encryption and key verification

## Mental model

End-to-end encryption aims to keep plaintext accessible only to communicating endpoints, not intermediary servers. Its security depends on endpoint integrity, identity verification, device enrollment, key changes, backup design, and metadata handling.

## Failure modes and design choices

A server may be unable to decrypt message bodies while still observing who communicates, when, and how much data moves.

## Verification and engineering practice

Explain how users verify contacts, how new devices join, how identity-key changes are surfaced, and what backups expose. Model group membership changes and multi-device synchronization explicitly.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
