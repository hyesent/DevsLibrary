---
title: Animations and Keyframes
order: 36
book: css
---

# Animations and Keyframes

CSS animations describe a sequence of visual states with keyframes. Unlike a simple transition, an animation can run through multiple stages without requiring a state change for each stage.

## The mental model

Define an animation with `@keyframes`, then apply it with animation properties. Use animations to communicate progress, attention, or state—not simply because motion is available.

## In practice

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

.status {
  animation: pulse 1.5s ease-in-out infinite;
}
```

Infinite motion should be used carefully. A constantly moving element can distract users and create accessibility problems.

## Common mistakes

- Animating everything continuously
- Using animation as a substitute for clear state changes
- Forgetting `prefers-reduced-motion`
- Creating keyframes with unnecessary complexity

## Practice

Create a short entrance animation for a panel. Then disable or simplify it for users who prefer reduced motion.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
