---
title: "Theme variables and design tokens"
order: 24
book: "tailwind"
---

# Theme variables and design tokens

Tailwind v4's CSS-first theme model makes design tokens explicit.

Namespaces such as `--color-*`, `--font-*`, `--text-*`, `--font-weight-*`, `--tracking-*`, `--leading-*`, `--breakpoint-*`, `--container-*`, and `--spacing-*` connect theme variables to utility and variant APIs.

A token is a named reusable design decision. That is different from an arbitrary CSS variable created for one component.

For example:

```css
@theme {
  --color-brand-500: oklch(...);
  --font-display: "Inter", sans-serif;
}
```

The theme becomes the shared vocabulary from which utilities can be generated.

This supports a layered architecture:

```text
raw design values
      ↓
semantic/product tokens
      ↓
component variants
      ↓
page composition
```

Tokens should not contain business logic. They describe presentation.

If the same unusual color appears in five places, consider whether it deserves a token. If a value appears once because of a genuine local constraint, an arbitrary value may be clearer.

The goal is not maximum abstraction. The goal is stable named decisions where stability actually exists.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
