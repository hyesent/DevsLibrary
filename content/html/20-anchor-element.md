---
title: The <a> Element — Everything About href
order: 20
book: html
---

# The `<a>` Element — Everything About `href`

The anchor element — `<a>` — is the connective tissue of the web. It's what
turns a document into a hyperdocument. Every link you click, every "jump to
section," every share button is an `<a>` under the hood.

## Basic structure

```html
<a href="https://example.com">Visit Example</a>
```

Two parts:
- `href` — where the link goes (the destination)
- The content between tags — what the user clicks (usually text)

The `<a>` element is inline. It flows with text.

## The href attribute

`href` stands for "hypertext reference." It's the destination. Its value can be
many things:

### Absolute URL

A full URL, including protocol and domain:

```html
<a href="https://developer.mozilla.org">MDN</a>
<a href="http://example.com/page.html">Page</a>
```

Absolute URLs always point to the same destination, regardless of where the
page is served from. Use them for external sites.

### Relative URL

A path relative to the current page's location:

```html
<a href="about.html">About</a>
<a href="pages/contact.html">Contact</a>
<a href="../index.html">Back to home</a>
```

- `about.html` — a file in the same directory
- `pages/contact.html` — inside a subdirectory
- `../index.html` — one directory up

Use relative URLs for internal links on the same site. They keep working when
you move the site to a different domain.

### Root-relative URL

A path starting from the site's root:

```html
<a href="/about">About</a>
<a href="/blog/post-1">Post 1</a>
```

The leading `/` means "from the site root." Works regardless of the current
page's depth in the folder structure. Great for navigation.

### Fragment (anchor) link

Jumps to a specific element on a page (usually the current one):

```html
<a href="#section-2">Jump to Section 2</a>
<a href="#top">Back to top</a>
```

The browser scrolls to the element with matching `id`.

### Email link

Opens the user's email client, pre-filling the recipient:

```html
<a href="mailto:hello@example.com">Email us</a>
```

With a subject line:

```html
<a href="mailto:hello@example.com?subject=Hello">Contact</a>
```

Multiple recipients:

```html
<a href="mailto:a@example.com,b@example.com">Both</a>
```

### Phone link

On mobile, opens the dialer:

```html
<a href="tel:+15551234567">Call us</a>
```

The number should be in international format: `+` country code, no spaces or
dashes.

### SMS link

```html
<a href="sms:+15551234567">Text us</a>
```

### Protocol handlers

Other schemes you might see:

- `ftp://` — file transfer
- `ws://` / `wss://` — WebSockets
- `javascript:` — inline script (avoid; security hazard)
- `data:` — inline data (used for some embedded content)

The `javascript:` and `data:` schemes are often used to exploit XSS attacks.
Avoid both unless you know exactly what you're doing.

## Link content

The content between `<a>` tags can be:

- Text: `<a href="...">Click here</a>`
- An image: `<a href="..."><img src="..." alt="..."></a>`
- A heading: `<a href="..."><h2>Title</h2></a>`
- A combination of elements
- Even a whole card

But content should describe the destination. "Click here" is bad for
accessibility — a screen reader user navigating by links hears a list of "click
here, click here, click here" with no context.

Better: `<a href="/pricing">See pricing</a>`.

## target attribute

Controls where the link opens.

```html
<a href="https://example.com" target="_blank">Open in new tab</a>
```

Values:
- `_self` — same tab (default)
- `_blank` — new tab/window
- `_parent` — parent frame
- `_top` — top-level frame

Use `_blank` sparingly. Every new tab is a decision you make for the user.

## rel attribute

Describes the relationship between the current page and the destination. Common
values:

- `noopener` — prevents the new page from accessing `window.opener`
- `noreferrer` — don't send the referrer header
- `nofollow` — tell search engines not to follow this link (for ads, UGC, etc.)
- `external` — indicates an external link
- `author`, `license`, `help`, `next`, `prev`, `me` — semantic relationships

Modern best practice for `target="_blank"`:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External
</a>
```

Without `noopener`, a malicious linked site could redirect your page in the
background. Browsers now default `_blank` to `noopener` behavior, but adding it
explicitly is still good practice for older browsers.

## download attribute

Prompts a download instead of navigating:

```html
<a href="/files/report.pdf" download>Download report</a>
```

The `download` attribute can also specify a filename:

```html
<a href="/files/report.pdf" download="annual-report.pdf">Download</a>
```

Only works for same-origin URLs. Cross-origin downloads are blocked by browsers
for security.

## Fragment links in practice

A page with sections:

```html
<h1 id="top">Home</h1>

<nav>
  <ul>
    <li><a href="#intro">Intro</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#pricing">Pricing</a></li>
  </ul>
</nav>

<section id="intro">
  <h2>Introduction</h2>
  ...
</section>

<section id="features">
  <h2>Features</h2>
  ...
</section>
```

Clicking "Features" scrolls to the `<section id="features">`. The URL becomes
`page.html#features`, which is shareable and bookmarkable.

## External vs internal

Use absolute URLs for external sites:

```html
<a href="https://developer.mozilla.org">MDN</a>
```

Use relative or root-relative URLs for internal pages:

```html
<a href="/about">About</a>
<a href="contact.html">Contact</a>
```

This way, if you move your site from `localhost` to a real domain, internal
links keep working.

## Common mistakes

- Forgetting `href`. An `<a>` without `href` isn't a link — it's just inline
  text with the styling of a link. Use a `<span>` or a `<button>` if you need a
  JS hook.
- Using `href="#"` as a placeholder. It jumps to the top of the page and adds
  `#` to the URL. Use a real `href` or make it a button.
- Using `href="javascript:void(0)"`. Same problem, worse — it's a security
  smell.
- Missing `rel="noopener"` on `target="_blank"` links. Modern browsers default
  to safe behavior, but old ones don't.
- Link text that doesn't describe the destination ("click here"). Screen
  readers depend on link text being meaningful.
- Opening every external link in a new tab. That decision belongs to the user.
- Broken relative paths. Check the actual file location — `/about` is not the
  same as `about` or `./about`.

## The takeaway

- `<a href="...">` — the anchor element
- `href` is the destination: absolute, relative, root-relative, fragment,
  email, phone, SMS
- Use absolute URLs for external, relative for internal
- Content describes where the link goes — no "click here"
- `target="_blank"` pairs with `rel="noopener noreferrer"`
- `download` triggers a file download
- Always include `href`

The `<a>` element is the reason the web is a *web*. Use it well.