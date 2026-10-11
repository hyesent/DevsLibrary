---
title: "Security Is a System Property"
order: 1
book: "web-security"
---

## Mental model

Security belongs to the whole system: browser, frontend, API, identity provider, database, storage, deployment, dependencies, operators, and users. A strong login does not protect a record if the API returns it to anyone who guesses its identifier. Think in terms of confidentiality, integrity, availability, authenticity, accountability, privacy, and recoverability.

## Failure modes and design choices

Treat controls as answers to specific threats. Encryption, for example, requires answers about which data, which keys, who can decrypt, and what happens after key compromise. Security has usability and operational costs; the goal is to reduce material risk to an explicit level, not claim zero risk.

## Verification and engineering practice

For each feature, name the protected asset, attacker capability, enforcement point, failure consequence, and test that proves the control works.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
