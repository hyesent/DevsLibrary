---
title: "The cascade, specificity, and layers"
order: 26
book: "tailwind"
---

# The cascade, specificity, and layers

Tailwind does not remove the CSS cascade. Generated utilities still compete with other declarations according to CSS rules.

When two declarations set the same property, the browser considers origin, layer, specificity, and source order. A utility appearing later in your HTML does not automatically guarantee that its declaration wins.

This matters particularly when integrating third-party CSS or custom component styles.

The correct debugging method is to inspect the element in browser developer tools and identify which declaration won. Then inspect the declarations that lost and ask why.

Do not immediately reach for `!important`. First determine whether the problem is specificity, layer ordering, source order, or an unintended selector.

Tailwind's generated CSS uses organized layers, and custom CSS can participate in that architecture. Understanding CSS layers is therefore increasingly useful in advanced Tailwind projects.

The broader lesson is that a framework can simplify authoring without changing the browser's underlying rules. The more complex the application, the more valuable it becomes to understand those rules directly.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
