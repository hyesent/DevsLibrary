---
title: "Comprehensions and Transformations"
order: 15
book: "python"
---

# Comprehensions and Transformations

## Core model

A comprehension constructs a collection by expressing an output value, an input iteration, and optional filters in one expression. It is especially readable for direct transformations such as `[user.name for user in users if user.active]`. It becomes less readable when several loops, conditions, and side effects are compressed together.

## How it behaves in real code

A list comprehension materializes all results immediately. A generator expression produces values lazily, which can reduce peak memory when the consumer can process items incrementally. Neither form should hide important side effects; comprehensions are strongest when they describe a transformation rather than an action sequence.

## Reasoning exercise

Read a comprehension from the source iterable through the filters to the produced value. If explaining it requires a long verbal detour, use a normal loop and give each operation a meaningful name.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
