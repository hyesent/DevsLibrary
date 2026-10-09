---
title: Description Lists — <dl>, <dt>, <dd>
order: 18
book: html
---

# Description Lists — `<dl>`, `<dt>`, `<dd>`

A description list pairs **terms** with **definitions**. It's not a list of
items — it's a list of *pairs*. Three elements:

- `<dl>` — the description list container
- `<dt>` — a term
- `<dd>` — that term's description

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language.</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets.</dd>
</dl>
```

Browsers indent the `<dd>` under its `<dt>` by default.

## When to use `<dl>`

Whenever you have term-and-definition pairs:

- A glossary
- A FAQ (question + answer)
- Metadata (key + value pairs)
- A dictionary entry
- Product specs (attribute + value)

```html
<dl>
  <dt>Author</dt>
  <dd>Jane Doe</dd>

  <dt>Published</dt>
  <dd>March 2024</dd>

  <dt>Pages</dt>
  <dd>312</dd>
</dl>
```

## The three elements

### `<dl>` — description list

The container. Direct children should be `<dt>`, `<dd>`, or `<div>` (which can
wrap a `<dt>`/`<dd>` pair).

### `<dt>` — description term

The term being described. Can be a word, a phrase, a name, etc.

### `<dd>` — description details

The description of the preceding `<dt>`. Can be a paragraph, several
paragraphs, or even another list.

## Multiple terms, one description

If a term has multiple names:

```html
<dl>
  <dt>HTML</dt>
  <dt>HyperText Markup Language</dt>
  <dd>The standard markup language of the web.</dd>
</dl>
```

Both terms share the same `<dd>`.

## One term, multiple descriptions

If a term has several meanings:

```html
<dl>
  <dt>Bank</dt>
  <dd>A financial institution.</dd>
  <dd>The side of a river.</dd>
</dl>
```

Two `<dd>` elements under one `<dt>`.

## Grouping with `<div>`

In HTML5, you can wrap a `<dt>`/`<dd>` pair in a `<div>` for styling:

```html
<dl>
  <div>
    <dt>HTML</dt>
    <dd>HyperText Markup Language.</dd>
  </div>
  <div>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets.</dd>
  </div>
</dl>
```

This is valid and useful when you need to style each pair as a unit (like for
grid layout).

## Description lists for metadata

A common pattern: using `<dl>` for post metadata.

```html
<article>
  <h1>How to Bake Sourdough</h1>
  <dl>
    <dt>Author</dt>
    <dd>Jane Doe</dd>
    <dt>Published</dt>
    <dd><time datetime="2024-03-15">March 15, 2024</time></dd>
    <dt>Category</dt>
    <dd>Baking</dd>
  </dl>
  <p>Article content...</p>
</article>
```

Better than a series of `<div>`s or a fake list.

## Description lists for FAQs

```html
<dl>
  <dt>What is HTML?</dt>
  <dd>HTML stands for HyperText Markup Language, and it's the standard way to
  structure content on the web.</dd>

  <dt>Do I need to learn CSS first?</dt>
  <dd>No. You can learn HTML and CSS side by side.</dd>

  <dt>Is HTML a programming language?</dt>
  <dd>No. It's a markup language. It describes structure, not logic.</dd>
</dl>
```

Clean and semantically correct.

## Styling

By default, browsers indent the `<dd>` under the `<dt>`. You can change that:

```css
dl {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 8px 20px;
}

dt {
  font-weight: 600;
}

dd {
  margin: 0;
}
```

That gives a two-column layout with term on the left, definition on the right.
Nice for metadata.

## `<dl>` vs `<ul>` vs `<ol>`

Quick decision table:

| Content | Element |
|---|---|
| Shopping list | `<ul>` |
| Recipe steps | `<ol>` |
| Glossary | `<dl>` |
| FAQ | `<dl>` |
| Feature list | `<ul>` |
| Product specs | `<dl>` |
| Ranking | `<ol>` |

Ask: does each item have a **description**? If yes → `<dl>`. If items stand
alone → `<ul>` or `<ol>`.

## Common mistakes

- Using `<dl>` for a list of items that don't have descriptions. Use `<ul>`.
- Forgetting to close a `<dt>` or `<dd>`, which causes the browser to nest
  things unpredictably.
- Putting text directly inside `<dl>` — only `<dt>` and `<dd>` (and `<div>`)
  belong inside.
- Using `<dl>` just to get the indented-look of a browser's default styling.
  That's abuse — use CSS on a real list.
- Writing a single `<dd>` without a preceding `<dt>`. Every `<dd>` needs a term.

## The takeaway

- `<dl>` — a description list
- `<dt>` — a term
- `<dd>` — the term's description
- Multiple `<dt>` can share one `<dd>`; one `<dt>` can have multiple `<dd>`
- Use for glossaries, FAQs, metadata, specs
- Not for plain lists — that's `<ul>` or `<ol>`
- Wrap pairs in `<div>` to style them together

When your content is a set of term-definition pairs, `<dl>` is the right tool.