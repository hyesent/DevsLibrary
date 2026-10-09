---
title: "How Tailwind generates CSS"
order: 3
book: "tailwind"
---

# How Tailwind generates CSS

Tailwind's core architecture is build-time CSS generation. Your templates and components contain class candidates. Tailwind scans those sources, determines which candidates correspond to utilities or variants, and emits CSS for the candidates it can identify.

The result is fundamentally different from a runtime styling engine. When the browser sees `bg-blue-600`, it is not asking Tailwind what that means. The generated stylesheet already contains the rule.

This architecture has an important consequence: build-time knowledge and runtime data are different things. A class written literally in a component is easy to discover. A class constructed from arbitrary runtime fragments may not be discoverable.

Modern Tailwind also exposes CSS-first directives. `@import "tailwindcss"` imports the framework; `@theme` defines design tokens; `@source` can explicitly add source locations; `@utility` registers custom utilities; and `@custom-variant` can define custom conditional variants.

Think of the pipeline as:

source → candidate detection → CSS generation → static stylesheet → browser.

When debugging, identify which stage failed. A missing visual rule might be a component bug, a source-detection issue, a generation issue, a cascade issue, or simply a CSS layout misunderstanding. Knowing the pipeline prevents random experimentation.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
