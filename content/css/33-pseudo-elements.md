---
title: Pseudo-elements
order: 33
book: css
---

# Pseudo-elements

Pseudo-elements represent generated pieces of an element’s rendered content, such as `::before`, `::after`, and typographic pseudo-elements.

## The mental model

Pseudo-elements are useful for decorative marks, icons built from CSS, overlays, and visual embellishments. They should not replace real semantic content when the information matters to the user.

## In practice

```css
.external-link::after {
  content: " ↗";
}

.badge::before {
  content: "";
  display: inline-block;
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
}
```

The generated content belongs to presentation. If an icon conveys essential information, consider whether it should exist as a real accessible element or text.

## Common mistakes

- Putting meaningful content only in `content`
- Forgetting generated content is not ordinary DOM content
- Using pseudo-elements for layout that Grid or Flexbox could express
- Creating inaccessible icon-only controls

## Practice

Add a decorative status dot and an external-link indicator with pseudo-elements. Then decide which visual elements should remain decorative and which should be semantic.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
