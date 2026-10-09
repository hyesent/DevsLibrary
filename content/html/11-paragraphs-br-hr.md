---
title: Paragraphs, <br>, and <hr>
order: 11
book: html
---

# Paragraphs, `<br>`, and `<hr>`

Three simple elements that control the flow of text: paragraphs for blocks of
prose, `<br>` for line breaks within that prose, and `<hr>` for thematic
breaks between sections.

## `<p>` — paragraphs

The paragraph is the most common element on the web. It wraps a block of
related text.

```html
<p>This is a paragraph. It contains a complete thought, or a few closely
related thoughts, on one topic.</p>

<p>This is a different paragraph. It starts a new topic or continues with
a distinct idea.</p>
```

Browsers render each `<p>` as a block, with space before and after. That space
is not part of the paragraph — it's the browser's default margin. You can
change it with CSS, but the block-level structure stays.

### Whitespace collapses

An important quirk: HTML collapses runs of whitespace. This:

```html
<p>Hello          world.</p>
```

Renders exactly the same as:

```html
<p>Hello world.</p>
```

Multiple spaces, tabs, and newlines all collapse to a single space. This is why
you can't control layout with spaces in your source — you use CSS for that.

### Where a paragraph ends

Browsers automatically close a `<p>` when they hit another block element. So
this:

```html
<p>First
<p>Second
```

Becomes:

```html
<p>First</p>
<p>Second</p>
```

But that's the browser cleaning up after you. Always write the closing `</p>`.

### Can't nest a block inside a paragraph

This is invalid:

```html
<p>Some text <div>and a div</div></p>
```

Browsers close the `<p>` before the `<div>` and re-open it after — with
surprising results. `<p>` can only contain **phrasing content** (text, links,
emphasis, images, etc.), not block elements like `<div>`, `<section>`, `<ul>`,
or another `<p>`.

## `<br>` — line break

A `<br>` inserts a line break within the same block of text. It's a void
element — no closing tag.

```html
<p>
  Roses are red,<br>
  Violets are blue,<br>
  HTML is simple,<br>
  And so are you.
</p>
```

Each `<br>` forces the next content onto a new line, without ending the
paragraph. The whole thing remains one `<p>` element.

### When to use `<br>`

- Inside addresses:

```html
<p>
  123 Main Street<br>
  Springfield, IL 62701<br>
  USA
</p>
```

- In poetry, song lyrics, or verse
- In code samples where line breaks are meaningful

### When NOT to use `<br>`

The biggest misuse: separating paragraphs.

```html
<p>First paragraph</p>
<br><br>
<p>Second paragraph</p>
```

That's wrong. Paragraphs already have spacing. If you want more space, that's
CSS (`margin-bottom`).

Other bad uses:

- To force text onto the next line for layout reasons. Use CSS.
- To add vertical space between elements. Use CSS.
- Between list items. `<li>` is already a block.

Rule of thumb: **`<br>` is for line breaks *within* a single conceptual unit**,
not for separating units.

## `<hr>` — thematic break

A `<hr>` represents a thematic break — a shift in topic, a scene change, a
section break. It's a void element.

```html
<p>The hero set off at dawn.</p>

<hr>

<p>Three days later, he reached the mountains.</p>
```

The `<hr>` here signals a jump in time or place. It's not just a decorative
line — it's a semantic marker that says "something changed."

Browsers render `<hr>` as a horizontal line by default, but the visual is
secondary. You can style it however you want (thick, thin, dashed, invisible
even) — the semantic meaning stays.

### The rule change in HTML5

In HTML4, `<hr>` meant "horizontal rule" — a purely visual separator.

In HTML5, `<hr>` means "thematic break." It's semantic. It says the content
before and after are separate topics.

Don't use `<hr>` just to draw a line. Use CSS (`border-top`) for decoration.
Use `<hr>` only when the content genuinely shifts.

### Examples of valid `<hr>` use

- Between scenes in a story
- Between blog posts in a feed
- Between major sections of a long article
- Before a "related articles" list at the end of a piece

### Examples of invalid `<hr>` use

- To draw a decorative line under a heading
- Between every paragraph
- As a spacer to add vertical gaps

## Interaction with other elements

Since `<p>`, `<br>`, and `<hr>` are all about flow:

- `<br>` is **inside** a `<p>` — same block, new line
- `<hr>` is **between** blocks — signals a break
- `<p>` is the block itself

```html
<h2>Chapter 1</h2>
<p>It was a dark and stormy night.<br>The wind howled outside.</p>

<hr>

<h2>Chapter 2</h2>
<p>By morning, the storm had passed.</p>
```

## Common mistakes

- Using `<br><br>` to separate paragraphs. Use two `<p>` tags instead.
- Using `<br>` to add vertical spacing. That's a job for CSS margin.
- Using `<hr>` as a decorative line under headings. Use `border-bottom` in CSS.
- Forgetting that `<br>` and `<hr>` are void elements — no `</br>` or `</hr>`.
- Nesting a block element inside `<p>`. The browser will fight you.
- Expecting multiple spaces in the source to render as multiple spaces. They
  collapse.

## The takeaway

- `<p>` wraps a paragraph — a block of related text
- `<br>` forces a line break **within** a block
- `<hr>` marks a **thematic break** between sections
- All three are about flow, not appearance
- Whitespace collapses — layout belongs to CSS
- Void elements (`<br>`, `<hr>`) don't have closing tags