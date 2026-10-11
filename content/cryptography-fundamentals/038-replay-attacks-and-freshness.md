---
title: "Replay attacks and freshness"
order: 38
book: "cryptography-fundamentals"
---

# Replay attacks and freshness

## Mental model

Replay attacks reuse a previously valid message, token, request, or signed command. Cryptographic integrity does not imply freshness: an old authenticated instruction can still be harmful if the receiver accepts it again.

## Failure modes and design choices

A timestamp alone may not prevent replay within its acceptance window, and a nonce is ineffective if the receiver never remembers used values.

## Verification and engineering practice

Use nonces, sequence numbers, timestamps with bounded skew, expiration, and server-side replay tracking as the protocol requires. Bind freshness data to the authenticated message and define retry semantics.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
