---
title: Flexbox Patterns
order: 22
book: css
---

# Flexbox Patterns

Most Flexbox work consists of recurring patterns: toolbars, centered content, navigation rows, media objects, and equal or flexible groups.

## The mental model

Patterns become easier once you translate the visual goal into axes and relationships. “Put these controls at opposite ends” is distribution. “Center this item on both axes” is alignment. “Let these buttons wrap” is line management.

## In practice

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.split {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

Do not memorize these as recipes forever. Use them to train your ability to translate a design into constraints.

## Common mistakes

- Using absolute positioning for centering
- Creating spacer elements to push items apart
- Making equal widths when content should size naturally
- Using nested flex containers without identifying why each one exists

## Practice

Implement a header, media object, centered empty state, and wrapping button group using Flexbox. For each, write one sentence describing the layout constraint before writing CSS.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
