---
title: "Nonce discipline and GCM failure"
order: 14
book: "cryptography-fundamentals"
---

# Nonce discipline and GCM failure

## Mental model

A nonce or IV requirement is algorithm-specific: some schemes require uniqueness, some require unpredictability, and some support carefully defined misuse-resistant behavior. AES-GCM nonce reuse with the same key can expose relationships between plaintexts and undermine authentication.

## Failure modes and design choices

Nonce uniqueness must survive retries, process restarts, backups, VM cloning, and horizontal scaling—not just a single function call.

## Verification and engineering practice

Choose one nonce strategy: safe random generation under a justified volume bound, or a durable counter with concurrency, crash, restore, and multi-writer behavior designed explicitly. Never reset a counter while retaining its key.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
