---
title: "Memory safety, zeroization, and secret lifetime"
order: 42
book: "cryptography-fundamentals"
---

# Memory safety, zeroization, and secret lifetime

## Mental model

Private keys and session secrets can remain in memory, crash dumps, swap, logs, or copied buffers. Managed runtimes may move or duplicate objects, making reliable erasure difficult or impossible to guarantee at the application level.

## Failure modes and design choices

Deleting a variable does not necessarily erase the bytes previously held in memory, especially in garbage-collected runtimes.

## Verification and engineering practice

Minimize secret lifetime and copies, avoid logging secret-bearing objects, use platform-supported protected key storage, and follow language-specific guidance. Treat zeroization claims realistically and prioritize limiting exposure.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
