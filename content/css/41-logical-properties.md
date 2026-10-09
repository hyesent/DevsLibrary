---
title: Logical Properties
order: 41
book: css
---

# Logical Properties

Logical properties express layout in terms of writing direction rather than physical left/right/top/bottom directions.

## The mental model

Properties such as `margin-inline`, `padding-block`, `inset-inline-start`, and `border-inline` make CSS more adaptable to different writing modes and directions. Even in left-to-right projects, logical properties often communicate layout intent more clearly.

## In practice

```css
.card {
  margin-inline: auto;
  padding-block: 1rem;
  padding-inline: 1.5rem;
}
```

Instead of saying “left and right,” the code says “inline axis.” Instead of “top and bottom,” it says “block axis.” That abstraction becomes valuable when writing direction changes.

## Common mistakes

- Replacing every physical property mechanically
- Forgetting that logical directions depend on writing mode
- Using logical properties without understanding axes
- Mixing physical and logical properties inconsistently

## Practice

Refactor a component that uses left/right and top/bottom spacing into logical properties. Identify which declarations express intent more clearly afterward.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
