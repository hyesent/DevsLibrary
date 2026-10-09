---
title: CSS Functions
order: 31
book: css
---

# CSS Functions

CSS functions let you compute, transform, select, or derive values. They are one of the reasons modern CSS can express sophisticated responsive systems without JavaScript.

## The mental model

Important functions include `calc()`, `min()`, `max()`, `clamp()`, `var()`, color functions, and layout helpers such as `minmax()`. Functions compose: one function can often be used inside another.

## In practice

```css
.title {
  font-size: clamp(2rem, calc(1rem + 4vw), 5rem);
}

.panel {
  width: min(100% - 2rem, 70rem);
}
```

The goal is not clever math. The goal is to express a constraint directly in CSS.

## Common mistakes

- Writing unreadable mathematical expressions
- Using `calc()` when normal layout already solves the problem
- Forgetting units where CSS math requires compatible dimensions
- Using functions without testing minimum and maximum conditions

## Practice

Rewrite a fixed-width component into a fluid one using `min()`, `max()`, or `clamp()`. Explain the constraint in plain English before writing the expression.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
