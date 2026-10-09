---
title: Grid Alignment and Gaps
order: 26
book: css
---

# Grid Alignment and Gaps

Grid provides alignment controls for the grid as a whole and for items inside their grid areas. Understanding the distinction prevents confusing results.

## The mental model

`gap` controls spacing between tracks. `justify-content` and `align-content` can distribute the grid inside its container when there is extra space. `justify-items` and `align-items` control item alignment within their grid areas.

## In practice

```css
.grid {
  display: grid;
  gap: 1rem;
  justify-items: stretch;
  align-items: start;
}
```

The question to ask is: “Am I moving the grid, or am I aligning the item inside its grid area?” Those are different operations.

## Common mistakes

- Using the wrong alignment level
- Replacing gap with arbitrary margins
- Expecting `align-content` to align text inside a card
- Applying every alignment property at once without a layout reason

## Practice

Create a grid of cards with different content heights. Experiment with `align-items: start`, `stretch`, and `center`, and describe what changes.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
