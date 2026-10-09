---
title: "Decorators and Function Wrapping"
order: 31
book: "python"
---

# Decorators and Function Wrapping

## Core model

A decorator transforms a function or class at definition time, often replacing the original name with a wrapper. Decorators are useful for cross-cutting behavior such as timing, authorization checks, caching, or registration, but they can obscure the actual call path if stacked without care.

## How it behaves in real code

A wrapper should usually accept `*args, **kwargs`, preserve metadata with `functools.wraps`, and define how exceptions and return values pass through. Order matters: `@a` above `@b` is conceptually `a(b(function))`, so changing order can change behavior.

## Reasoning exercise

Use decorators when the behavior is genuinely reusable and orthogonal to the function's main purpose. For complex policies, explicit composition or a class may be easier to inspect and test.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
