---
title: Colors
order: 9
book: css
---

# Colors

CSS color values let you define foregrounds, backgrounds, borders, gradients, and effects. Good color systems also account for contrast, states, and themes.

## The mental model

CSS supports named colors, hexadecimal notation, functional color formats, alpha transparency, and modern color spaces. The important architectural idea is to avoid scattering arbitrary colors throughout a project. Give recurring colors roles such as surface, text, muted text, accent, and danger.

## In practice

```css
:root {
  --color-text: #1f2937;
  --color-muted: #64748b;
  --color-surface: #ffffff;
  --color-accent: #2563eb;
}
```

Then use those roles rather than repeating raw values. This turns a collection of colors into a system that can later support themes.

## Common mistakes

- Choosing colors only because they look attractive
- Ignoring text/background contrast
- Repeating the same hex value dozens of times
- Using opacity on text when a proper color would be clearer

## Practice

Create a five-color semantic palette for a small interface. Use it for text, surfaces, borders, links, and an error state without repeating raw colors unnecessarily.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
