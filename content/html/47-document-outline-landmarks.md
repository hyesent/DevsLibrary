---
title: Document Outline and Landmark Roles
order: 47
book: html
---

# Document Outline and Landmark Roles

Two related ideas: the outline your headings create, and the landmarks screen
readers use to navigate. Both are invisible to sighted users and essential to
everyone else.

## The document outline

The outline is the structure implied by your headings:

```html
<h1>My Blog</h1>
  <h2>Latest posts</h2>
    <h3>How to bake sourdough</h3>
    <h3>Why TypeScript matters</h3>
  <h2>About</h2>
    <h3>My background</h3>
```

As an outline:

```
My Blog
├── Latest posts
│   ├── How to bake sourdough
│   └── Why TypeScript matters
└── About
    └── My background
```

Screen readers can navigate this outline — jump heading to heading, drill into
subsections.

## The old HTML5 outline algorithm

HTML5 originally proposed an algorithm where sectioning elements (`<article>`,
`<section>`, `<aside>`, `<nav>`) would automatically affect heading levels.
`<h1>` inside a `<section>` inside an `<article>` would be treated as level 3,
regardless of the actual tag.

**This never shipped.** Browsers and screen readers don't implement it. Modern
practice: **use headings by their actual level**.

- If it's a top-level heading, use `<h1>`
- If it's a subsection of an `<h2>`, use `<h3>`
- Never rely on nesting to imply levels

## Current best practice

- **One `<h1>` per page** — the page title
- **Sequential levels** — never skip (h1 → h2 → h3)
- **Sections have headings** — if it's a `<section>`, it should have an `<h2>`
  (or appropriate level)
- **Don't use headings for styling** — use CSS

```html
<main>
  <h1>The Complete HTML Guide</h1>

  <section>
    <h2>Getting started</h2>

    <section>
      <h3>Installing a text editor</h3>
      <p>...</p>
    </section>

    <section>
      <h3>Your first page</h3>
      <p>...</p>
    </section>
  </section>

  <section>
    <h2>Advanced topics</h2>
    <p>...</p>
  </section>
</main>
```

The outline reflects the hierarchy of topics.

## Landmarks

Landmarks are the major regions of a page — header, nav, main, footer, etc.
Screen readers provide shortcuts to jump between them.

HTML elements map to landmarks automatically:

| Element | Role |
|---|---|
| `<main>` | main |
| `<nav>` | navigation |
| `<aside>` | complementary |
| `<header>` (page-level) | banner |
| `<footer>` (page-level) | contentinfo |
| `<section>` with accessible name | region |
| `<form>` with accessible name | form |
| `<search>` | search |

## Nested header/footer caveat

Page-level `<header>` gets role `banner`. But a `<header>` inside an
`<article>` or `<section>` is **not** a banner — it's just the article's
header. The browser handles this automatically based on context.

Same for `<footer>`: page-level gets `contentinfo`; nested ones don't.

## Sections as regions

A `<section>` becomes a "region" landmark **only if it has an accessible name**
— usually from an `aria-label` or `aria-labelledby`:

```html
<section aria-labelledby="news-title">
  <h2 id="news-title">Latest news</h2>
  <p>...</p>
</section>
```

Now screen readers can jump to it as "Latest news, region."

Without the label, `<section>` has no landmark role — it's just a generic
container.

## Forms as landmarks

A `<form>` becomes a landmark if it has an accessible name:

```html
<form aria-labelledby="signup-title">
  <h2 id="signup-title">Sign up</h2>
  ...
</form>
```

Screen readers can jump to "Sign up, form."

This is useful when a page has multiple forms (sign up, sign in, search,
contact) — users can jump between them.

## Labeling landmarks with `aria-label`

When you have multiple landmarks of the same type, label them:

```html
<nav aria-label="Main">
  <!-- primary navigation -->
</nav>

<nav aria-label="Footer">
  <!-- footer navigation -->
</nav>
```

Screen readers announce "Main navigation" and "Footer navigation."

Also useful for `<aside>`:

```html
<aside aria-label="Related articles">
  ...
</aside>
```

## The skip-to-content pattern

Given the landmarks, a skip link can jump directly to `<main>`:

```html
<a href="#main" class="skip-link">Skip to content</a>
<header>...</header>
<main id="main">...</main>
```

Because `<main>` is a landmark with `id="main"`, the fragment link works.
Without landmarks, you'd have to give everything an id.

## What a good page looks like

```html
<body>
  <a href="#main" class="skip-link">Skip to content</a>

  <header>
    <h1>My Site</h1>
    <nav aria-label="Main">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <h2>Page title</h2>

    <section aria-labelledby="post-1-title">
      <h3 id="post-1-title">First post</h3>
      <p>...</p>
    </section>

    <section aria-labelledby="post-2-title">
      <h3 id="post-2-title">Second post</h3>
      <p>...</p>
    </section>
  </main>

  <aside aria-label="About the author">
    <h2>About</h2>
    <p>...</p>
  </aside>

  <footer>
    <p>&copy; 2024 My Site</p>
    <nav aria-label="Footer">
      <ul>
        <li><a href="/privacy">Privacy</a></li>
      </ul>
    </nav>
  </footer>
</body>
```

Full outline, landmarks labeled, skip link at the top. A screen reader user can:

- Jump to main content (skip link)
- Navigate by heading (outline)
- Navigate by landmark (banner, nav, main, complementary, contentinfo, form,
  region)

## ARIA landmark roles

You can also apply landmarks with ARIA roles when the HTML elements don't fit:

```html
<div role="banner">...</div>
<div role="navigation">...</div>
<div role="main">...</div>
<div role="complementary">...</div>
<div role="contentinfo">...</div>
<div role="search">...</div>
<div role="form" aria-label="Search">...</div>
```

But **prefer the native elements.** ARIA roles were designed for cases where
the element doesn't exist or can't be used. Semantic HTML is always better
than ARIA when both options exist.

Rule: **no ARIA is better than bad ARIA.** Use semantic HTML. Reach for ARIA
only when you must.

## The `<search>` element

New in HTML (2023+, supported in modern browsers):

```html
<search>
  <form>
    <label for="q">Search</label>
    <input id="q" type="search" name="q">
    <button type="submit">Go</button>
  </form>
</search>
```

Replaces `<div role="search">`. Semantically marks a search region.

## Testing landmarks

**Screen reader test**: Enable VoiceOver / NVDA. Press the landmark navigation
key (usually a modifier + a specific key). You should hear:

- "Banner"
- "Navigation" (possibly named)
- "Main"
- "Complementary"
- "Contentinfo"
- "Form" (if named)

If any of those are missing, the corresponding element is missing from your
HTML.

**Chrome DevTools**: Accessibility panel shows the accessibility tree. Look
under "Landmarks" or "Roles" to see what's recognized.

## Common mistakes

- No landmarks at all — a page of `<div>`s.
- Multiple `<main>` elements.
- `<nav>` for every link group.
- `<section>` without an accessible name, expecting it to be a landmark.
- Heading hierarchy that skips levels.
- Multiple `<h1>` elements.
- Relying on the abandoned HTML5 outline algorithm.
- Labeling every `<section>` with `aria-label` when only some are landmarks.

## The takeaway

- The document outline is the structure your headings create
- Screen readers navigate both by heading and by landmark
- Landmarks come from `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`,
  `<form>` (named), `<section>` (named)
- Label multiple landmarks of the same type
- Prefer semantic elements over ARIA roles
- One `<h1>`, sequential heading levels
- Test with a screen reader to confirm

Get the outline and landmarks right and every screen reader user has a map of
your page.