---
title: Quotes and Citations — blockquote, q, cite, abbr, address
order: 13
book: html
---

# Quotes and Citations — `blockquote`, `q`, `cite`, `abbr`, `address`

When you quote someone, cite a work, or spell out an abbreviation, there are
specific elements for the job. Using them makes your content more accurate and
more useful to machines.

## `<blockquote>` — long quotes

A block-level quote. Used for extended quotations that stand on their own.

```html
<blockquote>
  <p>The only way to do great work is to love what you do.</p>
</blockquote>
```

Browsers typically render `<blockquote>` as an indented block. That's just
style — you can change it with CSS.

### The `cite` attribute

You can attach a URL pointing to the source:

```html
<blockquote cite="https://example.com/steve-jobs-speech">
  <p>The only way to do great work is to love what you do.</p>
</blockquote>
```

Important: the `cite` attribute is **not displayed to users**. It's just
metadata. If you want the source to be visible, write it out in the content:

```html
<blockquote cite="https://example.com/steve-jobs-speech">
  <p>The only way to do great work is to love what you do.</p>
</blockquote>
<p>— Steve Jobs, 2005 Stanford Commencement</p>
```

Or use `<cite>` inline (see below).

## `<q>` — short inline quotes

A short quote inside a sentence. Browsers add quotation marks automatically.

```html
<p>Steve Jobs once said <q>Stay hungry, stay foolish.</q></p>
```

This renders as: *Steve Jobs once said "Stay hungry, stay foolish."*

The browser inserts the correct quote marks based on the `lang` attribute of
the surrounding context. English gets `"…"`, French gets `«…»`, etc.

### `<blockquote>` vs `<q>`

- `<blockquote>` — for a whole block of quoted material
- `<q>` — for a quoted phrase inside a sentence

```html
<p>In his talk, he said <q>innovation distinguishes</q> between a leader and
a follower.</p>

<blockquote>
  <p>Innovation distinguishes between a leader and a follower.</p>
  <p>— Steve Jobs</p>
</blockquote>
```

Don't wrap `<q>` around `<blockquote>` or vice versa. Don't put `<blockquote>`
inside a `<p>` — it's a block element and will break the paragraph.

## `<cite>` — titles of works

The `<cite>` element is for the **title of a work** — a book, film, song,
painting, paper, etc. Browsers render it in italics by default.

```html
<p>My favorite book is <cite>The Pragmatic Programmer</cite>.</p>
<p>We watched <cite>Blade Runner</cite> last night.</p>
```

Note: `<cite>` is for the *title* of the work, not the *author*. This is a
common mistake. Correct:

```html
<p><cite>The Pragmatic Programmer</cite> by Andrew Hunt and David Thomas.</p>
```

Wrong (but common):

```html
<p><cite>Andrew Hunt</cite> wrote The Pragmatic Programmer.</p>
```

The author is a person, not a work. Just write their name as plain text (or
wrap in `<span>` if you need a hook for styling).

## `<abbr>` — abbreviations

Marks an abbreviation or acronym, with the expanded form available as a
tooltip.

```html
<p>The <abbr title="World Health Organization">WHO</abbr> issued a report.</p>
```

Browsers underline the abbreviation (usually with a dotted line) and show the
`title` as a tooltip on hover. Screen readers may read the expansion.

### When to use `<abbr>`

- First occurrence of an acronym in a document
- Abbreviations that readers might not know

### When not to use `<abbr>`

- Common abbreviations everyone knows (`Mr.`, `Dr.`, `etc.`)
- The same acronym repeated many times — mark it once, not every time

```html
<p>The <abbr title="World Health Organization">WHO</abbr> issued a report.
Later, the WHO (as it's commonly known) released updated guidance.</p>
```

## `<address>` — contact information

Marks contact information for the nearest ancestor `<article>` or the document
as a whole.

```html
<address>
  Written by <a href="mailto:jane@example.com">Jane Doe</a>.<br>
  Visit us at:<br>
  123 Main Street<br>
  Springfield, IL 62701
</address>
```

Browsers render it in italic by default. It's not just for postal addresses —
email, phone, social media handles, and other contact channels all belong
inside `<address>`.

### What `<address>` is not for

It's not for arbitrary addresses (like a shipping address in an order). It's
specifically for **contact information of the document or its author**.

For a shipping address inside an order page, just use a `<p>`:

```html
<p>
  Ship to:<br>
  123 Main Street<br>
  Springfield, IL 62701
</p>
```

## Putting it together

A well-marked-up article quote:

```html
<article>
  <h1>On the Origin of Species</h1>

  <p>In his landmark work, Darwin wrote:</p>

  <blockquote cite="https://example.com/origin-of-species">
    <p>There is grandeur in this view of life, with its several powers, having
    been originally breathed into a few forms or into one.</p>
    <footer>— Charles Darwin, <cite>On the Origin of Species</cite></footer>
  </blockquote>

  <p>This passage appears in the closing paragraph of the
  <abbr title="On the Origin of Species">Origin</abbr>.</p>

  <address>
    Questions? Contact <a href="mailto:editor@example.com">the editor</a>.
  </address>
</article>
```

## Common mistakes

- Using `<cite>` for the author instead of the work's title.
- Relying on the `cite` attribute to display the source. It doesn't — write it
  out in the visible content.
- Wrapping `<q>` around `<blockquote>` or putting `<blockquote>` inside a `<p>`.
- Using `<address>` for any old address instead of contact info.
- Wrapping `<abbr>` around every occurrence of an acronym. Once is enough.
- Using quotation marks manually inside `<q>`. The browser adds them — you'll
  end up with double quotes.

## The takeaway

- `<blockquote>` — block-level quote, optional `cite` attribute (URL only)
- `<q>` — inline quote, browser adds quotes
- `<cite>` — title of a work, not the author
- `<abbr>` — abbreviation with expansion in `title`
- `<address>` — contact info for the document or article
- Write visible sources in content; attributes are metadata only