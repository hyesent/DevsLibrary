---
title: "Command, Template, and Expression Injection"
order: 25
book: "web-security"
---

## Mental model

Injection occurs when untrusted data becomes instructions in an interpreter. Shells, templates, expression evaluators, LDAP filters, NoSQL query builders, and document processors can share this failure pattern.

## Failure modes and design choices

Prefer direct library APIs over shell commands. If executing a program is required, pass structured arguments, use a fixed executable, validate expected values, and run with least privilege. Keep templates controlled by trusted developers and restrict helpers and execution capabilities. Avoid evaluating attacker-built source.

## Verification and engineering practice

Test the interpreter boundary and inspect the final command or expression. The durable defense is separating data from executable structure.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
