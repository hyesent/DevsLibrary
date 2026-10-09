---
title: CSS Custom Properties
order: 30
book: css
---

# CSS Custom Properties

Custom properties, commonly called CSS variables, store reusable values that participate in the cascade and can change at runtime.

## The mental model

Unlike preprocessor variables, custom properties exist in the browser and follow CSS inheritance and cascade rules. That makes them useful for themes, component configuration, spacing scales, and stateful styling.

## In practice

```css
:root {
  --space-4: 1rem;
  --radius-card: 1rem;
  --color-accent: #2563eb;
}

.card {
  padding: var(--space-4);
  border-radius: var(--radius-card);
}
```

A custom property is itself a CSS value. Because it participates in inheritance, you can also override it on a component subtree.

## Common mistakes

- Thinking variables are just text substitution
- Creating variables for every single value
- Using unclear names such as `--blue-2` instead of semantic roles
- Forgetting fallback values when a custom property may be undefined

## Practice

Create a semantic token layer for color, spacing, radius, and typography. Override one token inside a component and observe how its descendants change.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
