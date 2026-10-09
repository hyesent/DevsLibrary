---
title: Scroll Behavior, Sticky UI, and Scrollbars
order: 50
book: css
---

# Scroll Behavior, Sticky UI, and Scrollbars

Scrolling is part of layout and interaction. CSS can control smooth scrolling, sticky positioning, and scrollbar presentation, but these features should remain usable.

## The mental model

`position: sticky` is useful for headers and sidebars that should remain visible within a scroll context. Smooth scrolling can improve navigation but should respect reduced-motion preferences. Custom scrollbar styling should never reduce contrast or usability.

## In practice

```css
.toc {
  position: sticky;
  top: 1rem;
}

html {
  scroll-behavior: smooth;
}
```

Sticky positioning depends on the scroll container and available space. If an ancestor creates an unexpected scrolling context, sticky behavior can appear broken.

## Common mistakes

- Using sticky without checking the scroll container
- Making every scroll movement smooth
- Ignoring reduced-motion users
- Hiding scrollbars to make the interface look cleaner

## Practice

Create a sticky table of contents beside a long article. Test it with a short viewport and nested containers to understand its boundaries.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
