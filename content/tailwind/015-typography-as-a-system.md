---
title: "Typography as a system"
order: 15
book: "tailwind"
---

# Typography as a system

Typography is a combination of font metrics, scale, line height, weight, tracking, color, and readable measure.

A heading is not merely a larger `text-*` value. Its role in the information hierarchy depends on size, weight, line height, spacing, and surrounding structure. Body text needs an appropriate line length and vertical rhythm.

Tailwind provides utilities for these properties, but the design system should define recurring roles. For example, a product might have a display heading, section heading, body, supporting text, label, and code style.

Maximum line width matters. A paragraph that spans an entire desktop monitor can be technically responsive while remaining difficult to read. A readable maximum width preserves comfortable measure without making the entire page narrow.

Typography also interacts with accessibility and localization. Text may become larger, wrap differently, or occupy more space. Components should survive those changes.

Font loading is another architectural concern. The chosen font, fallback fonts, and loading strategy affect both appearance and layout stability.

The useful mental model is:

typographic role → tokenized values → component usage.

This is more maintainable than independently choosing a font size every time text appears.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
