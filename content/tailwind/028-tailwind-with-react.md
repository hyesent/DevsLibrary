---
title: "Tailwind with React"
order: 28
book: "tailwind"
---

# Tailwind with React

React owns component structure and application behavior. Tailwind owns presentation.

A React component can receive semantic props and map them to known class combinations. Responsive behavior should usually remain in CSS rather than being implemented by JavaScript viewport checks.

For example, if a navigation layout becomes vertical below a threshold, CSS should handle that. React does not need to measure the viewport just to choose `flex-col`.

React should own things such as menu open state, selected tabs, loading state, fetched data, and form submission. Tailwind should express how those states look.

The architecture is:

```text
React state/props
      ↓
semantic component state
      ↓
class composition
      ↓
Tailwind variants
      ↓
CSS
      ↓
browser
```

Keeping those boundaries clear makes components easier to test, server-render, and reason about.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
