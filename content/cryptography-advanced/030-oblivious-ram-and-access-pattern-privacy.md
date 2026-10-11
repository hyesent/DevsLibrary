---
title: "Oblivious RAM and access-pattern privacy"
order: 30
book: "cryptography-advanced"
---

# Oblivious RAM and access-pattern privacy

## Core model and mechanics

Encryption hides values but often leaves visible which storage locations are accessed and when. Oblivious RAM attempts to make access patterns less informative by reshuffling and hiding access behavior, usually at substantial bandwidth and latency cost.

## Analysis and design choices

Encrypted storage can still reveal a user's behavior through repeated access to the same record or region.

## Engineering, research, and verification

Determine whether access-pattern leakage is truly in scope. If it is, assess the full ORAM protocol, client state, recursion, crash recovery, concurrency, and traffic patterns rather than encrypting disk blocks and assuming privacy.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
