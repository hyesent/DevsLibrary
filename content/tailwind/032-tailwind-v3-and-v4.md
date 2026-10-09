---
title: "Tailwind v3 and v4"
order: 32
book: "tailwind"
---

# Tailwind v3 and v4

Version awareness is part of technical accuracy.

Many tutorials still describe Tailwind v3 patterns. Tailwind v4 introduced a CSS-first approach with directives including `@import "tailwindcss"`, `@theme`, `@source`, `@utility`, and `@custom-variant`.

Some legacy configuration remains relevant for migration, but old examples should not be copied into a current project without checking the current documentation.

The v4 upgrade guide also documents behavior changes such as the default border color becoming `currentColor` rather than the old default gray, and changes to how the `container` utility is customized.

This is an important general lesson: framework knowledge is versioned knowledge.

When reading a tutorial, identify the major version before treating its code as authoritative. When a behavior matters to architecture, prefer current official documentation.

For Hyetext, the textbook should teach current Tailwind behavior while explaining older patterns only when they are useful for understanding migrations.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
