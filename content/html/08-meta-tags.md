---
title: <meta> Tags
order: 8
book: html
---

# `<meta>` Tags

The `<meta>` element is a catch-all for information that doesn't fit any other
tag. It's a **void element** — no closing tag, no content inside. Every `<meta>`
has a purpose, usually expressed through `name`/`content` or `charset` or
`http-equiv`.

Most pages have five or six `<meta>` tags. Some have twenty. Here are the ones
that actually matter.

## The essential two

### `<meta charset="UTF-8">`

Tells the browser which character encoding the file uses.

```html
<meta charset="UTF-8">
```

UTF-8 covers every character in every language, plus emoji, mathematical
symbols, and historical scripts. Use it. Always. No exceptions.

Put it first, before any other `<head>` content.

### `<meta name="viewport" content="...">`

Tells mobile browsers how to scale the page.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`width=device-width` = match the device's actual width instead of pretending
it's 980px. `initial-scale=1.0` = don't zoom in or out on load.

Without this, every page looks tiny on phones.

## SEO basics

### `<meta name="description" content="...">`

A short summary of the page — usually shown under the title in search results.

```html
<meta name="description" content="A complete guide to HTML for beginners,
covering document structure, forms, accessibility, and modern elements.">
```

Aim for 120–160 characters. If Google ignores it (which it often does), it
won't hurt. If Google uses it, it's a free improvement to your click-through
rate.

### `<meta name="robots" content="...">`

Tells search engine crawlers what to do.

```html
<meta name="robots" content="index, follow">
```

Common values:

- `index` — include this page in search results
- `noindex` — don't include it
- `follow` — follow links on this page
- `nofollow` — don't follow links
- `noarchive` — don't cache a copy

You can combine them with commas. Most pages omit this tag entirely — the
default is `index, follow`.

## Social sharing

When someone shares a URL on social media, the platform shows a preview card.
These tags control what that preview looks like.

### Open Graph (Facebook, LinkedIn, Discord, Slack, most platforms)

```html
<meta property="og:title" content="The Complete HTML Guide">
<meta property="og:description" content="From tags to accessibility.">
<meta property="og:image" content="https://example.com/preview.jpg">
<meta property="og:url" content="https://example.com/html-guide">
<meta property="og:type" content="article">
```

Note: it's `property`, not `name`. Open Graph uses a different attribute.

### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="The Complete HTML Guide">
<meta name="twitter:description" content="From tags to accessibility.">
<meta name="twitter:image" content="https://example.com/preview.jpg">
```

Twitter falls back to Open Graph tags if these are missing, but adding them
explicitly gives you more control.

### The full social set

For maximum compatibility across platforms, include both:

```html
<!-- Open Graph -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">
<meta property="og:type" content="website">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

## Browser and device hints

### Theme color

Sets the color of the browser UI (address bar) on mobile:

```html
<meta name="theme-color" content="#0b0f17">
```

You can provide per-scheme versions:

```html
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b0f17" media="(prefers-color-scheme: dark)">
```

### iOS standalone mode

If your site should behave like an app when added to the home screen:

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="My App">
```

### Author and generator

```html
<meta name="author" content="Your Name">
<meta name="generator" content="Hugo 0.120">
```

Low-impact for SEO, but occasionally useful for attribution.

## http-equiv

The `http-equiv` attribute simulates an HTTP header. You'll see it used for:

```html
<meta http-equiv="refresh" content="5; url=https://example.com">
```

This redirects the page to another URL after 5 seconds. **Avoid it.** Use a
server-side redirect instead. `http-equiv` on the client is a legacy hack and
bad for accessibility (someone might be reading the page when it disappears).

Another legacy usage:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

This was needed for Internet Explorer. Modern browsers ignore it. You can drop
it unless you're still supporting old IE.

## Common mistakes

- Forgetting `<meta charset>`, then getting garbled text for non-English
  characters.
- Using `name="og:title"` instead of `property="og:title"`. Open Graph requires
  `property`.
- Copy-pasting the same `description` across every page. Each page should have
  its own.
- Setting a 300-character description. Google truncates around 160.
- Using `<meta http-equiv="refresh">` for redirects instead of server-side
  redirects. It's bad for accessibility and SEO.
- Omitting viewport and testing on desktop only.

## The takeaway

- `<meta>` is a void element — no closing tag
- The two essentials: `charset` and `viewport`
- `description` improves search results
- Open Graph + Twitter tags control social previews
- `theme-color` sets mobile UI chrome
- Avoid `http-equiv` — it's a legacy tool

You don't need every meta tag on every page. You do need the essentials — and
if the page will ever be shared, the social ones too.