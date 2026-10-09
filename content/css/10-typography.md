---
title: Typography
order: 10
book: css
---

# Typography

Typography controls how text communicates: family, size, weight, line height, spacing, alignment, and wrapping all affect readability and hierarchy.

## The mental model

Typography is not just making headings bigger. A readable system establishes relationships between text roles. `font-size`, `font-family`, `font-weight`, `line-height`, `letter-spacing`, and text-related properties work together.

## In practice

```css
body {
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.05;
}
```

Notice that line height is deliberately different for body text and a large heading. Typography should be tuned for the role of the text, not copied mechanically.

## Common mistakes

- Using very small body text
- Setting one line-height for every text role
- Choosing a font without checking fallback behavior
- Making hierarchy depend only on color

## Practice

Build a typography scale with body, small text, heading levels, and a lead paragraph. Resize the viewport and ensure the hierarchy still makes sense.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
