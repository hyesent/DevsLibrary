---
title: "Dynamic data and styling boundaries"
order: 29
book: "tailwind"
---

# Dynamic data and styling boundaries

External data frequently determines presentation, but not every value should become a class name.

Finite categorical data maps well to known classes:

```js
const statusStyles = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800"
}
```

Continuous runtime data, such as a progress percentage or user-selected color, may be better represented with CSS custom properties.

The key distinction is between finite semantic states and arbitrary runtime values.

Known states can be represented as complete utility candidates and generated ahead of time. Continuous values can be passed through CSS variables when the browser should interpret them at runtime.

This separation also improves security and predictability. External strings should not casually become CSS class fragments.

The architecture is:

external data → validated semantic model → known presentation mapping or controlled CSS variable.

Do not allow the styling layer to become the place where unvalidated application data is interpreted.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
