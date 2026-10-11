---
title: "SQL Injection and Parameterized Queries"
order: 24
book: "web-security"
---

## Mental model

SQL injection happens when data is interpreted as SQL syntax. Bind values through parameterized queries or safe database APIs instead of concatenating strings. Parameters usually represent values, not table or column identifiers; dynamic identifiers need strict allowlists and supported quoting.

## Failure modes and design choices

ORMs can reintroduce risk through raw query methods, unsafe fragments, and dynamic conditions. Use least-privilege database accounts and separate migration credentials from runtime identities. Hide internal SQL details from public errors.

## Verification and engineering practice

Review generated queries and test malformed values. Parameterization protects SQL grammar, but does not replace authorization, validation, or data minimization.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
