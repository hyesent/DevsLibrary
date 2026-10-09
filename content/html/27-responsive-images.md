---
title: Responsive Images — srcset, sizes, picture
order: 27
book: html
---

# Responsive Images — `srcset`, `sizes`, `<picture>`

One image URL isn't enough in a world of 320px phones and 4K monitors. You can
serve the right image to each user with two tools: `srcset`/`sizes` for
resolution switching, and `<picture>` for art direction.

## The problem

A 3000px wide hero image on a 400px phone wastes:

- **Bandwidth** — 2 MB downloaded for a screen that could use 200 KB
- **Time** — the user waits for the full download
- **Money** — for users on metered mobile data

Meanwhile, a 400px image on a 4K monitor looks blurry.

Responsive images solve both: serve *different image files* to different
devices.

## `srcset` — offer multiple sources

```html
<img
  src="cat-800.jpg"
  srcset="
    cat-400.jpg 400w,
    cat-800.jpg 800w,
    cat-1600.jpg 1600w
  "
  alt="A cat">
```

Each entry is `filename width`. The `w` suffix means "the image is this many
pixels wide." The browser picks the best fit.

The `src` attribute is a fallback for browsers that don't support `srcset`
(which is basically none in 2024 — but you still need `src` for HTML validity).

## `sizes` — tell the browser how wide it'll display

The browser doesn't know how wide the image will render until CSS is applied.
`sizes` describes it upfront, so the browser can pick the right source before
layout.

```html
<img
  src="cat-800.jpg"
  srcset="cat-400.jpg 400w, cat-800.jpg 800w, cat-1600.jpg 1600w"
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1200px) 50vw,
    800px
  "
  alt="A cat">
```

Read it as:
- Below 600px viewport → image is 100% of viewport width
- 600–1200px → image is 50% of viewport width
- Above 1200px → image is 800px

The browser picks the smallest image that satisfies the needed resolution.

`100vw` = 100% of viewport width. `50vw` = half. Also valid: `px`, `em`, `rem`.

## How the browser picks

Given `sizes`, the browser knows the CSS width. It multiplies by the device
pixel ratio (DPR):

- iPhone (2x DPR) at 100vw of a 400px viewport → needs 800 physical pixels
- The browser would pick `cat-800.jpg`

On a laptop (1x DPR) at 50vw of 1200px = 600 CSS pixels → picks `cat-800.jpg`.

The goal: **smallest file that's sharp enough**.

## The `2x` descriptor (density)

Instead of `w`, you can use `x` for pixel density:

```html
<img
  src="cat.jpg"
  srcset="cat.jpg 1x, cat@2x.jpg 2x, cat@3x.jpg 3x"
  alt="A cat">
```

This is simpler but less flexible — the browser assumes the image displays at
its natural size in CSS pixels. Use `w` + `sizes` for layouts where the image
size varies by viewport; use `x` for fixed-size images (icons, small photos in
a card).

## `<picture>` — art direction

`<picture>` lets you serve **different crops** or **different formats** at
different sizes.

```html
<picture>
  <source media="(max-width: 600px)" srcset="cat-portrait.jpg">
  <source media="(min-width: 601px)" srcset="cat-landscape.jpg">
  <img src="cat-landscape.jpg" alt="A cat">
</picture>
```

On phones, the portrait crop shows; on desktop, the landscape crop. This is
**art direction** — you're not just changing resolution, you're changing the
image itself.

## `<picture>` for format selection

Serve modern formats with fallbacks:

```html
<picture>
  <source type="image/avif" srcset="cat.avif">
  <source type="image/webp" srcset="cat.webp">
  <img src="cat.jpg" alt="A cat">
</picture>
```

Browser tries AVIF first, then WebP, falls back to JPEG. Each format is chosen
by what the browser supports, not viewport size.

## Combining formats and sizes

```html
<picture>
  <source
    type="image/avif"
    srcset="cat-400.avif 400w, cat-800.avif 800w, cat-1600.avif 1600w"
    sizes="(max-width: 600px) 100vw, 50vw">
  <source
    type="image/webp"
    srcset="cat-400.webp 400w, cat-800.webp 800w, cat-1600.webp 1600w"
    sizes="(max-width: 600px) 100vw, 50vw">
  <img
    src="cat-800.jpg"
    srcset="cat-400.jpg 400w, cat-800.jpg 800w, cat-1600.jpg 1600w"
    sizes="(max-width: 600px) 100vw, 50vw"
    alt="A cat">
</picture>
```

This is the modern standard for hero images. Handles format support and
resolution in one block.

## How `<picture>` works

- `<source>` elements are tried in order.
- The first one whose `media` and `type` match is used.
- If none match, the `<img>` at the bottom is used.

The `<img>` is **required** — it's what actually displays the image. The
`<source>` elements are just hints.

## When to use what

| Need | Use |
|---|---|
| Same image, different resolutions | `srcset` + `sizes` on `<img>` |
| Fixed-size image at 2x/3x | `srcset` with `x` descriptors |
| Different crops at different sizes | `<picture>` with `media` |
| Modern format with fallback | `<picture>` with `type` |
| Combination | `<picture>` with `type` + `srcset` + `sizes` |

## Practical guidance

- **Above-the-fold hero**: use `<picture>` with AVIF + WebP + JPEG fallback
- **Content images**: `srcset` + `sizes` on `<img>`
- **Icons**: SVG (no srcset needed)
- **Thumbnails**: fixed size, `srcset` with `2x` if needed

If you can only do one thing: use `srcset` + `sizes`. It solves 90% of the
problem.

## Common mistakes

- Omitting `sizes` — the browser defaults to `100vw` and picks oversized images
  for all but full-width layouts.
- Using `<picture>` when `srcset` on `<img>` would do — needless complexity.
- Serving 3x images at 1x — the browser picks based on `sizes`; check that
  logic.
- Forgetting the fallback `<img>` inside `<picture>` — the `<source>` elements
  do nothing without it.
- Wildly varying crops that change the image's meaning. Make sure alt text still
  applies.
- Providing `srcset` but not `src` on `<img>` — invalid HTML.

## The takeaway

- `srcset` offers multiple files; `sizes` tells the browser how wide it'll
  display
- Browser picks the smallest file that meets the required resolution
- `<picture>` is for art direction (different crops) and format negotiation
- The `<img>` inside `<picture>` is required
- Use `x` descriptors for fixed-size, `w` + `sizes` for responsive layouts
- Ship modern formats (AVIF, WebP) with JPEG fallback

Responsive images are the single biggest performance win you can make on an
image-heavy page. Do it right and users on slow connections will thank you.