---
title: CSS Capstone: Build a Responsive Design System
order: 52
book: css
---

# CSS Capstone: Build a Responsive Design System

The capstone combines the entire book: selectors, cascade, tokens, typography, box model, Flexbox, Grid, responsive design, accessibility, modern CSS, and debugging.

## The mental model

Do not treat the capstone as a final pile of CSS. Treat it as an architecture exercise. You should be able to explain why each major rule exists and predict what happens when the viewport or content changes.

## In practice

Your capstone should include:

- semantic page structure from the HTML book
- a token system with custom properties
- a responsive container
- typography hierarchy
- reusable card/button/form components
- Flexbox for one-dimensional relationships
- Grid for page or card layouts where appropriate
- at least one container query
- light/dark theme support
- keyboard-visible focus states
- reduced-motion support
- a responsive mobile layout
- a deliberate cascade strategy
- DevTools-tested edge cases

Then test:

1. very narrow viewport
2. very wide viewport
3. zoomed text
4. long content
5. keyboard navigation
6. reduced motion
7. light and dark themes
8. print preview

## Common mistakes

- Copying a screenshot instead of building a system
- Using a different one-off rule for every viewport
- Ignoring accessibility until the final minute
- Being unable to explain why a layout mechanism was chosen

## Practice

Build the capstone as if another developer will maintain it six months from now. When finished, explain the architecture: what HTML owns, what CSS owns, which layout system each region uses, and how the cascade is controlled.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
