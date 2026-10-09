---
title: Inheritance
order: 7
book: css
---

# Inheritance

Some CSS properties naturally pass their computed values from a parent to descendants. Inheritance is why setting a font on the body can affect an entire document.

## The mental model

Inheritance is a relationship between an element and its descendants. Text-related properties such as `color` and `font-family` commonly inherit. Box-model properties such as `margin` and `padding` generally do not. Each property defines its own inheritance behavior.

## In practice

```css
body {
  color: #222;
  font-family: system-ui, sans-serif;
}
```

A paragraph inside the body can inherit both values without declaring them itself. This makes global typography practical, but it also means a component can accidentally receive a value from far above it.

## Common mistakes

- Assuming every property inherits
- Adding duplicate declarations to every descendant
- Forgetting inherited values when debugging
- Using inheritance to communicate component-specific layout

## Practice

Set typography on `body`, then create a nested card. Override only one inherited property inside the card and inspect the computed styles of several descendants.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
