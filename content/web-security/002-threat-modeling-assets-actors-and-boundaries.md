---
title: "Threat Modeling: Assets, Actors, and Boundaries"
order: 2
book: "web-security"
---

## Mental model

Inventory valuable assets—accounts, private records, payment actions, session tokens, signing keys, and availability. Identify anonymous visitors, ordinary users, tenant admins, compromised accounts, bots, insiders, and compromised dependencies. Draw data flows across browser, edge proxy, application, identity provider, database, object storage, queues, and third parties.

## Failure modes and design choices

Mark trust boundaries wherever data or authority crosses domains. Ask what input crosses each boundary, who controls it, which identity is asserted, and what is verified. Prioritize using impact, likelihood, exposure, and uncertainty; numerical risk scores help compare but are not objective truth.

## Verification and engineering practice

A useful threat model produces controls, owners, verification methods, and residual risks—not just a diagram. Revisit it whenever roles, data, integrations, or deployment paths change.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
