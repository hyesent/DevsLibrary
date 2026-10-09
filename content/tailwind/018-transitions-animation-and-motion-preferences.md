---
title: "Transitions, animation, and motion preferences"
order: 18
book: "tailwind"
---

# Transitions, animation, and motion preferences

Transitions interpolate between styles when a state changes. Animations describe sequences of keyframes or repeated motion. Transforms change an element's visual geometry without being the same as normal layout changes.

A button that changes color on hover may use a transition to make the change understandable. A loading indicator may use animation because the movement itself communicates ongoing work.

Motion should communicate state or hierarchy, not merely decorate every interaction. Excessive animation increases cognitive load and can be uncomfortable for some users.

The browser exposes `prefers-reduced-motion`, and Tailwind provides variants that allow a design to reduce or remove motion for users who request it.

Performance also matters. Animating layout-heavy properties can cause repeated layout and paint work. Transform and opacity animations are often easier for browsers to optimize, although actual performance should be measured rather than assumed.

Keep the architecture clear:

application state → target presentation → transition or animation → rendered motion.

Do not encode business state solely as an animation. The application should know whether an operation is loading, successful, or failed; CSS should present those states.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
