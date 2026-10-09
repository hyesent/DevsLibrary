---
title: Flex Container Properties
order: 20
book: css
---

# Flex Container Properties

Flex containers provide controls for direction, wrapping, alignment, distribution, and gaps. These properties describe how the container manages its children.

## The mental model

The main container properties are `flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `align-items`, `align-content`, and `gap`. Use `gap` for space between flex items rather than relying on child margins where possible.

## In practice

```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
  align-items: center;
}
```

Wrapping changes the problem: there may now be multiple flex lines, which is where `align-content` becomes relevant. Do not reach for it when you only have one line.

## Common mistakes

- Using `align-content` on a single flex line
- Forgetting wrapping can create multiple lines
- Mixing gap and arbitrary margins without a reason
- Choosing `space-between` when a consistent gap is intended

## Practice

Build a responsive action row that wraps onto multiple lines when necessary. Test it at narrow widths and explain which property controls each behavior.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
