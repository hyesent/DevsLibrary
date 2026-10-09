---
title: Skip Links and Navigation Patterns
order: 23
book: html
---

# Skip Links and Navigation Patterns

A "skip link" is a link that jumps past repeated content — usually the
navigation — straight to the main content. It's a small feature with a big
payoff for keyboard and screen reader users.

## The problem

Imagine a site with a header, a nav menu with 30 links, a sidebar with 20 more,
and a main content area. A keyboard user tabs through every single navigation
link before reaching the actual content. Every page. Every time. That's 50+
keystrokes before doing anything useful.

A skip link fixes this: one Tab press, one Enter, and they're at the content.

## Basic implementation

The skip link must be the **first focusable element** on the page:

```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <h1>Page title</h1>
    <p>Content...</p>
  </main>
</body>
```

The link points to `#main`, and the `<main>` element has `id="main"`. When
focused and activated, the browser jumps focus to the main content.

## Hiding it until focus

The skip link should be visually hidden for mouse users but appear when focused
via keyboard.

The classic approach:

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.skip-link:focus {
  position: static;
  width: auto;
  height: auto;
  left: auto;
  padding: 12px 20px;
  background: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  outline: 2px solid #fff;
  outline-offset: 2px;
}
```

The link is off-screen until Tab reaches it. On focus, it appears in the top-
left corner (or wherever you position it).

A cleaner modern approach:

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  padding: 12px 20px;
  background: #000;
  color: #fff;
  border-radius: 6px;
  z-index: 100;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 16px;
}
```

Simpler, animatable, and screen readers still announce it (since it's in the
DOM, not `display: none`).

## Making the jump actually move focus

Clicking (or Enter on) a fragment link moves the URL hash. It moves focus in
some browsers, not all. To be safe, add `tabindex="-1"` to the target:

```html
<main id="main" tabindex="-1">
```

`tabindex="-1"` makes the element focusable via JavaScript and fragment
navigation, but not part of the normal Tab order. It's a common fix.

## Multiple skip links

For complex pages, you might offer more than one:

```html
<a href="#main" class="skip-link">Skip to main content</a>
<a href="#search" class="skip-link">Skip to search</a>
<a href="#footer" class="skip-link">Skip to footer</a>
```

The first Tab reveals the first link; if not activated, the next Tab moves on.
The one the user needs is reachable fast.

In practice most sites have one — the main content. Multiple can overwhelm.

## Common navigation patterns

### Primary navigation

The main menu at the top (or side) of every page:

```html
<header>
  <nav aria-label="Main">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li><a href="/docs">Docs</a></li>
      <li><a href="/blog">Blog</a></li>
    </ul>
  </nav>
</header>
```

`aria-current="page"` marks the current page. Screen readers announce "Home,
current page."

### Breadcrumbs

Shows the path to the current page in a hierarchy:

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li><a href="/docs/html" aria-current="page">HTML</a></li>
  </ol>
</nav>
```

Uses `<ol>` (ordered) because the path has sequence. Separators (like `/` or
`>`) are added with CSS `::after`, not as text:

```css
nav[aria-label="Breadcrumb"] li + li::before {
  content: " / ";
  padding: 0 8px;
  color: #888;
}
```

### Pagination

For a list of results or pages:

```html
<nav aria-label="Pagination">
  <ul>
    <li><a href="?page=1" aria-label="Previous page">Prev</a></li>
    <li><a href="?page=1">1</a></li>
    <li><a href="?page=2" aria-current="page">2</a></li>
    <li><a href="?page=3">3</a></li>
    <li><a href="?page=3" aria-label="Next page">Next</a></li>
  </ul>
</nav>
```

### Table of contents

```html
<nav aria-label="Table of contents">
  <h2>On this page</h2>
  <ul>
    <li><a href="#intro">Introduction</a></li>
    <li><a href="#setup">Setup</a></li>
    <li><a href="#usage">Usage</a></li>
  </ul>
</nav>
```

### Sidebar navigation

```html
<aside>
  <nav aria-label="Section navigation">
    <ul>
      <li><a href="/docs/getting-started">Getting started</a></li>
      <li><a href="/docs/installation">Installation</a></li>
      <li><a href="/docs/configuration">Configuration</a></li>
    </ul>
  </nav>
</aside>
```

## `aria-current`

Marks the "current" item in a set — useful for:
- `page` — the current page in navigation
- `step` — the current step in a process
- `location` — the current page in breadcrumbs
- `date` — the current date in a calendar
- `time` — the current time in a schedule

```html
<a href="/docs" aria-current="page">Docs</a>
```

Screen readers announce the current state, so a keyboard user knows where they
are.

## `<header>`, `<footer>`, and their roles

The `<header>` element contains a page's intro content — usually a logo, title,
and primary navigation. There can be multiple `<header>` elements on a page
(one per `<article>` or `<section>`), but usually just one at the page level.

The `<footer>` element contains closing content — copyright, related links,
contact info. Same deal: can be per-article or per-page.

Neither is required to be "sticky" or "fixed" — those are CSS decisions.

## Sticky header + skip link

If your header is sticky (`position: sticky` or `fixed`), the skip link jump
will land the content under the header. Fix with `scroll-margin-top`:

```css
#main {
  scroll-margin-top: 80px;
}
```

## Common mistakes

- Putting the skip link after the nav in the DOM. It must be first.
- Hiding it with `display: none` — that removes it from the accessibility tree
  and the tab order. Use the off-screen technique instead.
- Forgetting `tabindex="-1"` on the target, so focus doesn't move as expected.
- Using `aria-label` that duplicates visible text. Screen readers read both.
- Naming the target `#content` but the actual `<main>` has a different id.
- On sticky headers, forgetting `scroll-margin-top`.
- Using `<div>` for navigation instead of `<nav>` — screen reader users lose
  the "navigation" landmark.

## The takeaway

- Skip links let keyboard users jump past navigation to content
- The link must be first in the DOM
- Hide it off-screen, reveal it on `:focus`
- Add `tabindex="-1"` to the target for reliable focus movement
- Use `<nav>` for major navigation, label with `aria-label` if more than one
- Mark the current item with `aria-current="page"`
- Offset for sticky headers with `scroll-margin-top`

Small feature, huge payoff. Add a skip link to every site you build.