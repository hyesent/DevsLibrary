---
title: "Debugging Tailwind systematically"
order: 31
book: "tailwind"
---

# Debugging Tailwind systematically

Debugging should follow the generation pipeline rather than rely on trial and error.

First inspect the DOM. Is the expected class actually present? If not, the component's conditional logic is the problem.

If it is present, inspect the generated stylesheet. Was a rule generated for the candidate? If not, investigate source detection or the way the class was constructed.

If the rule exists, inspect matched CSS rules. Did another declaration win because of specificity, layers, or order?

If the correct declaration won, inspect the layout model. Is the parent actually a flex container? Is the element constrained by a maximum width? Is it inside a different containing block?

Finally inspect conditional context: breakpoint, hover state, dark mode, disabled state, or container size.

The diagnostic tree is:

```text
class present?
 → generated?
 → rule winning?
 → layout condition correct?
 → environment/state correct?
```

This method works because each question isolates a different architectural layer.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
