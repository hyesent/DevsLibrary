---
title: Flexbox Mental Model
order: 19
book: css
---

# Flexbox Mental Model

Flexbox is a one-dimensional layout system. It lays children along a main axis while allowing control over alignment on the cross axis.

## The mental model

The parent becomes a flex container; its direct children become flex items. `flex-direction` defines the main axis. `justify-content` distributes along the main axis, while `align-items` controls the cross axis. This distinction is the heart of Flexbox.

## In practice

```css
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

If the direction is row, `justify-content` works horizontally and `align-items` vertically. If the direction changes to column, their physical directions change too. Think in axes, not “horizontal property” and “vertical property.”

## Common mistakes

- Memorizing justify = horizontal
- Using margins for every alignment problem
- Forgetting flex direction changes the axes
- Expecting Flexbox to solve two-dimensional page grids

## Practice

Create a toolbar with a logo, navigation, and action button. Change the flex direction and predict what each alignment property now controls.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
