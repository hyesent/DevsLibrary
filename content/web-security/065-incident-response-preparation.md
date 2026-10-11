---
title: "Incident Response Preparation"
order: 65
book: "web-security"
---

## Mental model

Prepare roles, escalation paths, communication channels, decision authority, asset inventories, dependency maps, backup procedures, and credential-revocation access before an incident. Responders must not depend entirely on a potentially compromised identity system.

## Failure modes and design choices

Create playbooks for leaked keys, account takeover, suspicious exports, compromised dependencies, public storage exposure, and suspected breaches. Preserve useful evidence while minimizing sensitive collection. Practice with tabletop exercises.

## Verification and engineering practice

Measure how quickly the team can identify affected systems, revoke access, preserve evidence, and communicate accurately.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
