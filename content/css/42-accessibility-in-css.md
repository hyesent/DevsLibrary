---
title: Accessibility in CSS
order: 42
book: css
---

# Accessibility in CSS

CSS can either support or undermine accessibility. Visual clarity, focus indicators, contrast, motion, text scaling, and responsive behavior all matter.

## The mental model

Accessibility is not an HTML-only topic. CSS must preserve keyboard focus visibility, readable contrast, usable target sizes, responsive content, and understandable states. Avoid hiding meaningful content with CSS unless you understand the accessibility consequences.

## In practice

```css
.button:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto;
    animation-duration: 0.01ms;
    transition-duration: 0.01ms;
  }
}
```

CSS should make the semantic HTML you already learned easier to perceive and operate.

## Common mistakes

- Removing outlines because they look ugly
- Using color as the only state indicator
- Preventing text from resizing comfortably
- Hiding content visually without considering its purpose

## Practice

Audit a small interface using keyboard navigation, zoom, reduced motion, and a high-contrast mindset. Fix at least three CSS accessibility issues.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
