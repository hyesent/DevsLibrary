---
title: Link Extras — target, rel, download, mailto, tel
order: 24
book: html
---

# Link Extras — `target`, `rel`, `download`, `mailto`, `tel`

You know `href`. Here are the other attributes and link types that turn `<a>`
from a simple jump into a full toolbox.

## `target` — where to open

```html
<a href="https://example.com" target="_blank">New tab</a>
```

Values:
- `_self` — same tab (default)
- `_blank` — new tab / window
- `_parent` — parent browsing context
- `_top` — top-level browsing context

`_blank` is the one you'll use. `_parent` and `_top` are for iframe scenarios
and rarely needed in modern apps.

**When to use `_blank`:** sparingly. Opening a new tab is a decision that
belongs to the user, not to you. Common justified cases:

- Links to external sites that the user will want to keep open alongside your
  page (e.g. documentation links)
- A "share" or "print preview" link
- Anything the user explicitly expects to open separately

Bad use: opening every external link in a new tab. Users lose their back
button, and it's a known annoyance.

## `rel` — relationship

Describes the relationship between the current page and the destination.

```html
<a href="https://example.com" rel="noopener noreferrer">External</a>
```

Common values:

| `rel` | Meaning |
|---|---|
| `noopener` | New page can't access `window.opener` |
| `noreferrer` | Don't send the `Referer` header |
| `nofollow` | Tell search engines not to follow |
| `external` | Mark as external |
| `ugc` | User-generated content |
| `sponsored` | Paid link |
| `author` | Link to author's page |
| `license` | Link to license |
| `me` | Link to your other profiles |
| `next` / `prev` | Sequential pages |
| `canonical` | Preferred URL (mostly for `<link>`) |

### `noopener`

When you use `target="_blank"`, the new page can access `window.opener` and
potentially redirect your original page. `noopener` prevents that.

```html
<a href="https://example.com" target="_blank" rel="noopener">
```

Modern browsers already default to `noopener` behavior for `_blank` links, but
include it anyway for older browsers.

### `noreferrer`

Prevents the browser from sending the `Referer` header when the user clicks the
link. Useful for privacy — the destination won't know where the user came from.

```html
<a href="https://example.com" rel="noreferrer">
```

`noreferrer` implies `noopener`.

### `nofollow`

Tells search engines not to pass ranking credit to the destination. Used for:

- Paid links
- Sponsored content
- User-generated content (comments, forum posts)

```html
<a href="https://spammy-site.com" rel="nofollow">Check this out</a>
```

Google and other search engines respect `nofollow` as a hint, though the effect
has softened over the years.

### Combining

You can combine multiple values, space-separated:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">
```

Order doesn't matter.

### A useful default

For external links, this is a solid baseline:

```html
<a href="https://external.example" target="_blank" rel="noopener noreferrer">
  External
</a>
```

For user-contributed links:

```html
<a href="https://user-link.example" rel="nofollow ugc">User link</a>
```

## `download` — trigger a download

Instead of navigating to a file, prompt the browser to download it:

```html
<a href="/files/report.pdf" download>Download PDF</a>
```

Provide a filename:

```html
<a href="/files/report.pdf" download="annual-2024.pdf">Download</a>
```

Rules:
- Same-origin URLs only. Cross-origin downloads are blocked by browsers.
- Filename is a suggestion — the browser may add extensions or modify it.
- Works well for PDFs, images, text files.
- Doesn't work for HTML files in some browsers (they navigate instead).

## `hreflang` — language of the destination

Tells the browser and search engines what language the linked page is in:

```html
<a href="/es/" hreflang="es">Versión en español</a>
<a href="/fr/" hreflang="fr">Version française</a>
```

Useful for multilingual sites. Search engines use it to serve the right
language to the right users.

## `type` — MIME type of the destination

Hints at the resource type:

```html
<a href="/files/data.csv" type="text/csv">Download CSV</a>
<a href="/files/doc.pdf" type="application/pdf">PDF</a>
```

Rarely required. Some browsers show a different cursor or icon based on the
type.

## `mailto:` — email links

Opens the user's email client with the recipient pre-filled:

```html
<a href="mailto:hello@example.com">Email us</a>
```

### With subject

```html
<a href="mailto:hello@example.com?subject=Hello">Contact</a>
```

Note: use `?` for the first parameter, `&` for subsequent ones.

### With subject and body

```html
<a href="mailto:hello@example.com?subject=Inquiry&body=Hi%20there">Compose</a>
```

Spaces and special characters must be URL-encoded (`%20` for space, `%0A` for
newline).

### Multiple recipients

```html
<a href="mailto:a@example.com,b@example.com">Both</a>
```

Cc and bcc are also possible:

```html
<a href="mailto:to@example.com?cc=cc@example.com&bcc=bcc@example.com">
```

### The downside of `mailto:`

If the user has no default mail client configured, the link does nothing
visible — which is confusing. Consider a contact form as an alternative.

## `tel:` — phone links

Opens the dialer on mobile:

```html
<a href="tel:+15551234567">Call us</a>
```

Format: `+` country code, digits only (no spaces, dashes, or parentheses).

On desktop, typically opens Skype or another telephony app (or does nothing).
On mobile, dials directly.

Good practice: label it clearly:

```html
<a href="tel:+15551234567">Call +1 (555) 123-4567</a>
```

## `sms:` — text message links

```html
<a href="sms:+15551234567">Text us</a>
```

With a pre-filled message:

```html
<a href="sms:+15551234567?body=Hi">Text us</a>
```

Support varies. iOS uses `&body=` instead of `?body=` in some versions. Test on
target devices.

## Combining example

A "share this article" link that opens a new tab, tells search engines not to
follow, and indicates the language:

```html
<a
  href="https://twitter.com/intent/tweet?url=https://example.com/article"
  target="_blank"
  rel="noopener noreferrer nofollow"
  hreflang="en"
>
  Share on Twitter
</a>
```

## Accessibility notes

- Link text should describe the destination — no "click here"
- Use `aria-label` when the visible text is unclear (e.g. an icon-only link)
- External links opening in a new tab should be marked somehow (icon or text)
  — screen readers won't announce `target="_blank"` automatically

For icon-only links:

```html
<a href="/cart" aria-label="Shopping cart">
  <svg>...</svg>
</a>
```

## Common mistakes

- Using `target="_blank"` without `rel="noopener"` — a security risk in older
  browsers.
- Not telling users that a link opens in a new tab. Add a visual cue (icon).
- Broken `mailto:` links with unencoded spaces. Use `%20` for spaces.
- `tel:` links with spaces or dashes. Use digits and `+` only.
- Using `download` on cross-origin URLs — it silently fails.
- `mailto:` as the only contact option. Some users have no mail client.
- Ignoring accessibility — icon links with no `aria-label`.

## The takeaway

- `target="_blank"` + `rel="noopener noreferrer"` for external links
- `rel="nofollow ugc"` for user-generated content
- `download` triggers a file download (same-origin only)
- `mailto:` opens the email client — encode special characters
- `tel:` opens the dialer — digits and `+` only
- `sms:` opens the messaging app
- Label icon-only links with `aria-label`
- Don't surprise users with new tabs — mark them clearly

These attributes are the difference between a link and a *good* link.