---
title: Naming and Component Boundaries
order: 45
book: css
---

# Naming and Component Boundaries

Class names are part of the architecture. They should communicate what a piece of markup represents without encoding fragile visual accidents.

## The mental model

Names such as `.card`, `.card__title`, and `.card--featured` communicate a component and its variations. You do not have to follow one naming methodology exactly, but consistency matters more than fashionable syntax.

## In practice

```html
<article class="card card--featured">
  <h2 class="card__title">Project</h2>
</article>
```

```css
.card { ... }
.card__title { ... }
.card--featured { ... }
```

The class names describe the role. Avoid names like `.blue-box` when the same component could become green in another theme.

## Common mistakes

- Naming by current color or position
- Making classes encode the entire DOM path
- Creating one-off classes for every tiny visual change
- Mixing naming conventions without a reason

## Practice

Rename a set of appearance-based classes into role-based component names. Then change the component’s colors without renaming anything.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
