---
title: Stacking Context and z-index
order: 18
book: css
---

# Stacking Context and z-index

When elements overlap, CSS needs rules for painting order. `z-index` participates in stacking contexts; it is not a universal “bring this to the front” button.

## The mental model

An element can belong to a stacking context created by certain positioning and rendering conditions. A child with a huge `z-index` cannot necessarily escape its parent stacking context and leap above everything else.

## In practice

```css
.modal {
  position: fixed;
  z-index: 100;
}
.tooltip {
  position: absolute;
  z-index: 10;
}
```

If a tooltip is trapped inside a lower stacking context, changing `z-index: 999999` on the tooltip may not solve the problem. Inspect the ancestor stacking contexts instead.

## Common mistakes

- Using giant z-index numbers randomly
- Assuming z-index compares every element globally
- Ignoring transforms and other stacking-context triggers
- Trying to fix a layout problem with z-index

## Practice

Create overlapping header, dropdown, and modal layers. Give each a deliberate stacking strategy and document why each layer is above or below another.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
