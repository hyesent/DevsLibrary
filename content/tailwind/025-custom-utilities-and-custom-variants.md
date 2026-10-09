---
title: "Custom utilities and custom variants"
order: 25
book: "tailwind"
---

# Custom utilities and custom variants

Tailwind is extensible because real projects eventually need project-specific behavior.

The `@utility` directive lets you register custom utilities that participate in Tailwind's variant system. A simple example is a utility for a CSS property that the project wants to use repeatedly.

`@custom-variant` can define a reusable condition such as a data-attribute-based theme or application state. `@variant` can apply an existing variant inside custom CSS.

These features are valuable when they preserve a coherent styling vocabulary. They become harmful when every special case becomes a new abstraction.

`@apply` can reuse utility declarations inside custom CSS, but it should not be used as a reason to recreate a large traditional CSS architecture under a Tailwind label.

Use the simplest extension point that matches the problem:

built-in utility → theme token → custom utility/variant → ordinary CSS when necessary.

Frameworks should reduce friction, not become rules that prevent clear CSS from being written.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
