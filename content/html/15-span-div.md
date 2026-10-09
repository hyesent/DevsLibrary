---
title: span, div, and When to Use Which
order: 15
book: html
---

# `span`, `div`, and When to Use Which

`<span>` and `<div>` are the two generic containers in HTML. They have no
meaning of their own — they're just "a box." Everything else in HTML describes
*what* content is; these two just say "here's some content, grouped together."

They're useful. They're also massively overused. This lesson is about when
they're the right tool and when they're not.

## `<div>` — block container

The `<div>` element is a **block-level** container. It takes up the full width
of its parent, stacks vertically, and starts on a new line.

```html
<div class="card">
  <h2>Title</h2>
  <p>Body text.</p>
</div>
```

Use `<div>` when:
- You need to group block-level content for styling or scripting
- No semantic element applies
- The group is purely structural

## `<span>` — inline container

The `<span>` element is an **inline** container. It flows with text, doesn't
break lines, and only takes up as much width as its content.

```html
<p>This word is <span class="highlight">important</span> in context.</p>
```

Use `<span>` when:
- You need to wrap part of a text node for styling or scripting
- No semantic element applies
- The group is a fragment of a sentence

## The core rule: try semantic first

Before reaching for `<div>` or `<span>`, ask: **is there a more specific
element for this?**

- Wrapping a navigation? Use `<nav>`, not `<div class="nav">`.
- Wrapping a footer? Use `<footer>`, not `<div class="footer">`.
- Wrapping an article? Use `<article>`, not `<div class="article">`.
- Marking important text? Use `<strong>`, not `<span class="bold">`.
- Marking a date? Use `<time>`, not `<span class="date">`.

The generic containers exist for cases where **no semantic element fits**.
Reach for them last, not first.

## When div is actually right

### Grouping for layout

You need a CSS grid with three columns. Each column is a `<div>` because
"column" isn't a semantic concept in HTML.

```html
<div class="grid">
  <div class="col">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
</div>
```

### Wrapper for a JavaScript hook

You need a container that JavaScript will target for animation or
manipulation.

```html
<div id="modal-root"></div>
```

### Grouping form controls

```html
<div class="form-row">
  <label for="first">First name</label>
  <input id="first" type="text">
</div>
```

(Native `<fieldset>` also works here — use whichever is clearer.)

### Grouping content with no semantic tag

A "hero section" with a background image isn't `<section>` (that has meaning —
it groups a themed region) or `<header>` (that's for page-level intros). It's
just a styled block. `<div>` is fine.

```html
<div class="hero">
  <h1>Welcome</h1>
  <p>Subtitle</p>
</div>
```

## When span is actually right

### Highlighting a word for styling

```html
<p>The new <span class="accent">Hyetext</span> app is out.</p>
```

### Adding a JavaScript hook

```html
<p>You have <span id="count">0</span> items.</p>
```

### Wrapping text for translation

```html
<p>The French call it <span lang="fr">bonjour</span>.</p>
```

(Though `<i>` is also common for foreign words — either works.)

### Character-level effects

Applying a gradient to each letter:

```html
<h1>
  <span>H</span><span>e</span><span>l</span><span>l</span><span>o</span>
</h1>
```

## What "no meaning" actually means

When we say `<div>` and `<span>` have "no semantic meaning," we mean:

- Screen readers don't announce them as anything specific
- Search engines don't weight their content specially
- Browsers don't apply any default styles beyond `display: block` / `display:
  inline`

The only thing that distinguishes them from anything else is CSS classes and
IDs. Which is fine — that's exactly what they're for.

## Div-itis

The most common HTML mistake among beginners: wrapping everything in a `<div>`
because you can't think of anything else.

```html
<div class="header">
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
    <div class="nav-item"><a href="/about">About</a></div>
  </div>
</div>
```

Should be:

```html
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
```

Same visual output, but now:
- Screen readers know "this is a navigation area"
- Search engines understand the structure
- Your CSS is simpler (no unnecessary classes)
- The HTML is shorter

Every `<div>` you write is a small chance that you should have used something
else.

## The semantic replacement table

| Instead of this | Use this |
|---|---|
| `<div class="header">` | `<header>` |
| `<div class="footer">` | `<footer>` |
| `<div class="nav">` | `<nav>` |
| `<div class="main">` | `<main>` |
| `<div class="article">` | `<article>` |
| `<div class="section">` | `<section>` |
| `<div class="aside">` | `<aside>` |
| `<div class="figure">` | `<figure>` |
| `<span class="bold">` | `<strong>` or `<b>` |
| `<span class="italic">` | `<em>` or `<i>` |
| `<span class="quote">` | `<q>` or `<blockquote>` |
| `<span class="code">` | `<code>` |
| `<span class="date">` | `<time>` |

Every one of these replaces a `<div>` or `<span>` with an element that carries
meaning. Do the swap whenever the meaning fits.

## When it doesn't matter

Sometimes a `<div>` is genuinely just a `<div>`. A layout wrapper, an animation
target, a card container — none of those have a semantic equivalent. Use a
`<div>`.

The rule isn't "never use `<div>`." It's "**use `<div>` when nothing more
specific applies**."

## Common mistakes

- Wrapping every section in `<div class="section">`. Use `<section>`.
- Using `<div>` for headers and footers. Use `<header>` and `<footer>`.
- Using `<span class="bold">` instead of `<strong>` or `<b>`.
- Using `<span class="italic">` instead of `<em>` or `<i>`.
- Nesting five levels of `<div>` when two would do. Simplify.
- Using `<span>` inside a `<div>` where a `<p>` would be more appropriate.
- Using `<div>` to make a clickable area — `<button>` or `<a>` is usually
  better.

## The takeaway

- `<div>` — block container, no meaning
- `<span>` — inline container, no meaning
- Reach for them **last**, not first
- Prefer semantic elements: `<nav>`, `<header>`, `<footer>`, `<article>`,
  `<section>`, `<aside>`, `<figure>`, `<main>`
- Use `<div>`/`<span>` when no semantic element fits
- They're not "bad elements" — they're tools that should be used with judgment

The generic containers exist for a reason. Just don't reach for them by
default.