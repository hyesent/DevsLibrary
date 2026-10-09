---
title: "Arbitrary values and exceptions"
order: 27
book: "tailwind"
---

# Arbitrary values and exceptions

Arbitrary values allow a Tailwind class to express a value outside the standard design vocabulary.

They are useful for legitimate exceptions: a precise grid track, a value coming from a CSS custom property, or a measurement that truly does not belong in the project's shared scale.

But arbitrary values should remain exceptions. If the codebase contains many unrelated spacing values, colors, radii, and font sizes, the design system has become difficult to reason about.

Use this decision process:

1. Does an existing token express the requirement?
2. If not, will the value recur?
3. If it recurs, should it become a theme token?
4. If it is genuinely local, is an arbitrary value clearer than custom CSS?

This makes exceptions intentional.

A mature styling system does not eliminate all one-off values. It makes one-off values recognizable and prevents them from silently becoming the project's new default vocabulary.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
