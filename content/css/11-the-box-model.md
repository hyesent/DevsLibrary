---
title: The Box Model
order: 11
book: css
---

# The Box Model

Every ordinary element participates in a box model involving content, padding, border, and margin. Understanding these layers is essential to understanding CSS layout.

## The mental model

The content box contains the actual content. Padding adds internal space, border surrounds the padding, and margin creates space outside the border. These are different mechanisms with different visual and layout consequences.

## In practice

```css
.card {
  width: 300px;
  padding: 20px;
  border: 2px solid;
  margin: 24px;
}
```

With the default `content-box`, the declared width describes the content area. The rendered outer width becomes larger after padding and borders are added. This is one reason many projects use `box-sizing: border-box` globally.

## Common mistakes

- Thinking padding and margin are interchangeable
- Forgetting borders contribute to size
- Guessing dimensions instead of inspecting the box model
- Not understanding why an element is larger than its declared width

## Practice

Create a 300px-wide card with padding and a border. Measure it in DevTools, then switch between `content-box` and `border-box` and explain the difference.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
