---
title: Grid Tracks and Fractional Units
order: 24
book: css
---

# Grid Tracks and Fractional Units

Grid tracks are rows and columns. Functions such as `fr`, `minmax()`, `repeat()`, and `auto-fit` make grids flexible instead of rigid.

## The mental model

The `fr` unit represents a share of available grid space. `minmax()` gives a track lower and upper bounds. `repeat()` removes repetitive declarations. Together they allow a grid to respond to available width while respecting content constraints.

## In practice

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
```

This says: create as many columns as fit, but do not let a card track become narrower than 16rem. The browser decides how many columns are possible at a given width.

## Common mistakes

- Using fixed column counts everywhere
- Making cards too narrow to read
- Confusing `auto-fit` and `auto-fill` without testing
- Ignoring minimum content sizes

## Practice

Build a responsive card grid with `repeat()`, `minmax()`, and `auto-fit`. Resize the viewport slowly and observe when the number of columns changes.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
