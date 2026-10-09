---
title: div vs Semantic Elements — Decision Rules
order: 46
book: html
---

# `div` vs Semantic Elements — Decision Rules

You've learned both. Now the practical question: which one do you reach for?

## The default order

Try these in order:

1. Is there a specific element for this? (`<button>`, `<a>`, `<table>`, etc.)
2. Is there a semantic landmark for this? (`<header>`, `<nav>`, `<main>`, etc.)
3. Is there a semantic grouping for this? (`<section>`, `<article>`, `<aside>`)
4. Is it inline text? (`<span>`, or a text-level element like `<strong>`)
5. Otherwise? (`<div>` for block, `<span>` for inline)

Most `<div>`s people write are actually step 1, 2, or 3.

## The mental model

A `<div>` says: *"this is a box, no meaning attached."*

A semantic element says: *"this is a box that means X."*

Every time you write a `<div>`, ask: is there a meaning here that I'm
throwing away?

Example:

```html
<div class="header">
  <div class="nav">
    <a href="/">Home</a>
  </div>
</div>
```

vs.

```html
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
```

Same rendering. Different meaning. The second version tells screen readers
"there's a navigation landmark here" and "this is the header of the page."

## Decision tree

Start here and work down:

**1. Is it interactive?**
- Button → `<button>`
- Link → `<a>`
- Form field → `<input>`, `<select>`, `<textarea>`, etc.

**2. Is it a landmark?**
- Page or article intro → `<header>`
- Site navigation → `<nav>`
- Main content → `<main>`
- Closing info → `<footer>`
- Tangential → `<aside>`

**3. Is it a self-contained unit?**
- Blog post, comment, product card → `<article>`

**4. Is it a thematic group with a heading?**
- Chapter, section → `<section>`

**5. Is it a list?**
- Unordered → `<ul>`
- Ordered → `<ol>`
- Description pairs → `<dl>`

**6. Is it a table?**
- Tabular data → `<table>`

**7. Is it inline text?**
- Emphasis → `<em>`
- Importance → `<strong>`
- Inline generic → `<span>`

**8. None of the above?**
- Block generic → `<div>`

## When `<div>` is correct

Not everything needs meaning. Legitimate `<div>` uses:

### Layout wrappers

```html
<div class="grid">
  <article>...</article>
  <article>...</article>
  <article>...</article>
</div>
```

The wrapper is purely for CSS grid. No semantic meaning to give it.

### Animation / JS targets

```html
<div id="toast-container"></div>
```

Empty container for JavaScript. No content yet, no meaning.

### Grouping form controls for layout

```html
<div class="form-row">
  <label for="first">First</label>
  <input id="first" name="first">
  <label for="last">Last</label>
  <input id="last" name="last">
</div>
```

The row is a layout concept, not a semantic one. (Though `<fieldset>` is
correct when the fields form a logical group.)

### Styling hooks

```html
<div class="card-glow">
  <p>Content</p>
</div>
```

If you just need a styled wrapper with no semantic role.

### Modal / dialog backing

```html
<div class="modal-backdrop"></div>
<div class="modal-window" role="dialog">...</div>
```

Purely for overlay structure.

## When `<section>` beats `<div>`

Ask: does this content have a heading? Is it a distinct theme?

```html
<!-- Wrong: no heading, just a wrapper -->
<div class="features">
  <div><h3>Fast</h3><p>...</p></div>
  <div><h3>Safe</h3><p>...</p></div>
</div>

<!-- Better -->
<section>
  <h2>Features</h2>
  <article>
    <h3>Fast</h3>
    <p>...</p>
  </article>
  <article>
    <h3>Safe</h3>
    <p>...</p>
  </article>
</section>
```

The `<section>` groups features, each feature is an `<article>` (self-contained
with its own heading).

## When `<article>` beats `<section>`

Ask: could this content stand alone?

```html
<!-- Section: part of a larger whole -->
<section>
  <h2>Introduction</h2>
  <p>...</p>
</section>

<!-- Article: could be shared as a standalone URL -->
<article>
  <h2>How to Write HTML</h2>
  <p>...</p>
</article>
```

If you could move it to another page and it would still make sense, it's an
`<article>`.

## Common transformations

| Instead of | Use |
|---|---|
| `<div class="header">` | `<header>` |
| `<div class="footer">` | `<footer>` |
| `<div class="nav">` | `<nav>` |
| `<div class="main">` | `<main>` |
| `<div class="content">` | `<main>` or `<article>` |
| `<div class="sidebar">` | `<aside>` |
| `<div class="post">` | `<article>` |
| `<div class="chapter">` | `<section>` |
| `<div class="list">` + `<div>` items | `<ul>` + `<li>` |
| `<div class="paragraph">` | `<p>` |
| `<span class="bold">` | `<strong>` or `<b>` |
| `<span class="italic">` | `<em>` or `<i>` |
| `<span class="link">` | `<a>` |
| `<span class="code">` | `<code>` |

## The cost of `<div>`-itis

Symptoms:
- Nested `<div>`s 6 levels deep
- Classes named `.header`, `.nav`, `.footer` — attempting to recreate semantic
  elements
- No headings between sections
- Screen readers announce "group, group, group"

Effects:
- Worse SEO (search engines rely on semantic structure)
- Worse a11y (no landmarks, no heading hierarchy)
- Harder to style (need class selectors everywhere)
- Harder to maintain (nothing communicates structure)

The fix: replace `<div class="X">` with the semantic element for X whenever one
exists.

## When semantics hurt

Very rare cases where a semantic element is *worse* than a `<div>`:

- **Styling edge cases**: some semantic elements have browser default styles
  that are annoying to override (e.g. `<fieldset>`'s border)
- **Very generic content**: if the content genuinely has no meaning, a `<div>`
  is honest
- **Legacy code**: replacing `<div class="header">` with `<header>` in a large
  codebase can break CSS selectors, but that's a refactor cost, not a semantic
  one

In almost every case, semantic is better. The exceptions are corner cases.

## Practical habit

After writing any `<div>`, ask:

1. **Does it have a heading?** → `<section>`
2. **Is it self-contained?** → `<article>`
3. **Is it a landmark?** → `<header>`, `<nav>`, `<main>`, `<footer>`,
   `<aside>`
4. **Is it just layout?** → keep it as `<div>`

Two seconds of thought saves you rewriting the whole page later.

## Common mistakes

- Wrapping everything in `<div>` "to be safe." Adds nothing, loses meaning.
- Using `<section>` without a heading — that's a `<div>`.
- Using `<article>` for content that isn't self-contained.
- Multiple `<main>` elements.
- Keeping `<div class="nav">` when `<nav>` exists.
- Adding semantic elements without thinking — a `<section>` for a two-word
  block is overkill.

## The takeaway

- Try semantics first — specific elements, then landmarks, then groups
- `<div>` is for layout, styling, and JS hooks when nothing else fits
- Ask: could this content be described by a semantic element?
- Semantic elements are free accessibility and SEO
- `<div>` isn't wrong — it's just the last resort

Use `<div>` when you mean "a box." Use semantics when you mean something more.