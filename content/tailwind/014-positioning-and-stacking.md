---
title: "Positioning and stacking"
order: 14
book: "tailwind"
---

# Positioning and stacking

Positioning changes how an element relates to normal document flow.

`relative` normally keeps an element in flow while establishing a useful containing block for positioned descendants. `absolute` removes the element from normal flow and positions it relative to an appropriate containing block. `fixed` attaches an element to the viewport or relevant fixed positioning context. `sticky` combines normal flow with a scroll threshold.

This makes positioning ideal for badges, overlays, icons inside controls, sticky navigation, and floating actions. It is usually a poor foundation for an entire page layout that could be expressed with Flexbox or Grid.

Stacking is a separate problem. A `z-*` utility changes stacking order within the relevant stacking-context rules, but a larger number does not automatically escape every stacking context. Transforms, opacity, and other CSS features can create new contexts.

When an overlay appears behind something, inspect the containing block and stacking-context hierarchy before increasing z-index values.

A reliable debugging sequence is:

1. What establishes the containing block?
2. Is the element in normal flow?
3. What are its positioning offsets?
4. Which stacking context contains it?
5. Which element paints above it?

This turns "z-index is broken" into a concrete CSS investigation.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
