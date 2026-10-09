---
title: Container Queries
order: 29
book: css
---

# Container Queries

Container queries let a component respond to the size of the container it lives in rather than the viewport as a whole.

## The mental model

This is especially powerful for reusable components. A card may appear in a wide dashboard column or a narrow sidebar. Its ideal layout depends on its available container width, not necessarily the window width.

## In practice

```css
.cards { container-type: inline-size; }

@container (min-width: 40rem) {
  .card {
    display: grid;
    grid-template-columns: 10rem 1fr;
  }
}
```

The component now reacts to its own context. This reduces the need for parent-specific breakpoint hacks.

## Common mistakes

- Using viewport media queries for every component
- Forgetting to establish a query container
- Assuming container queries replace all media queries
- Making component behavior depend on an unrelated page breakpoint

## Practice

Create a card component that changes from stacked to side-by-side when its container becomes wide enough. Place the same card in two differently sized containers.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
