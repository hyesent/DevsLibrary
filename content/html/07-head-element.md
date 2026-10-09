---
title: The <head> Element
order: 7
book: html
---

# The `<head>` Element

Every page has two main halves: the `<head>` and the `<body>`. The `<body>`
holds everything the user *sees*. The `<head>` holds everything the browser
*needs to know* before showing the page.

If `<body>` is the storefront, `<head>` is the back office.

## What lives in the head

The `<head>` element is a container for **metadata** — information *about* the
document, not the document's visible content. Typical contents:

- The page title
- Character encoding
- Viewport settings for mobile
- Stylesheets (CSS)
- Scripts (JavaScript)
- Favicon
- SEO and social sharing info
- Canonical URLs
- Language hints

None of this is displayed on the page itself. All of it affects how the page
behaves, how it looks, and how it's understood.

## Basic structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

The `<head>` sits between `<html>` and `<body>`. It contains only metadata
elements — no `<h1>`, no `<p>`, no visible content.

## What goes in, and in what order

Order matters. Some things must come early. A sensible order:

1. `<meta charset>` — as early as possible
2. `<meta name="viewport">` — right after charset
3. `<title>` — early, appears in tab and search results
4. `<meta name="description">` — SEO
5. `<link rel="canonical">` — SEO
6. Stylesheets (`<link rel="stylesheet">`)
7. Scripts (`<script>`) — at the end, or with `defer`/`async`

Charset first is important. If the browser starts parsing text before it knows
the encoding, it can misinterpret characters. The rule of thumb: the browser
should know the encoding **within the first 1024 bytes** of the document.

## The charset rule

```html
<meta charset="UTF-8">
```

Put this literally first inside `<head>`. Before the title, before anything
else. It's the cheapest line in the file and prevents weird `â€™` garbling.

## Common head elements at a glance

| Element | Purpose |
|---|---|
| `<title>` | Tab title, bookmark name, search result headline |
| `<meta charset>` | Character encoding |
| `<meta name="viewport">` | Mobile scaling |
| `<meta name="description">` | Search engine snippet |
| `<link rel="stylesheet">` | External CSS |
| `<link rel="icon">` | Favicon |
| `<link rel="canonical">` | Preferred URL for SEO |
| `<script>` | JavaScript |
| `<style>` | Inline CSS |
| `<base>` | Default URL for relative links |

We'll cover each in the lessons that follow.

## Not everything goes here

A frequent beginner mistake is putting visible elements in `<head>`. This:

```html
<head>
  <h1>Welcome</h1>
</head>
```

…will not display the heading. Browsers skip or relocate non-heading content
inside `<head>`. The `<h1>` gets pushed into `<body>` by the parser, usually in
an unpredictable position.

Rule: if the user should see it, it belongs in `<body>`. If it's metadata,
configuration, or a resource the page depends on, it goes in `<head>`.

## The head is optional in theory

In practice, if you omit `<head>`, the browser creates one. If you put
head-only elements (like `<title>`) directly inside `<html>` without a
`<head>`, the browser typically moves them into an implicit `<head>`.

Don't rely on this. Always write `<head>` explicitly.

## Common mistakes

- Putting visible content (headings, paragraphs, images) inside `<head>`. It
  won't render.
- Putting `<meta charset>` after other elements. It should be the first thing.
- Forgetting `<title>`. Browsers fall back to the URL, which is ugly.
- Forgetting `<meta name="viewport">` and then finding the site looks wrong on
  mobile.
- Loading scripts in `<head>` without `defer` or `async`, blocking the page
  from rendering until the script finishes downloading.

## The takeaway

- `<head>` is for metadata, not visible content
- Every visible element goes in `<body>`
- Order matters — charset first, then viewport, then title, then the rest
- The head tells the browser *how* to render the body
- If in doubt: users see `<body>`, the browser reads `<head>`

Get the head right and the body just works. Get it wrong and you'll debug
problems that have nothing to do with your visible content.