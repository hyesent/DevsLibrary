---
title: Cascade Layers
order: 40
book: css
---

# Cascade Layers

Cascade layers let you intentionally order groups of author styles, making large stylesheets easier to control without specificity wars.

## The mental model

You can establish layers such as reset, base, components, and utilities. Later layers can be designed to override earlier layers even when selectors have similar or lower specificity. This creates an explicit architecture for precedence.

## In practice

```css
@layer reset, base, components, utilities;

@layer base {
  body { margin: 0; }
}

@layer components {
  .card { padding: 1rem; }
}
```

The exact layer structure is a project decision. The important idea is that precedence becomes intentional rather than accidental.

## Common mistakes

- Creating layers without an actual precedence strategy
- Using utilities as a dumping ground
- Assuming layers eliminate the need to understand specificity
- Adding many layers that nobody can explain

## Practice

Create a four-layer stylesheet for a small project: reset, base, components, utilities. Introduce one conflict and predict which declaration wins.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
