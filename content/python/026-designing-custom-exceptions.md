---
title: "Designing Custom Exceptions"
order: 26
book: "python"
---

# Designing Custom Exceptions

## Core model

Custom exception classes give callers a stable way to distinguish meaningful failure categories. For example, `PaymentDeclined` communicates a domain outcome differently from `TimeoutError` or a malformed response. Exception types become part of the interface between layers.

## How it behaves in real code

Keep the hierarchy useful rather than creating a class for every sentence in a log. Preserve the original cause with exception chaining when translating lower-level failures: `raise ServiceUnavailable(...) from exc`. That keeps diagnostic evidence while presenting a more appropriate abstraction to callers.

## Reasoning exercise

Decide which failures callers can recover from and make those categories explicit. Never expose secrets or raw credentials in exception messages, and do not confuse an error label with a recovery strategy.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
