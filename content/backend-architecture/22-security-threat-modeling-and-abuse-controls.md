# Lesson 22: Threat Modeling, Rate Limits, and Abuse Resistance

**Track:** Security

## Learning objectives
- Threat-model an endpoint before release
- Apply layered abuse controls
- Design rate limiting without harming legitimate users

## Lesson
### Threat modeling is a practical design exercise

Identify assets, actors, trust boundaries, entry points, and plausible abuse cases. A simple diagram of browser, edge function, database, and payment provider can reveal where tokens cross boundaries and where untrusted input enters. Ask what an attacker can control, what authority each component has, and what happens if a component is compromised.

Threat modeling is not a guarantee that every attack is known. It is a structured way to surface high-impact assumptions before implementation and to prioritize controls according to likelihood and harm.

### Rate limiting and quotas

Rate limiting protects shared capacity and limits abuse. A policy might limit login attempts by account and network source, public API reads by key, or expensive exports by tenant. A single IP-only limit can punish users behind shared networks and be bypassed by distributed attackers. A single account-only limit can be abused to lock out a victim. Combine signals thoughtfully and provide safe recovery paths.

Distributed edge deployments complicate exact global counters. A per-region counter may allow more requests than the nominal global limit; a globally consistent counter may add latency and cost. Decide whether the limit is a strict security control or a best-effort capacity guard, and choose the mechanism accordingly.

### Input, output, and resource limits

Validate length, format, and allowed values. Bound JSON body size, pagination, upload size, regex complexity, and expensive query parameters. Apply timeouts to parsers and remote calls. Resource exhaustion often comes from valid-looking inputs that trigger disproportionate work, not only from malformed strings.

Escape or encode output according to its context. SQL parameterization does not prevent HTML injection; HTML escaping does not make a value safe in a shell command. Use context-appropriate APIs and avoid building commands or queries by concatenating untrusted input.

### Abuse controls at multiple layers

Use gateway limits for broad traffic shaping, application-level quotas for business rules, database constraints for invariants, and provider controls for external services. Add bot or challenge mechanisms only where they solve a measured abuse problem and do not create unnecessary accessibility barriers. Monitor false positives and give legitimate users a path to recover.

A rate-limit response should be predictable, often including a suitable status and retry guidance. Do not reveal internal thresholds or sensitive detection logic if that would help attackers bypass controls.

### Incident preparation

Prepare a way to disable a vulnerable endpoint or expensive feature without redeploying the whole system. Keep emergency controls audited and time-limited. Define how to rotate compromised credentials, revoke sessions, block abusive keys, and preserve evidence. After an incident, update the threat model and regression tests instead of relying only on a one-time patch.

## Worked example

An export endpoint has a per-tenant daily quota, a maximum date range, a bounded queue concurrency, and a role check. The gateway also applies a broad request-rate limit. This layered policy protects capacity without relying on a single IP address to identify every abusive actor.

## Exercises

1. Threat-model a password-reset endpoint.
2. Explain why per-IP rate limiting is insufficient by itself.
3. List four resource limits that protect an API from disproportionate work.

## Solution notes

Consider account enumeration, token guessing, email abuse, replay, and unauthorized reset. Shared networks and distributed sources defeat IP-only limits. Body size, page size, date range, query complexity, upload size, and execution time are valid examples.

## Review checklist

- Can I explain: threat-model an endpoint before release?
- Can I explain: apply layered abuse controls?
- Can I explain: design rate limiting without harming legitimate users?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
