---
title: box-sizing and Sizing
order: 12
book: css
---

# box-sizing and Sizing

`box-sizing` changes how CSS interprets declared dimensions. Combined with min/max constraints, it gives you predictable component sizing.

## The mental model

With `border-box`, declared width and height include padding and border. This usually makes component sizing easier to reason about. `min-width`, `max-width`, `min-height`, and `max-height` let you define boundaries instead of forcing rigid dimensions.

## In practice

```css
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 100%;
  max-width: 32rem;
  min-height: 12rem;
}
```

A robust layout often says “fit within these limits” rather than “be exactly this many pixels.”

## Common mistakes

- Giving everything a fixed width and height
- Using `height: 100%` without understanding the containing block
- Forgetting `box-sizing` when calculating dimensions
- Using min/max constraints without testing content extremes

## Practice

Make a card fluid up to a maximum width. Add enough text to test what happens when content becomes taller than expected.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
