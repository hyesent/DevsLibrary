---
title: Backgrounds, Gradients, and Images
order: 37
book: css
---

# Backgrounds, Gradients, and Images

CSS backgrounds can create layers of color, gradients, and imagery without changing the document’s semantic content.

## The mental model

Backgrounds belong to presentation. `background-color`, `background-image`, `background-size`, `background-position`, and `background-repeat` combine into a powerful visual system. Multiple backgrounds can be layered.

## In practice

```css
.hero {
  background:
    linear-gradient(rgb(0 0 0 / .45), rgb(0 0 0 / .45)),
    url("hero.jpg") center / cover;
}
```

The gradient is layered above the image, improving text readability. The image is decorative here; if the image itself conveys content, an HTML `<img>` may be more appropriate.

## Common mistakes

- Using background images for meaningful content
- Forgetting contrast over image backgrounds
- Using `cover` without considering cropping
- Adding many layers without understanding their order

## Practice

Create a hero section with a decorative image and gradient overlay. Then explain why the image is or is not appropriate as an HTML image.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
