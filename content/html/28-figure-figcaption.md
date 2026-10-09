---
title: <figure> and <figcaption>
order: 28
book: html
---

# `<figure>` and `<figcaption>`

Two elements that pair an image (or any content) with a caption. Semantically
they say "this thing and its description belong together."

## Basic structure

```html
<figure>
  <img src="cat.jpg" alt="A cat on a windowsill">
  <figcaption>A sleepy cat watching the rain.</figcaption>
</figure>
```

- `<figure>` wraps the content
- `<figcaption>` provides the caption

By default, browsers render them as a block — the caption appears below the
image. Style as you like.

## Why not just `<img>` and `<p>`?

You could write:

```html
<img src="cat.jpg" alt="A cat">
<p>A sleepy cat watching the rain.</p>
```

Visually identical. But semantically, the caption isn't clearly attached to the
image. Assistive tech and search engines have to guess.

With `<figure>`:

- Screen readers announce the caption as the image's caption
- Search engines understand the pairing
- The layout engine knows they belong together for spacing and alignment

## `<figcaption>` position

The caption can go first (above) or last (below) inside `<figure>`:

```html
<figure>
  <figcaption>Figure 1: System architecture</figcaption>
  <img src="architecture.png" alt="System diagram">
</figure>
```

```html
<figure>
  <img src="architecture.png" alt="System diagram">
  <figcaption>Figure 1: System architecture</figcaption>
</figure>
```

Only **one** `<figcaption>` per `<figure>`.

## Not just for images

`<figure>` is for any self-contained content that would benefit from a caption:

### Code listings

```html
<figure>
  <pre><code>function greet(name) {
  return `Hello, ${name}`;
}</code></pre>
  <figcaption>Example 1: A simple greeting function.</figcaption>
</figure>
```

### Blockquotes

```html
<figure>
  <blockquote>
    <p>The only way to do great work is to love what you do.</p>
  </blockquote>
  <figcaption>— Steve Jobs, 2005</figcaption>
</figure>
```

### Diagrams, tables, charts

```html
<figure>
  <table>...</table>
  <figcaption>Table 3: Quarterly results</figcaption>
</figure>
```

### Video

```html
<figure>
  <video src="demo.mp4" controls></video>
  <figcaption>Demo: Installation walkthrough</figcaption>
</figure>
```

## When to use `<figure>`

Use it when:

- The content is a self-contained unit that belongs with a caption
- The caption is meaningful — a label, description, or attribution
- The content could be moved elsewhere without breaking the surrounding text

Don't use it when:

- The image is inline with the text (like a small inline icon)
- The image is purely decorative and doesn't need a caption
- You just want to group things for styling — that's a job for `<div>`

## `<figure>` vs `<aside>`

Both are "extra content," but differently:

- `<figure>` — self-contained, often with a caption, doesn't interrupt the flow
- `<aside>` — tangential content, usually a sidebar or callout

## Accessibility

`<figcaption>` is announced by screen readers when they encounter the figure.
Combined with proper `alt` on the image, users get:

1. Description of the image (from `alt`)
2. The caption (from `<figcaption>`)

If both are present and say similar things, that's redundant. Two options:

- **Short `alt`, longer caption**: `alt="A cat"` + caption with details
- **Empty `alt`, full caption**: `alt=""` + caption carries everything

Do not duplicate the same text in both.

## Styling

Common patterns:

```css
figure {
  margin: 2em 0;
}

figure img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

figcaption {
  margin-top: 8px;
  font-size: 0.9em;
  color: #666;
  font-style: italic;
}
```

For side-by-side figure and caption, use flex or grid.

## Common mistakes

- Nesting `<figcaption>` outside `<figure>` — it only works as a direct child.
- Multiple `<figcaption>` elements in one `<figure>` — only one is allowed.
- Using `<figure>` for decorative images that don't need captions.
- Duplicating content between `alt` and `<figcaption>` — redundant for screen
  readers.
- Using `<figure>` when a `<div>` would do — remember, `<figure>` is semantic.
- Putting the caption and image in separate containers unrelated to each other.

## The takeaway

- `<figure>` wraps self-contained content
- `<figcaption>` provides its caption (one per figure)
- Works for images, code, quotes, tables, video — anything
- Caption can go before or after the content
- Pair carefully with `alt` to avoid duplication
- Don't use it for purely decorative or inline images

Small elements, but they make content more structured and accessible.