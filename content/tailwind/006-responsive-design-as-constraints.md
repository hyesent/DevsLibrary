---
title: "Responsive design as constraints"
order: 6
book: "tailwind"
---

# Responsive design as constraints

Responsive design is stronger when treated as constraint solving rather than device classification. A layout should change because available space or interaction requirements changed, not because a device has been labeled "tablet."

Tailwind's responsive variants are mobile-first. A class without a breakpoint is the base rule. A prefix such as `md:` adds a rule that becomes active at that minimum width. For example:

```html
<div class="flex flex-col md:flex-row">
```

The component starts as a column and becomes a row when enough horizontal space exists.

The breakpoint should therefore be chosen from the content. If cards become unreadable at a particular width, that is evidence for a layout transition. The name of a device is not.

Tailwind's default breakpoints can be customized through theme variables, and arbitrary minimum or maximum conditions can be used for unusual cases.

The deeper architecture issue is that viewport width is not the only environment that matters. A component can be narrow inside a wide desktop layout. That is why container queries are important: they let a component respond to its allocated space rather than the whole viewport.

A useful question is always: what environment actually determines this component's layout? If it is the page, use a viewport breakpoint. If it is the component's container, use a container query.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
