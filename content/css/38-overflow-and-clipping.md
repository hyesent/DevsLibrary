---
title: Overflow and Clipping
order: 38
book: css
---

# Overflow and Clipping

Overflow controls what happens when content exceeds an element’s box. Clipping is powerful but can hide content and create surprising scroll behavior.

## The mental model

`overflow` can be visible, hidden, clip, auto, or scroll depending on the property and context. `overflow: auto` can create a scrolling container when content exceeds the available space.

## In practice

```css
.panel {
  max-height: 20rem;
  overflow: auto;
}

.avatar {
  border-radius: 50%;
  overflow: clip;
}
```

Use overflow deliberately. A scroll container changes keyboard navigation, scrolling behavior, and how users perceive the page.

## Common mistakes

- Hiding content just to remove a visual problem
- Creating nested scroll containers accidentally
- Using overflow to patch broken layout
- Forgetting that clipped content may become inaccessible

## Practice

Build a fixed-height message panel with intentional scrolling. Then test it with keyboard navigation and long unbroken text.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
