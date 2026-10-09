---
title: "Accessibility and Tailwind"
order: 30
book: "tailwind"
---

# Accessibility and Tailwind

Accessibility begins with semantics and behavior. Tailwind can make accessible presentation easier, but it cannot make incorrect HTML accessible by itself.

Use real buttons for actions, real links for navigation, real form controls for input, and meaningful headings for document structure.

Tailwind is valuable for visible focus states, contrast, responsive layouts, reduced-motion preferences, and state styling. These should support the semantic layer.

Color must not be the sole carrier of meaning. An error needs text or another accessible signal. A selected item should expose its semantic state. A hidden label must remain programmatically associated with its control.

Focus indicators deserve special attention. Removing outlines without providing a strong alternative creates a keyboard usability failure.

Responsive layouts should also survive text enlargement and content expansion. A layout that only works at the default font size is not robust.

The correct order is:

semantic HTML → accessible behavior → meaningful state → Tailwind presentation.

Styling comes last in the accessibility chain.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
