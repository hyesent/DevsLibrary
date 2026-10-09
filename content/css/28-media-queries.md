---
title: Media Queries
order: 28
book: css
---

# Media Queries

Media queries let CSS respond to environment conditions such as viewport dimensions, user preferences, and display characteristics.

## The mental model

A media query wraps rules that apply only when a condition matches. Common responsive work uses width ranges, but modern CSS also lets you react to preferences such as reduced motion and color scheme.

## In practice

```css
@media (max-width: 48rem) {
  .nav { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
  }
}
```

The second example shows an important principle: responsive CSS is about the user’s environment, not only screen width.

## Common mistakes

- Writing mobile CSS as an afterthought
- Using device-specific breakpoints
- Ignoring user preference media features
- Duplicating entire stylesheets inside media queries

## Practice

Add a mobile layout query and a reduced-motion query to a small interface. Test both conditions using browser emulation.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
