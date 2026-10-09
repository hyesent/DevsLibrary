---
title: The <img> Element
order: 25
book: html
---

# The `<img>` Element

The `<img>` element embeds an image in the page. It's a **void element** — no
closing tag. It has two required attributes (`src` and `alt`) and several
optional ones that control loading and layout.

## Basic usage

```html
<img src="cat.jpg" alt="A sleeping cat on a windowsill">
```

Two attributes:
- `src` — the path to the image file
- `alt` — text describing the image

Both are required for valid, accessible HTML.

## The `src` attribute

Points to the image file:

```html
<img src="cat.jpg" alt="A cat">
<img src="/images/cat.jpg" alt="A cat">
<img src="https://cdn.example.com/cat.jpg" alt="A cat">
```

Same path rules apply as with `<a href>`: relative, root-relative, absolute.
Get the path wrong and you'll see the browser's "broken image" icon.

## The `alt` attribute

Describes the image for:
- Screen readers
- Users with images disabled or that failed to load
- Search engines

The rules for `alt`:

| Image type | `alt` value |
|---|---|
| Informative (adds meaning) | A description of what it shows |
| Decorative (just visual flair) | `alt=""` (empty, but present) |
| Functional (a link/button) | A description of the *function* |
| Complex (chart, diagram) | Short description + longer text nearby |

**Important**: never omit `alt`. If an image has no meaningful content, use
`alt=""` — an empty value — not a missing attribute. Missing `alt` makes screen
readers read the file name aloud, which is awful.

### Good vs bad alt text

Bad: `alt="image"` — useless.
Bad: `alt="cat.jpg"` — this is the file name.
Bad: `alt="A photo of a cat sitting on a windowsill looking out at the rain"` —
too long.
Good: `alt="A cat on a windowsill"`.

Describe the image's **purpose**, not its every detail.

### Functional images

If the image is the *content* of a link or button:

```html
<a href="/cart">
  <img src="cart-icon.svg" alt="Shopping cart">
</a>
```

The alt text describes the destination, not the picture.

## Width and height

Always specify them, even if you plan to resize with CSS:

```html
<img src="cat.jpg" alt="A cat" width="800" height="600">
```

These are the image's **intrinsic** dimensions in pixels. Browsers use them to
reserve space in the layout *before* the image loads — preventing content from
jumping around as images load in (a problem called Cumulative Layout Shift, or
CLS).

You can still resize with CSS:

```css
img {
  width: 100%;
  height: auto;
}
```

The `width` and `height` attributes set the aspect ratio; CSS overrides the
display size.

## `loading` — lazy loading

```html
<img src="cat.jpg" alt="A cat" loading="lazy">
```

Values:
- `eager` — load immediately (default)
- `lazy` — load only when the image nears the viewport

Use `lazy` for images below the fold — they won't compete with above-the-fold
content for bandwidth. Use `eager` (or omit) for the hero image or any above-
the-fold content.

## `decoding`

```html
<img src="cat.jpg" alt="A cat" decoding="async">
```

Values:
- `sync` — decode synchronously (blocks rendering)
- `async` — decode asynchronously (recommended for most images)
- `auto` — let the browser decide

## `srcset` and `sizes`

For responsive images — see the next lesson. Short version:

```html
<img
  src="cat-small.jpg"
  srcset="cat-small.jpg 400w, cat-medium.jpg 800w, cat-large.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="A cat">
```

## `crossorigin`

For images fetched from other origins with CORS:

```html
<img src="https://cdn.example.com/cat.jpg" alt="A cat" crossorigin="anonymous">
```

Only needed for specific scenarios (canvas manipulation, CORS-protected
resources).

## `referrerpolicy`

Controls the `Referer` header sent when fetching the image:

```html
<img src="cat.jpg" alt="A cat" referrerpolicy="no-referrer">
```

Rarely needed, but useful for privacy-sensitive embedding.

## The `<picture>` element

For art direction or modern formats — see the responsive images lesson.

## Common mistakes

- Forgetting `alt` entirely. Always include it, even if empty.
- Writing `alt` that duplicates the caption. If a `<figcaption>` already
  describes the image, `alt=""` might be fine.
- Using `alt="image of..."`. Screen readers announce "image" already; you don't
  need to repeat it.
- Not setting `width` and `height`, causing layout shift on load.
- Loading large hero images with `loading="lazy"` — that hurts first-paint time.
- Using `<img>` for decorative icons — inline SVG is usually a better choice.
- Using an image where text would work — a headline as a JPEG is unreadable and
  inaccessible.

## The takeaway

- `<img src="..." alt="...">` — a void element
- `src` points to the file
- `alt` describes it (empty string for decorative)
- `width` and `height` prevent layout shift — always include them
- `loading="lazy"` for below-the-fold images
- `decoding="async"` is a good default
- Every image needs a decision about `alt`

The `<img>` element is old and stable. Get the two required attributes right
and it's hard to go wrong.