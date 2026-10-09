---
title: <title>, <link>, <script>, <style>, and Comments
order: 9
book: html
---

# `<title>`, `<link>`, `<script>`, `<style>`, and Comments

These are the other elements that live inside `<head>`, plus the syntax for
comments. Each has one job. Get them right and your page behaves predictably.

## `<title>`

```html
<title>The Complete HTML Guide</title>
```

The title is:
- What appears in the browser tab
- What appears in bookmarks
- What appears as the clickable headline in search results
- What screen readers announce when navigating to the page

Every page must have a title. It should be short (under 60 characters so it
doesn't get truncated in search results), and it should describe *that specific
page*, not the whole site.

Bad:
```html
<title>My Website</title>
```

Good:
```html
<title>Form Validation in HTML — The Complete Guide</title>
```

Search result convention is often:

```
Page Name — Site Name
```

Only one `<title>` per page. If you include multiple, browsers use the first.

## `<link>`

A void element that links the current document to another resource. The most
common use by far is linking a stylesheet:

```html
<link rel="stylesheet" href="/styles/main.css">
```

The `rel` attribute describes the relationship. Common values:

| `rel` value | Purpose |
|---|---|
| `stylesheet` | External CSS file |
| `icon` | Favicon |
| `apple-touch-icon` | iOS home-screen icon |
| `canonical` | Preferred URL for SEO |
| `preload` | Hint that a resource is needed soon |
| `prefetch` | Hint that a resource may be needed soon |
| `manifest` | PWA manifest file |
| `alternate` | Feed link, translated version, etc. |
| `preconnect` | Open a connection early |

### Stylesheet

```html
<link rel="stylesheet" href="/styles/main.css">
```

You can use `media` to conditionally apply:

```html
<link rel="stylesheet" href="print.css" media="print">
<link rel="stylesheet" href="mobile.css" media="(max-width: 600px)">
```

### Favicon

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

### Canonical

```html
<link rel="canonical" href="https://example.com/html-guide">
```

Tells search engines: "this is the preferred URL for this content." Useful when
the same content is reachable via multiple URLs.

## `<style>`

Inline CSS, inside `<head>`:

```html
<style>
  body {
    background: #0b0f17;
    color: #eef4ff;
  }
</style>
```

This works. It avoids a network request. But for anything beyond a few rules,
external CSS via `<link>` is better — it can be cached across pages and
separates concerns.

For a single-page tool or a landing page, inline `<style>` is fine. For a real
site, use `<link>`.

## `<script>`

Loads JavaScript. Two forms:

```html
<script src="app.js"></script>
<script>
  console.log('inline');
</script>
```

### The blocking problem

By default, when the browser hits `<script src="...">`, it **stops parsing the
page**, downloads the script, runs it, then continues. If the script is slow to
download, the page freezes on a blank screen.

### The fix: `defer` and `async`

```html
<script src="app.js" defer></script>
<script src="analytics.js" async></script>
```

| Attribute | Behavior |
|---|---|
| (none) | Blocks parsing. Downloads, then runs. |
| `defer` | Downloads in parallel, runs after parsing completes, **in order** |
| `async` | Downloads in parallel, runs as soon as it's ready, **in any order** |

For most app scripts, use `defer`. Use `async` for independent scripts like
analytics that don't rely on each other.

### `<noscript>`

Content shown only when JavaScript is disabled:

```html
<noscript>
  <p>This site requires JavaScript to work.</p>
</noscript>
```

Rarely needed for modern sites, but good to know.

## Comments

Comments are for humans. Browsers ignore them.

```html
<!-- This is a comment -->
```

Everything between `<!--` and `-->` is ignored. Comments can span multiple
lines:

```html
<!--
  Multi-line
  comment
-->
```

You can't nest comments. `<!-- <!-- --> -->` doesn't work — the first `-->`
ends the comment, and the trailing `-->` becomes visible text.

### When to comment

- To explain *why* something is done, not *what* — the code already shows what
- To temporarily disable code during debugging
- To mark sections in long files

### When not to comment

- To narrate every line. If the code says `<h1>Title</h1>`, don't write
  `<!-- title -->` next to it.
- To leave old code in place "just in case." Delete it; that's what version
  control is for.
- Inside a critical render path where a few bytes matter.

## A complete head

Here's a realistic, complete `<head>`:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Guide — Structure and Meaning</title>
  <meta name="description" content="Learn HTML from tags to accessibility.">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles/main.css">
  <link rel="canonical" href="https://example.com/html-guide">
  <meta property="og:title" content="HTML Guide">
  <meta property="og:description" content="Learn HTML from tags to accessibility.">
  <script src="/app.js" defer></script>
</head>
```

Note the order: charset, viewport, title, description, favicon, styles, SEO,
social, script.

## Common mistakes

- Two `<title>` tags. Only the first works.
- A `<title>` that's the same on every page. Search engines penalize this.
- Loading stylesheets *after* content in `<body>`. Flash of unstyled content.
- Putting `<script>` in `<head>` without `defer`, blocking first paint.
- Nesting comments. `<!-- a <!-- b --> c -->` breaks.
- Using `<!-- -->` to comment out code that contains `-->` inside a string.
  The parser can't tell the difference.

## The takeaway

- `<title>` — one per page, describes that specific page
- `<link>` — for stylesheets, favicons, canonical URLs, preloads
- `<style>` — inline CSS (fine for small, external for real sites)
- `<script>` — use `defer` for app code, `async` for independent analytics
- `<!-- ... -->` — comments, no nesting
- Order matters in `<head>`: charset → viewport → title → everything else