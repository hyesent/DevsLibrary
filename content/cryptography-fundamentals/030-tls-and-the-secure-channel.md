---
title: "TLS and the secure channel"
order: 30
book: "cryptography-fundamentals"
---

# TLS and the secure channel

## Mental model

TLS negotiates cryptographic parameters, authenticates a server and sometimes a client, establishes traffic keys, and protects records in transit. Its security depends on protocol version, cipher-suite policy, certificate validation, downgrade protections, and correct endpoint configuration.

## Failure modes and design choices

Encryption in transit does not protect against malicious code already running in the browser or server, and it does not automatically secure data at rest.

## Verification and engineering practice

Use maintained TLS stacks and current secure defaults. Enforce HTTPS across the application, validate certificates, avoid obsolete protocol versions, and test redirects, mixed content, and proxy termination boundaries.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
