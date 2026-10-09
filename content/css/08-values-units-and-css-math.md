---
title: Values, Units, and CSS Math
order: 8
book: css
---

# Values, Units, and CSS Math

CSS values describe dimensions, colors, numbers, angles, times, functions, and more. Choosing the right unit is part of responsive design, not merely a syntax preference.

## The mental model

Absolute units such as `px` are useful for precise details. Relative units such as `rem`, `em`, `%`, `vw`, and `vh` express relationships. Modern CSS also provides functions such as `calc()`, `min()`, `max()`, and `clamp()` for controlled mathematical relationships.

## In practice

```css
.page {
  width: min(90%, 70rem);
  padding: clamp(1rem, 3vw, 3rem);
}
```

`min()` chooses the smaller value, `max()` chooses the larger value, and `clamp(min, preferred, max)` keeps a value within bounds. These functions let CSS express responsive behavior directly instead of requiring JavaScript for every adjustment.

## Common mistakes

- Using pixels for every dimension
- Confusing `em` with `rem`
- Treating percentages as automatically responsive
- Using `calc()` when a simpler value communicates the intent better

## Practice

Create a page container that is 92% wide on small screens but never exceeds 72rem, and give its padding a fluid-but-bounded value with `clamp()`.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
