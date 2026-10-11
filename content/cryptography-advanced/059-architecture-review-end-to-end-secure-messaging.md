---
title: "Architecture review: end-to-end secure messaging"
order: 59
book: "cryptography-advanced"
---

# Architecture review: end-to-end secure messaging

## Core model and mechanics

A secure messaging design must combine authenticated key agreement, identity verification, message encryption, replay handling, multi-device enrollment, group membership updates, key changes, backups, and metadata policy. Each feature introduces protocol state and trust decisions.

## Analysis and design choices

Adding a web backup or device-sync feature can change the end-to-end security claim even if the message encryption primitive remains unchanged.

## Engineering, research, and verification

Draw initial enrollment, normal send/receive, device addition, device removal, key change, offline delivery, group updates, and account recovery. Identify what servers can see, what users verify, and how stale or duplicated messages are handled.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
