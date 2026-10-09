---
title: "Exceptions as a Failure Model"
order: 25
book: "python"
---

# Exceptions as a Failure Model

## Core model

Exceptions interrupt normal control flow and propagate up the call stack until handled. A `try` block should surround the operation whose failure the code can meaningfully respond to. Catching every exception and continuing often converts a clear failure into corrupted state or a misleading success.

## How it behaves in real code

Catch specific exceptions when you can recover, add context, or translate them into a domain-level error. Use `finally` or context managers for cleanup that must happen regardless of success. Do not use exceptions for ordinary branching when a direct condition expresses the expected case more clearly.

## Reasoning exercise

For every `except`, explain what recovery occurs and what invariant remains true afterward. If the code only logs and suppresses the error, verify that callers are allowed to proceed without the missing result.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
