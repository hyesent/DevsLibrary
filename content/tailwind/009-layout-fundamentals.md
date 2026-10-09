---
title: "Layout fundamentals"
order: 9
book: "tailwind"
---

# Layout fundamentals

Tailwind becomes much easier once layout is understood as a set of browser formatting models.

Normal block flow is often enough for document content. Flexbox is usually appropriate for one-dimensional relationships such as rows of controls. Grid is useful for two-dimensional arrangements. Positioning is useful for overlays and viewport-attached elements.

A page can be viewed as nested layout contexts:

```text
page
 └─ main
    ├─ header layout
    ├─ content layout
    │  ├─ navigation
    │  └─ article
    └─ footer
```

Each container should have a reason for its layout mode. Turning every element into `flex` can create unnecessary formatting contexts and make the architecture harder to understand.

Sizing also belongs to the layout model. `w-full` means full available width according to its containing block; it does not mean "full viewport" in every context. `max-w-*` often communicates a readability constraint more accurately than a fixed width.

When a child appears broken, inspect its ancestors. Many apparent child problems are caused by constraints imposed by a parent: an unexpected flex direction, a fixed height, overflow clipping, or an unsuitable containing block.

The architecture reflex is to identify the layout owner. Which element is responsible for arranging these children? Once that answer is clear, the appropriate utility family usually follows naturally.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
