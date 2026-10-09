---
title: "Security: Trust Boundaries and Input Validation"
order: 46
book: "python"
---

# Security: Trust Boundaries and Input Validation

## Core model

Data becomes untrusted when it crosses a boundary: HTTP request, file upload, environment variable, database row, message queue, or third-party API. Validation should establish the shape and constraints required by the next layer. Escaping, parameterization, authorization, and validation solve different security problems and cannot substitute for one another.

## How it behaves in real code

Avoid `eval` and unsafe deserialization for untrusted data. Use allowlists for accepted formats where possible, enforce size limits before expensive processing, and check authorization at the resource/action boundary—not merely whether the caller is logged in. Errors should not reveal stack traces, secrets, or internal infrastructure to public clients.

## Reasoning exercise

Draw the trust boundary around every input. For each value, specify its accepted type, size, format, authority, and allowed effect before it reaches sensitive operations.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
