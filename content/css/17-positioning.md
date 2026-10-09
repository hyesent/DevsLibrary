---
title: Positioning
order: 17
book: css
---

# Positioning

CSS positioning changes how an element is placed relative to its normal position, a containing block, or the viewport.

## The mental model

`relative` keeps an element in normal flow while establishing a reference for positioned descendants. `absolute` removes the element from normal flow and positions it against a containing block. `fixed` is tied to the viewport, while `sticky` behaves like normal flow until a scroll threshold is reached.

## In practice

```css
.card { position: relative; }
.card__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
```

The parent’s `position: relative` does not move it. It establishes the containing block that makes the badge’s coordinates meaningful.

## Common mistakes

- Using absolute positioning for primary page layout
- Forgetting which ancestor establishes the containing block
- Using `top` and `left` without understanding the reference box
- Expecting fixed elements to behave like normal flow

## Practice

Create a card with a corner badge using relative/absolute positioning. Then remove the parent’s positioning and inspect where the badge moves.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
