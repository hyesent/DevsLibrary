---
title: Flex Items: grow, shrink, and basis
order: 21
book: css
---

# Flex Items: grow, shrink, and basis

Flex items can negotiate available space using `flex-grow`, `flex-shrink`, and `flex-basis`. The shorthand `flex` packages these ideas.

## The mental model

Flexbox does not simply place fixed-width children side by side. It calculates available space and distributes it according to item constraints. `flex-basis` establishes the starting main-size contribution; grow and shrink determine how items react to free or insufficient space.

## In practice

```css
.sidebar { flex: 0 0 16rem; }
.content { flex: 1 1 auto; }
```

Here the sidebar is effectively fixed at 16rem while the content takes remaining space and can participate in shrink calculations. Understanding the three components makes shorthand much less mysterious.

## Common mistakes

- Treating `flex: 1` as magic
- Using width and flex-basis without understanding their interaction
- Forgetting shrink behavior causes unexpected compression
- Giving every child `flex: 1` when unequal roles are intended

## Practice

Build a two-column layout with a fixed-ish sidebar and flexible main content. Resize the viewport until the columns become constrained and inspect the computed flex values.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
