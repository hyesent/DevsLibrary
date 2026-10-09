---
title: "Extracting components"
order: 22
book: "tailwind"
---

# Extracting components

Utility-first CSS makes repetition visible, but repetition does not automatically mean a component should be extracted.

A useful component represents a stable unit of meaning, behavior, or structure. A button is a strong example because it has semantics, interaction states, accessibility behavior, and recurring visual variants.

A component should expose product concepts such as `variant`, `size`, or `loading`, rather than implementation details such as `borderWidth=2` or `blue=true`.

This creates a hierarchy:

```text
utilities → tokens → component variants → product components → pages
```

Each layer adds meaning.

Avoid extracting a component whose only purpose is to hide a long class string. That can make the CSS harder to inspect while adding a new abstraction with little value.

Conversely, avoid duplicating a complex interactive pattern merely because the class list is easy to copy. Behavioral consistency is one of the strongest reasons to create a component.

The right question is not "is this repeated?" but "is there a stable concept here that deserves a name and contract?".

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
