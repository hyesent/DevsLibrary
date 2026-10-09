---
title: Anchor Links and <nav>
order: 22
book: html
---

# Anchor Links and `<nav>`

Two related tools for navigating *within* a page: fragment links that jump to
specific sections, and the `<nav>` element that marks a group of navigation
links.

## Fragment links

A fragment link is `<a>` with a `href` starting with `#`:

```html
<a href="#pricing">Jump to pricing</a>
```

The browser scrolls to whichever element has a matching `id`. The URL in the
address bar becomes `page.html#pricing`, which is shareable and bookmarkable.

## Setting up the target

Any element with an `id` can be a jump target:

```html
<h2 id="pricing">Pricing</h2>
```

Then link to it:

```html
<a href="#pricing">See pricing</a>
```

## The complete pattern

```html
<h1>Product</h1>

<nav>
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#pricing">Pricing</a></li>
  </ul>
</nav>

<section id="overview">
  <h2>Overview</h2>
  <p>...</p>
</section>

<section id="features">
  <h2>Features</h2>
  <p>...</p>
</section>

<section id="pricing">
  <h2>Pricing</h2>
  <p>...</p>
</section>
```

Clicking any nav link scrolls to the corresponding section. This is the classic
table-of-contents pattern.

## Fragment links on other pages

You can jump to a fragment on a different page by combining the path and
fragment:

```html
<a href="/about#team">Meet the team</a>
```

The browser loads `/about` first, then scrolls to `#team`.

This works for cross-page links in a book, docs site, or any multi-page
structure.

## The `<nav>` element

`<nav>` marks a **major navigation block**. It tells assistive tech: "the links
in here are for navigating the site, not just part of the content."

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

Browsers don't style `<nav>` by default. It's a semantic marker.

## When to use `<nav>`

Use it for:
- The main site menu
- A breadcrumb trail
- A table of contents
- Pagination controls
- A sidebar with section links

Don't use it for:
- Every group of links on the page
- Footer links mixed with other content
- A single "read more" link

The `<nav>` element is for **major** navigation. If every link group is a
`<nav>`, screen readers will announce "navigation" dozens of times, which is
worse than not using it at all.

Rule: if it's not navigation, or it's a small group of links, use a plain
`<ul>` instead.

## Multiple `<nav>` elements

A page can have several `<nav>` elements, as long as each is a **distinct**
navigation block. Label them with `aria-label` so users can tell them apart:

```html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
  </ul>
</nav>

<nav aria-label="Footer">
  <ul>
    <li><a href="/privacy">Privacy</a></li>
    <li><a href="/terms">Terms</a></li>
  </ul>
</nav>
```

Screen readers announce "Main navigation" and "Footer navigation" — much clearer
than two unlabeled navs.

## Table-of-contents pattern

A common use in documentation and books:

```html
<aside>
  <nav aria-label="Table of contents">
    <h2>Contents</h2>
    <ul>
      <li><a href="#intro">Introduction</a></li>
      <li>
        <a href="#basics">Basics</a>
        <ul>
          <li><a href="#variables">Variables</a></li>
          <li><a href="#functions">Functions</a></li>
        </ul>
      </li>
      <li><a href="#advanced">Advanced</a></li>
    </ul>
  </nav>
</aside>
```

The nested `<ul>` reflects hierarchy.

## Smooth scrolling

By default, fragment jumps are instant. For a smoother feel:

```css
html {
  scroll-behavior: smooth;
}
```

Click "Features" → the page smoothly scrolls to that section.

Respect users who've asked for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

## Scroll offset

If your site has a fixed header, fragment jumps land too low — the header
covers the top of the target. Fix with `scroll-margin-top`:

```css
h2[id], h3[id], section[id] {
  scroll-margin-top: 80px;
}
```

Then jumps stop 80px above the target — leaving room for the header.

Alternatively, `scroll-padding-top` on `html`:

```css
html {
  scroll-padding-top: 80px;
}
```

## Back-to-top link

A common UI pattern:

```html
<a href="#top" class="back-to-top">Back to top</a>
```

Where `#top` refers to an element with `id="top"`. Or you can use the special
fragment `#` (empty hash) which scrolls to the very top of the page:

```html
<a href="#">Back to top</a>
```

But `#` also navigates to the top of the document by default, so the `id` isn't
strictly required.

## Skip navigation link

A key accessibility pattern: a link that skips past the navigation to the main
content. It's the first focusable element on the page:

```html
<body>
  <a href="#main" class="skip-link">Skip to content</a>
  <nav>...</nav>
  <main id="main">...</main>
</body>
```

The link is often visually hidden until focused:

```css
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 8px;
  top: 8px;
  padding: 8px 16px;
  background: white;
  border-radius: 4px;
}
```

Screen reader and keyboard users get a fast path to the content. Sighted mouse
users never see it.

## Styling nav menus

Typical nav styling:

```css
nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 24px;
}

nav a {
  text-decoration: none;
  color: inherit;
}

nav a:hover {
  text-decoration: underline;
}
```

Keep the `<ul>` for semantics; strip the markers with CSS.

## Common mistakes

- Using `<nav>` for every group of links, flooding screen readers with
  "navigation" announcements.
- Missing `id`s on the targets of fragment links — the link does nothing.
- Duplicate `id`s on the same page. Only the first matching element gets the
  jump.
- Forgetting `scroll-margin-top` and having content hide behind a fixed header.
- Making navigation lists out of `<div>`s and `<a>`s instead of `<ul>` and
  `<li>` — losing the "list of N items" announcement for screen readers.
- Naming the target `id="top"` and expecting it to be reserved — it's just a
  regular id, and `#top` is a common convention, not a special value.

## The takeaway

- Fragment links (`#id`) jump to a matching `id` on the page
- Combine paths and fragments to jump across pages (`/about#team`)
- `<nav>` marks major navigation blocks
- Label multiple `<nav>`s with `aria-label`
- `scroll-behavior: smooth` for smooth scrolling
- `scroll-margin-top` to offset for fixed headers
- Add a skip link for accessibility
- Don't over-use `<nav>`

Fragment links and `<nav>` are how pages become navigable. Get them right and
every user benefits.