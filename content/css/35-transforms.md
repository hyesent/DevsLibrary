---
title: Transforms
order: 35
book: css
---

# Transforms

Transforms move, rotate, scale, and skew rendered elements without changing normal document flow in the same way as layout properties.

## The mental model

Transforms are useful for visual motion and effects because they can often be handled efficiently by the browser’s rendering pipeline. They do not magically change surrounding layout; the transformed visual box can move without causing siblings to reflow around it.

## In practice

```css
.card:hover {
  transform: translateY(-4px);
}
```

The card visually moves upward, but its original layout position still determines how surrounding elements are arranged.

## Common mistakes

- Using transforms to solve actual layout problems
- Expecting transformed elements to push siblings
- Scaling text and making it harder to read
- Combining transforms without understanding transform origin

## Practice

Create a hover lift effect with `translateY()`. Then compare it with changing margin and explain why the two approaches affect layout differently.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
