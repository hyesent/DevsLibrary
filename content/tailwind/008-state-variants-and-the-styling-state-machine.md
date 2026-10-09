---
title: "State variants and the styling state machine"
order: 8
book: "tailwind"
---

# State variants and the styling state machine

Variants allow styles to depend on state. `hover:`, `focus-visible:`, `disabled:`, `checked:`, `dark:`, and responsive prefixes all express the same broad idea: a rule becomes active under a condition.

Think of an interactive component as a state machine. A button might be idle, hovered, focused, pressed, disabled, or loading. Each state can have presentation rules.

Accessibility changes how those states should be designed. Keyboard focus must remain visible. A disabled control should actually be disabled, not merely transparent. An error should not be represented by color alone.

Group and peer variants allow relationships between elements. A child can react to a parent's state, or an element can react to the state of a related sibling. These patterns are especially useful for cards, labels, toggles, and validation UI.

The critical boundary is that Tailwind should not become the source of truth for application state. If an order is pending, the application knows the order is pending. Tailwind only expresses what pending looks like.

The architecture is:

application state → semantic DOM state → variant selection → visual presentation.

That separation keeps styling declarative and prevents CSS classes from becoming a hidden business-logic system.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
