---
title: Aspect Ratios and Media Components
order: 48
book: css
---

# Aspect Ratios and Media Components

The `aspect-ratio` property gives a box a preferred width-to-height relationship, which is especially useful for images, video placeholders, cards, and media frames.

## The mental model

Instead of calculating heights manually, you can define a ratio and let the browser maintain it as the width changes. This can stabilize layouts before media loads and simplify responsive components.

## In practice

```css
.thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

`aspect-ratio` controls the box relationship. `object-fit` controls how replaced content such as an image fits inside that box.

## Common mistakes

- Hard-coding a different height for every breakpoint
- Confusing aspect ratio with image cropping
- Using `object-fit` without a constrained box
- Forgetting that important image content may be cropped

## Practice

Build a responsive video-card thumbnail using `aspect-ratio`. Test portrait and landscape images and decide how each should be treated.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
