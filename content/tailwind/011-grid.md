---
title: "Grid"
order: 11
book: "tailwind"
---

# Grid

CSS Grid models two-dimensional layout. The key concepts are tracks, gaps, placement, and the relationship between explicit and implicit grid structure.

A utility such as `grid-cols-3` describes a three-column track structure. Gap utilities define separation. Placement utilities can control where an item starts and ends.

Grid is particularly useful when the layout itself is the design: dashboards, card matrices, galleries, and page shells often benefit from explicit rows and columns.

Responsive Grid should be based on content constraints. A card grid might begin as one column and gain columns as cards have enough room to remain readable. The exact breakpoint is a consequence of minimum useful card width.

Intrinsic sizing becomes important when grids need to adapt to content. Fixed track sizes can cause overflow. Flexible tracks and minimum constraints can produce more resilient layouts. Tailwind supports arbitrary values for cases where the standard vocabulary is not sufficient.

The important comparison is not "Grid versus Flexbox as competing frameworks." They are different layout models. Flexbox generally distributes content along one axis; Grid establishes a two-dimensional layout space.

When you can describe the rows, columns, and placement relationships in plain language, the Tailwind implementation becomes much easier to derive.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
