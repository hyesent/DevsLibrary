---
title: CSS Performance and Maintainability
order: 47
book: css
---

# CSS Performance and Maintainability

CSS performance is usually about avoiding unnecessary work and complexity, while maintainability is about making the next change predictable.

## The mental model

Modern browsers are very good at handling CSS, so do not optimize imaginary bottlenecks. Focus first on reducing unnecessary DOM complexity, excessive selector complexity, huge visual effects, accidental layout thrashing from JavaScript, and duplicated styles.

## In practice

A maintainable stylesheet usually has:

- clear component boundaries
- predictable cascade
- reusable tokens
- shallow selectors
- minimal overrides
- responsive rules based on content
- accessible states

Performance and maintainability often reinforce each other because simpler styling systems are easier to inspect and change.

## Common mistakes

- Micro-optimizing every selector
- Prematurely removing useful abstractions
- Duplicating CSS instead of creating a clear reusable pattern
- Ignoring expensive visual effects simply because they look impressive

## Practice

Review one of your earlier CSS exercises. Remove unnecessary declarations, simplify selectors, and explain every remaining rule as a responsibility.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
