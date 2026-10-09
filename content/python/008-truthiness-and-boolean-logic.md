---
title: "Truthiness and Boolean Logic"
order: 8
book: "python"
---

# Truthiness and Boolean Logic

## Core model

Conditions in Python use truth-value testing, not only literal `True` or `False`. `None`, `False`, numeric zero, and empty built-in containers are falsy; most other objects are truthy unless their type defines otherwise. `and` and `or` return operands, not necessarily Boolean values.

## How it behaves in real code

`items or default_items` selects the default for an empty list as well as for `None`. That is correct only when emptiness means “no usable value.” If an empty list is a valid explicit choice, test `items is None` instead. Truthiness is concise, but it encodes a semantic decision.

## Reasoning exercise

For every conditional, state what counts as absent, empty, invalid, or false. These states are often different in domain logic even if a compact truthiness expression groups them together.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
