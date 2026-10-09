---
title: "Breakpoints and the cascade"
order: 7
book: "tailwind"
---

# Breakpoints and the cascade

Responsive utilities are ordinary CSS rules inside media conditions. Their behavior is therefore governed by the cascade.

For:

```html
<div class="text-sm md:text-base lg:text-lg">
```

the base rule is always eligible. At the medium threshold, the `md:` rule becomes eligible. At the large threshold, the `lg:` rule becomes eligible. The browser resolves the applicable rules according to CSS ordering and cascade behavior.

This is why mobile-first styling is useful: you define a working base composition, then add changes for increasingly spacious environments.

Tailwind's current default breakpoints are expressed in `rem`, and the framework lets you customize the breakpoint tokens. If a project repeatedly needs a custom threshold, it should normally become part of the theme rather than appearing as a scattered collection of arbitrary values.

Responsive styling should not be thought of as several separate versions of a component. It is one component with a conditional CSS rule set. The DOM remains the same unless application logic says otherwise.

A useful test is to resize continuously. If a layout breaks between two familiar device widths, the actual breakpoint should be based on that content failure. This trains you to design from constraints instead of device folklore.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
