---
title: Grid Placement
order: 25
book: css
---

# Grid Placement

Grid placement lets you control where an item starts and how many tracks it spans. Named areas can make page layouts readable.

## The mental model

You can place items by line numbers, spans, or named areas. Line-based placement is precise; named areas can make an overall page structure almost read like a diagram.

## In practice

```css
.layout {
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-areas:
    "sidebar main";
}
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
```

The CSS now contains the architecture directly: sidebar beside main. This can be especially useful for larger page-level layouts.

## Common mistakes

- Using coordinates without understanding grid lines
- Creating unnecessarily complicated placement rules
- Forgetting that content can create implicit tracks
- Using named areas for tiny layouts where normal flow is clearer

## Practice

Create a desktop page with header, sidebar, main, and footer using named grid areas. Then change the mobile template so the sidebar moves above the main content.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
