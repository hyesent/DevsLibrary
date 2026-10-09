---
title: Margin, Padding, and Spacing
order: 13
book: css
---

# Margin, Padding, and Spacing

Spacing creates relationships between content. Padding controls internal breathing room; margin separates an element from surrounding content.

## The mental model

A useful rule is: padding belongs to the component’s internal surface, while margin describes separation outside that component. Modern layout systems also make `gap` a first-class spacing tool between flex and grid children.

## In practice

```css
.card { padding: 1.5rem; }
.card + .card { margin-top: 1rem; }
.stack { display: flex; flex-direction: column; gap: 1rem; }
```

Prefer a consistent spacing scale rather than inventing a different number for every gap. Consistency is what turns spacing into a visual system.

## Common mistakes

- Using empty elements to create space
- Using margins where `gap` communicates the relationship better
- Mixing dozens of unrelated spacing values
- Adding padding to children when the component owns the spacing

## Practice

Create a vertical stack of four cards using `gap`. Then refactor a margin-based version into the stack model and compare which one communicates the layout intent more clearly.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
