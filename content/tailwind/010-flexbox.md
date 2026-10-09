---
title: "Flexbox"
order: 10
book: "tailwind"
---

# Flexbox

Flexbox is a one-dimensional layout model. Tailwind gives it a concise vocabulary, but the browser still applies the Flexbox algorithm.

The container has a main axis and a cross axis. `flex-row` or `flex-col` determines the main axis. `justify-*` distributes items along the main axis. `items-*` aligns them on the cross axis. `gap-*` creates space between items.

This explains a common confusion: in a row, `justify-center` is horizontal centering and `items-center` is vertical centering. Change the direction to a column and those physical directions change.

Flex items also participate in sizing. `grow`, `shrink`, basis, minimum sizes, and intrinsic content can all affect the final result. A header that works with short labels can overflow when one label becomes much longer.

Flexbox is excellent for toolbars, navigation rows, aligned controls, and components where content naturally determines one dimension.

If the design requires explicit two-dimensional placement, Grid is usually clearer. Do not use Flexbox because it is familiar; use it because its one-dimensional model matches the problem.

When debugging, identify the main axis, available free space, each item's flex behavior, and the item's intrinsic minimum size. Those four questions solve a surprising number of Flexbox problems.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
