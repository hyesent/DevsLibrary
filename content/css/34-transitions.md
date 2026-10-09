---
title: Transitions
order: 34
book: css
---

# Transitions

Transitions interpolate a property change over time, making state changes easier to perceive without turning every interaction into an animation.

## The mental model

A transition describes how a property changes when its value changes. The common pieces are property, duration, timing function, and delay. Good transitions are short and reinforce causality.

## In practice

```css
.button {
  background: var(--color-accent);
  transition: transform 160ms ease, background-color 160ms ease;
}

.button:hover {
  transform: translateY(-1px);
}
```

The hover state remains the state; the transition only controls how the browser moves between values.

## Common mistakes

- Transitioning every property with `all` by default
- Using long durations for tiny interactions
- Animating layout properties when transforms can do the job
- Ignoring reduced-motion preferences

## Practice

Add a subtle hover transition to a button and card. Then create a reduced-motion override that removes or minimizes the movement.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
