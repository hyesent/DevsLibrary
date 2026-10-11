---
title: "Security and Adversarial Thinking"
order: 25
book: "problem-solving"
---

Ordinary problem solving often assumes inputs are cooperative. Security requires asking what happens when someone intentionally chooses inputs, timing, identities, or sequences that exploit the system's assumptions.

Identify assets, trust boundaries, actors, and possible abuse. A username is not proof of identity. A hidden button is not authorization. A client-side validation rule is not a server-side guarantee. A request can be forged, repeated, reordered, delayed, or sent with fields the interface never exposes.

Think about abuse at multiple levels:
- **Input:** malformed, oversized, or ambiguous data.
- **Identity:** spoofed or stolen credentials.
- **Authorization:** access to another user's object or action.
- **State:** replayed requests, race conditions, duplicate processing.
- **Resources:** expensive queries, unbounded recursion, huge uploads.
- **Information:** secrets in logs, error messages, URLs, or timing.
- **Dependencies:** compromised packages, unsafe configuration, unavailable services.

The correct defense depends on the threat model. Rate limits may reduce abuse but do not replace authorization. Encryption protects data in transit or at rest under particular threat assumptions, but does not stop an authorized application from leaking decrypted data. Input validation reduces malformed states but does not automatically prevent injection if values are later interpreted as code.

Use least privilege, safe defaults, bounded resource consumption, explicit authorization checks, and auditable state changes. Test with adversarial cases and ask whether security properties still hold under concurrency and partial failure.

**Practice:** Threat-model a “share document by link” feature. Include guessable identifiers, link forwarding, revocation, logging, expiry, and permission changes.

**Connection:** Adversarial reasoning is foundational to web security, cryptography, API design, and reliable distributed workflows.
