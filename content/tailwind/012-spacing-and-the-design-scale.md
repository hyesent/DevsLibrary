---
title: "Spacing and the design scale"
order: 12
book: "tailwind"
---

# Spacing and the design scale

Spacing is a structural system, not decoration. It controls relationships between content, controls, cards, and sections.

Padding creates space inside a box. Margin creates space outside it. Gap creates space between children in supported layout contexts. These differences matter because they communicate ownership.

For example, `gap-4` says the parent owns the relationship between its children. Individual margins on children make the relationship more distributed and can require first-child or last-child exceptions.

Tailwind's spacing scale gives projects a constrained vocabulary. Reusing that scale creates rhythm and reduces the number of arbitrary measurements developers must remember.

Spacing should also communicate hierarchy. A section-to-section gap can be larger than the gap between a label and its input. If every relationship uses the same spacing value, visual hierarchy weakens.

A repeated arbitrary value is worth investigating. It may be a genuine local exception, but it may also reveal a missing design token.

The deeper principle is that a design system should make common decisions cheap and unusual decisions visible. A constrained spacing vocabulary does that by making recurring relationships recognizable.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
