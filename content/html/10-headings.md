---
title: Headings — <h1> through <h6>
order: 10
book: html
---

# Headings — `<h1>` through `<h6>`

Headings describe the **structure** of your content. They're not about size.
They're not about boldness. They're about hierarchy — what's the main topic,
what are the sub-topics, what are the sub-sub-topics.

There are six levels. Use them like a book uses chapters, sections, and
subsections.

## The six levels

```html
<h1>Main title of the page</h1>
<h2>Major section</h2>
<h3>Subsection of the h2 above</h3>
<h4>Sub-subsection</h4>
<h5>Deeper still</h5>
<h6>Deepest</h6>
```

`<h1>` is the highest level. `<h6>` is the lowest. Both browsers and assistive
technology treat them as a hierarchy.

## Structure, not style

This is the single most important idea in this lesson: **headings describe
meaning, not appearance.**

The browser *happens* to render `<h1>` large and bold, and `<h6>` small — but
that's a default style you can override with CSS. The purpose of the tag is
structural.

You don't pick `<h2>` because you want medium-sized text. You pick it because
the content under it is a subsection of the current `<h1>`.

If you want big text, that's a job for CSS (`font-size: 2rem`), not a job for
picking a bigger heading level.

## A typical document outline

```html
<h1>The Complete HTML Guide</h1>

  <h2>Document Structure</h2>
    <h3>The doctype</h3>
    <h3>The html element</h3>

  <h2>Text Content</h2>
    <h3>Headings</h3>
    <h3>Paragraphs</h3>
    <h3>Emphasis</h3>

  <h2>Links</h2>
    <h3>Absolute and relative paths</h3>
    <h3>Anchor links</h3>
```

Notice: every `h3` has an `h2` above it. Every `h2` has an `h1` above it.
That's the rule — **never skip levels**.

## One `<h1>` per page

Best practice: exactly one `<h1>` per page. It's the title of the page.

Multiple `<h1>` tags are technically valid HTML, but they confuse screen
readers and search engines. If the page is about one thing, it has one main
title.

For a landing page with three products, that's three sections — one `<h1>` for
the page, and `<h2>` for each product.

## Don't skip levels

Bad:

```html
<h1>Title</h1>
  <h3>Subsection</h3>  <!-- skipped h2 -->
```

Good:

```html
<h1>Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
```

Skipping levels breaks the outline. Screen readers use headings to build a
table of contents for the page — jumping from `<h1>` to `<h3>` creates a gap
that's confusing to navigate.

If you want your `<h2>` to visually look smaller, use CSS. Don't skip to `<h3>`
just because you prefer the size.

## Headings vs other bold things

You might be tempted to do this:

```html
<p><strong><font size="5">Section title</font></strong></p>
```

That's a section title pretending to be a paragraph. The browser will show it
in bold large text, but it's not a heading — screen readers won't find it in
the outline, search engines won't weight it as a topic.

Do this instead:

```html
<h2>Section title</h2>
```

If you want to restyle it, use CSS.

## Headings are for structure, not emphasis

A heading is a *label* for a block of content. It's not "make this line
important." For that, use `<strong>`.

Use a heading when:
- It's the title of a section
- The content below it is *about* the heading
- Removing the heading would make the section ambiguous

Don't use a heading:
- Just to make text bigger
- For visual effect
- As a label on a form (use `<label>`)

## Why this matters

Screen reader users often navigate pages by **jumping between headings**.
They'll press a key and hear the next `<h2>`, then the next one, etc. If your
page has clean heading structure, they can skim it in seconds. If your headings
are missing or jumbled, they have to read the whole page.

Search engines also use headings to understand topic structure. A well-tagged
page ranks better for its topic.

Both benefits cost you nothing — just write the right tag.

## Real-world example

Here's a blog post structure done right:

```html
<h1>How to Bake Sourdough Bread at Home</h1>

<p>Intro paragraph explaining what the article covers.</p>

<h2>Ingredients</h2>
<ul>...</ul>

<h2>Equipment</h2>
<ul>...</ul>

<h2>Step-by-step instructions</h2>

  <h3>Day 1: Making the starter</h3>
  <p>...</p>

  <h3>Day 2: Mixing the dough</h3>
  <p>...</p>

  <h3>Day 3: Baking</h3>
  <p>...</p>

<h2>Troubleshooting</h2>

  <h3>Why is my bread flat?</h3>
  <p>...</p>

  <h3>Why is the crust pale?</h3>
  <p>...</p>

<h2>Conclusion</h2>
<p>...</p>
```

One `<h1>`, logical `<h2>` sections, `<h3>` subsections where appropriate, no
skipped levels. Every section is labeled by its heading.

## Common mistakes

- Using `<h1>`–`<h6>` for their *size* instead of their *meaning*. Sizes belong
  to CSS.
- Multiple `<h1>` tags on the same page.
- Skipping heading levels (going straight from `<h1>` to `<h3>`).
- Using a `<div class="heading">` instead of a real heading tag — screen
  readers won't see it.
- Wrapping a heading inside a `<p>` or `<strong>`. Headings stand on their own.
- No headings at all. Long pages of wall-to-wall text are unreadable to
  assistive tech.

## The takeaway

- Six levels: `<h1>` to `<h6>`
- They describe **structure**, not size
- One `<h1>` per page — the main title
- Never skip levels
- Use CSS to change their appearance, not the heading level
- Screen readers and search engines rely on them heavily

Headings are the skeleton of your document. Get them right and everything else
falls into place.