---
title: Semantic Structure — header, footer, main, section, article, aside, nav
order: 45
book: html
---

# Semantic Structure

Semantic elements describe the *role* of a region of the page. They replace
`<div class="header">` with `<header>` and give meaning to your layout.

## Why semantics matter

You can build any layout with `<div>`. Semantics don't change the visuals. They
change what the page *means* to:

- **Screen readers** — landmark navigation
- **Search engines** — topic understanding
- **Browsers** — reader mode, print
- **Other developers** — reading your markup

A page of `<div>`s is a page of "something." A page of `<header>`, `<nav>`,
`<main>`, `<article>`, `<aside>`, `<footer>` is a page with structure.

## The eight landmarks

| Element | Purpose |
|---|---|
| `<header>` | Introductory content |
| `<nav>` | Navigation links |
| `<main>` | The dominant content |
| `<article>` | Self-contained composition |
| `<section>` | Thematic grouping |
| `<aside>` | Tangential content |
| `<footer>` | Closing content |
| `<form>` | A form (also a landmark) |

Screen readers can jump between these. Keyboard users get shortcuts.

## `<header>`

Introductory content for a page, article, or section. Usually contains the
site title, logo, and primary navigation.

```html
<header>
  <h1>My Site</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
```

The page-level `<header>` is usually unique. But you can have multiple — one per
`<article>` or `<section>`:

```html
<article>
  <header>
    <h2>Post title</h2>
    <p>Published <time datetime="2024-03-15">March 15, 2024</time></p>
  </header>
  <p>Post content...</p>
</article>
```

Not the same as `<head>`. `<head>` holds metadata; `<header>` holds visible
page intro content.

## `<nav>`

Major navigation blocks — site menus, table of contents, breadcrumbs,
pagination.

```html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
  </ul>
</nav>
```

Use for major navigation. Not every group of links is a `<nav>` — that would
flood screen readers with "navigation" announcements. Label multiple navs with
`aria-label`.

## `<main>`

The dominant content of the page. One per page (usually).

```html
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <h1>Page title</h1>
    <p>Primary content...</p>
  </main>
  <footer>...</footer>
</body>
```

**Only one visible `<main>` per page.** Screen readers use it as a shortcut:
"jump to main content." Hidden `<main>` elements are allowed (for modals, for
example), but only one visible.

Don't nest `<main>` inside `<article>` or `<section>`. It's a page-level
landmark.

## `<article>`

A self-contained piece of content. If you could pull it out of the page and
it still makes sense, it's an article.

Good fits:
- Blog posts
- News articles
- Forum posts
- Product cards
- User-submitted comments

```html
<article>
  <header>
    <h2>How to Bake Sourdough</h2>
    <p>By Jane Doe</p>
  </header>
  <p>...</p>
</article>
```

Articles can nest — comments inside a post, posts inside a feed:

```html
<article>
  <h2>Post title</h2>
  <p>Post content...</p>

  <section>
    <h3>Comments</h3>
    <article>
      <p>First comment.</p>
    </article>
    <article>
      <p>Second comment.</p>
    </article>
  </section>
</article>
```

## `<section>`

A thematic grouping of content. Usually has a heading.

```html
<section>
  <h2>Features</h2>
  <p>Our product does X, Y, and Z.</p>
</section>

<section>
  <h2>Pricing</h2>
  <p>Plans start at $9/month.</p>
</section>
```

The rule: **a `<section>` should have a heading**. If it doesn't, it's
probably a `<div>`.

Don't use `<section>` just to wrap things. That's what `<div>` is for. Use
`<section>` when the content is a distinct thematic block.

## `<aside>`

Content that's tangentially related to the surrounding content:

```html
<article>
  <h2>Understanding CSS Grid</h2>
  <p>Main content...</p>

  <aside>
    <h3>Related</h3>
    <ul>
      <li><a href="/flexbox">Flexbox guide</a></li>
      <li><a href="/layout">Layout patterns</a></li>
    </ul>
  </aside>
</article>
```

Common uses:
- Sidebars
- Pull quotes
- Related articles
- Advertisements
- Author bios

The distinction from `<section>`: `<section>` is *part of* the main content;
`<aside>` is *in addition to* it.

## `<footer>`

Closing content — copyright, related links, contact info.

```html
<footer>
  <p>&copy; 2024 My Site</p>
  <nav aria-label="Footer">
    <ul>
      <li><a href="/privacy">Privacy</a></li>
      <li><a href="/terms">Terms</a></li>
    </ul>
  </nav>
</footer>
```

Like `<header>`, can be page-level or per-article.

## A complete page

```html
<body>
  <header>
    <h1>My Blog</h1>
    <nav aria-label="Main">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Latest posts</h1>

    <article>
      <header>
        <h2>First post</h2>
        <p>Posted on <time datetime="2024-03-15">March 15</time></p>
      </header>

      <section>
        <h3>Introduction</h3>
        <p>...</p>
      </section>

      <section>
        <h3>Details</h3>
        <p>...</p>
      </section>

      <aside>
        <h3>Sidebar</h3>
        <p>Related links...</p>
      </aside>

      <footer>
        <p>Tags: html, semantics</p>
      </footer>
    </article>

    <article>
      <h2>Second post</h2>
      <p>...</p>
    </article>
  </main>

  <aside>
    <h2>About me</h2>
    <p>Short bio...</p>
  </aside>

  <footer>
    <p>&copy; 2024 My Blog</p>
  </footer>
</body>
```

Every region has a semantic meaning. A screen reader can list the landmarks
and jump to any of them.

## Common mistakes

- Multiple visible `<main>` elements.
- `<section>` without a heading — use `<div>` instead.
- Everything wrapped in `<section>` "just in case."
- Using `<article>` for content that isn't self-contained.
- Using `<aside>` for content that's actually part of the main flow.
- `<nav>` for every group of links — only major navigation.
- Not using `<nav>` for actual site navigation. That's the whole point.

## The takeaway

- `<header>` — intro content, page or article level
- `<nav>` — major navigation
- `<main>` — one per page, the dominant content
- `<article>` — self-contained, could stand alone
- `<section>` — thematic group, has a heading
- `<aside>` — tangential content
- `<footer>` — closing content
- `<div>` — when nothing else fits

Semantics are invisible to sighted users but essential to assistive tech and
search engines. Use them wherever the meaning fits.