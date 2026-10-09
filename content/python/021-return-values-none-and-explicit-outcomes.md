---
title: "Return Values, None, and Explicit Outcomes"
order: 21
book: "python"
---

# Return Values, None, and Explicit Outcomes

## Core model

A function without an explicit `return` returns `None`. `None` can mean “no result,” “not found,” or “intentionally absent,” but those meanings should be defined by the API. Returning a value and printing a value are different: printing communicates to an output stream, while returning gives the caller a result to compose with other logic.

## How it behaves in real code

If a function can succeed with an empty result, fail, or return a legitimate `None`, a single sentinel may be ambiguous. Depending on the domain, use exceptions, a tagged result type, or a distinct sentinel to make the outcome states explicit.

## Reasoning exercise

Design the result contract before implementing the body. A caller should be able to distinguish success, absence, and failure without parsing printed text or guessing from unrelated state.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
