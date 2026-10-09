---
title: Grid Mental Model
order: 23
book: css
---

# Grid Mental Model

CSS Grid is a two-dimensional layout system. It lets you reason about rows and columns together and explicitly place items into a grid.

## The mental model

A grid container defines tracks. Grid items can occupy one or more rows and columns. Unlike Flexbox, which primarily distributes along one axis, Grid gives you a coordinate-like system for two-dimensional relationships.

## In practice

```css
.dashboard {
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-rows: auto 1fr;
}
```

The first column can represent navigation while the second represents the main content area. The rows establish a header and remaining content region. This is a page architecture, not merely a card arrangement.

## Common mistakes

- Thinking Grid is just Flexbox with more syntax
- Using Grid without understanding tracks
- Hard-coding coordinates for content that should flow
- Creating a grid when a simple one-dimensional flex row is clearer

## Practice

Draw a 2-column, 3-row dashboard on paper first. Then express the same structure with CSS Grid and identify each track.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
