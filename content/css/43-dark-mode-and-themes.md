---
title: Dark Mode and Themes
order: 43
book: css
---

# Dark Mode and Themes

Themes are easiest when visual decisions are represented as semantic tokens rather than scattered literal values.

## The mental model

A theme is a coordinated set of values. Custom properties make it possible to define a default theme and override tokens for another mode. The browser can also expose the user’s preferred color scheme through media queries.

## In practice

```css
:root {
  --surface: white;
  --text: #111827;
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface: #111827;
    --text: #f9fafb;
  }
}

body {
  background: var(--surface);
  color: var(--text);
}
```

The component does not need to know whether it is in light or dark mode. It consumes semantic tokens.

## Common mistakes

- Inverting every color mechanically
- Using literal colors inside components
- Ignoring borders and muted text when theming
- Choosing dark-mode colors without checking contrast

## Practice

Build light and dark semantic tokens for a card, page background, text, muted text, border, and accent. Test both modes.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
