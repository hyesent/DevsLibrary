---
title: "Case study: signed webhooks"
order: 61
book: "cryptography-fundamentals"
---

# Case study: signed webhooks

## Mental model

A webhook receiver must establish that the payload came from a holder of the signing secret, was not altered, and is fresh enough to accept. Parsing and business processing should happen only after signature verification succeeds.

## Failure modes and design choices

Parsing and reserializing JSON before verification can change the byte sequence and cause either false rejection or an unsafe custom verification scheme.

## Verification and engineering practice

Verify the signature over the provider-defined raw bytes, use constant-time comparison, check timestamp tolerance, and implement durable idempotency for event IDs. Follow provider rules for key rotation and retries.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
