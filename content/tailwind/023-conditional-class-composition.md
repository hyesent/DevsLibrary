---
title: "Conditional class composition"
order: 23
book: "tailwind"
---

# Conditional class composition

Real applications need styles that change with state. A component may be primary or secondary, active or inactive, loading or ready.

A finite mapping from semantic state to complete class strings is a reliable pattern:

```js
const variants = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-white text-gray-900"
}
```

The important part is that the possible classes are complete and statically discoverable.

As components become more complex, helper functions or variant libraries can organize combinations. But abstraction should remain understandable. A styling helper that hides a large precedence system can become harder to debug than the original class list.

Component APIs should expose meaningful design dimensions. If a button has `size="sm"` and `variant="danger"`, those names communicate intent. A prop that exposes raw CSS implementation details couples callers to the current design.

Conditional styling should also remain deterministic. The same semantic inputs should produce the same class composition.

This creates a clean flow:

props/state → variant selection → complete classes → generated CSS.

The component controls the mapping; Tailwind controls the utility vocabulary.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
