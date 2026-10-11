---
title: "Modes of operation: why raw AES is not enough"
order: 12
book: "cryptography-fundamentals"
---

# Modes of operation: why raw AES is not enough

## Mental model

ECB encrypts equal blocks identically and leaks patterns. CBC and CTR have their own IV/nonce and integrity requirements. GCM provides authenticated encryption when used correctly. Mode selection determines what security claims can be made about multi-block messages.

## Failure modes and design choices

A mode may be secure under assumptions that the application violates, such as repeating an IV or exposing a padding oracle.

## Verification and engineering practice

For new application work, use a vetted AEAD API. Avoid choosing a mode based on a blog snippet, and never silently fall back to a weaker mode when authentication fails.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
