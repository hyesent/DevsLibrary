---
title: "Source detection and dynamic classes"
order: 4
book: "tailwind"
---

# Source detection and dynamic classes

Tailwind's build process needs to recognize class candidates before it can generate their CSS. This creates a direct relationship between code architecture and stylesheet generation.

A common failure is constructing classes from fragments:

```js
`bg-${color}-500`
```

At runtime this might produce `bg-red-500`, but a build-time scanner may not know every possible value of `color`. If the candidate was not generated, the browser has no CSS rule to apply.

The robust pattern is to map finite application states to complete class strings:

```js
const colors = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500"
}
```

The runtime still chooses dynamically, but the complete candidates exist in source.

This is more than a Tailwind trick. It teaches a general architectural distinction: a build tool operates before runtime data exists. A production system must make build-time dependencies explicit.

Tailwind provides `@source` for source locations that automatic detection does not cover, such as shared component packages. But explicit source registration should solve a source-location problem, not compensate for arbitrary class construction.

When a class is missing, ask: Is the complete candidate present in source? Is the relevant source being scanned? Was the CSS generated? Is the stylesheet loaded? This four-step investigation is much more reliable than adding random utilities.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
