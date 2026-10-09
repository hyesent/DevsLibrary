---
title: "Color and semantic tokens"
order: 16
book: "tailwind"
---

# Color and semantic tokens

Color becomes maintainable when it represents meaning. A product may have semantic roles such as surface, primary text, muted text, primary action, success, warning, and danger.

Tailwind v4's theme system uses CSS variables in namespaces such as `--color-*`. Defining a theme token can make corresponding utility APIs available. This allows the visual vocabulary to live in the theme rather than inside every component.

Semantic tokens are especially useful for dark mode. A component should not need to know that the light theme uses one particular gray and the dark theme uses another. It should consume the semantic role.

Contrast is part of the design decision. A muted color that looks attractive can become unreadable against a particular surface. Interactive states also need sufficient distinction.

Opacity can complicate contrast because the final color depends on what is underneath. Always evaluate the rendered result.

A useful architecture is:

raw value → semantic token → component variant → rendered color.

The component should communicate what a color means. The theme should decide what that meaning looks like. This makes redesign and theme changes much cheaper.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
