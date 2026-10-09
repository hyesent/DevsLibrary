---
title: Borders, Radius, Shadows, and Visual Surfaces
order: 14
book: css
---

# Borders, Radius, Shadows, and Visual Surfaces

Borders, rounded corners, and shadows describe surfaces and boundaries. They should reinforce structure rather than become random decoration.

## The mental model

A border occupies space in the box model. A border radius rounds corners without changing the semantic structure. Shadows are painted effects that generally do not consume layout space. This distinction matters when diagnosing dimensions and overlap.

## In practice

```css
.card {
  border: 1px solid #dbe2ea;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.08);
}
```

Use subtle visual hierarchy: a surface, a boundary, and perhaps a shadow can communicate elevation. More effects do not automatically create better design.

## Common mistakes

- Expecting shadows to create layout space
- Using heavy shadows everywhere
- Forgetting that borders affect dimensions under content-box sizing
- Using radius without considering the component’s visual language

## Practice

Design three surface levels: page background, card, and elevated dialog. Give each a clear visual distinction using only borders, radius, and shadows.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
