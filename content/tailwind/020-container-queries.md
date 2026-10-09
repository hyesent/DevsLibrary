---
title: "Container queries"
order: 20
book: "tailwind"
---

# Container queries

Viewport breakpoints answer "how wide is the browser?" Container queries answer "how much space does this component have?"

That distinction is fundamental for reusable components. A card can be wide in a main content area and narrow in a sidebar even at the same viewport width. A viewport breakpoint cannot see that difference.

Tailwind supports container queries using `@container` and variants such as `@sm` and `@md`. A parent establishes the query container, and children respond to its size.

Conceptually:

```html
<div class="@container">
  <article class="flex flex-col @md:flex-row">
    ...
  </article>
</div>
```

The component can therefore express a rule based on its actual allocated space.

Container queries are especially useful for reusable cards, panels, widgets, and design-system primitives. They make components less dependent on the page that happens to contain them.

Use viewport breakpoints when page-level composition changes with the viewport. Use container queries when the component's local allocation is the relevant constraint.

This is a deeper design-system principle: reusable components should depend on their actual environment rather than assumptions about where they will be placed.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
