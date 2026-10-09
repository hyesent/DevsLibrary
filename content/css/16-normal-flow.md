---
title: Normal Flow
order: 16
book: css
---

# Normal Flow

Normal flow is the browser’s default layout behavior. Elements are placed according to the document order and formatting rules before you introduce specialized layout or positioning.

## The mental model

Normal flow is not a failure state to escape from. It is the foundation of resilient pages. Block elements stack, inline content forms lines, and surrounding content responds to the space an element occupies.

## In practice

```html
<main>
  <h1>Article</h1>
  <p>...</p>
  <p>...</p>
</main>
```

If the second paragraph grows from three lines to ten, normal flow naturally pushes everything below it. A layout that depends on fixed coordinates would have to compensate manually.

## Common mistakes

- Positioning everything manually
- Giving sections fixed heights to force a screenshot
- Assuming responsive design requires JavaScript
- Ignoring content-driven layout

## Practice

Build a page using only normal flow, width constraints, spacing, and typography. Then deliberately make one paragraph much longer and observe how the layout adapts.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
