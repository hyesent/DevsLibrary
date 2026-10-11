---
title: "Testing cryptographic integrations"
order: 56
book: "cryptography-fundamentals"
---

# Testing cryptographic integrations

## Mental model

Testing can validate framing, invalid-input handling, nonce persistence, rotation, interoperability, and failure behavior. It cannot prove cryptographic security simply by passing a large set of examples.

## Failure modes and design choices

Known-answer tests catch implementation mismatches; they do not replace review of the protocol and its assumptions.

## Verification and engineering practice

Use official test vectors, property-based tests, fuzzing of parsers, cross-implementation interoperability tests, and fault injection for key-service outages. Keep test keys separate from production and ensure tests do not log secrets.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
