---
title: "Capstone: cryptographic architecture review"
order: 64
book: "cryptography-fundamentals"
---

# Capstone: cryptographic architecture review

## Mental model

Review a fictional application that stores user documents, authenticates users, sends webhooks, and operates multiple backend services. Map every cryptographic operation to a security property, key owner, threat, and failure path.

## Failure modes and design choices

The goal is not to maximize the number of algorithms. It is to make each security claim explicit, justified, testable, and maintainable.

## Verification and engineering practice

Deliver a data-flow diagram, threat model, algorithm and key inventory, nonce policy, password storage plan, TLS policy, rotation runbook, recovery test, and prioritized findings. For each recommendation, state the attack it prevents and the assumptions it needs.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
