---
title: Modern CSS Nesting
order: 39
book: css
---

# Modern CSS Nesting

CSS nesting lets related rules be written together, keeping component styles closer to the states and descendants they describe.

## The mental model

Native nesting reduces repetition while remaining part of CSS itself. It can improve readability when used with restraint. The important principle is still the same: keep selectors understandable and specificity controlled.

## In practice

```css
.card {
  padding: 1rem;

  & h2 {
    margin: 0;
  }

  &:hover {
    transform: translateY(-2px);
  }
}
```

Nesting should describe a real relationship. Deep nesting can recreate the same specificity and maintenance problems as giant flat selectors.

## Common mistakes

- Nesting every descendant several levels deep
- Assuming nesting automatically improves architecture
- Creating high-specificity selectors through nesting
- Using nesting when two independent rules would be clearer

## Practice

Refactor a flat card stylesheet into shallow native nesting. Keep the final selectors easy to predict and inspect.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
