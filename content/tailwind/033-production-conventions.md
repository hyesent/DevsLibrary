---
title: "Production conventions"
order: 33
book: "tailwind"
---

# Production conventions

A production Tailwind codebase needs conventions because utility-first styling makes many combinations possible.

Decide how theme tokens are named, how component variants are represented, when arbitrary values are acceptable, where custom CSS lives, and how conditional class composition is organized.

Avoid accidentally creating a second CSS framework. If every component requires a private helper, custom wrapper, and undocumented class convention, the utility vocabulary becomes harder to understand.

Also avoid the opposite extreme of refusing every abstraction. Repeated interactive patterns, stable design primitives, and product-level components deserve meaningful boundaries.

Code review should ask:

- Is this value a token or an exception?
- Is this class combination a component pattern?
- Is the dynamic class discoverable?
- Does the responsive behavior follow content constraints?
- Does the component preserve accessibility?
- Is custom CSS clearer here?

The objective is not to maximize Tailwind. It is to keep the styling architecture understandable as the application grows.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
