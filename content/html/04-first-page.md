---
title: Your First HTML Page
order: 4
book: html
---

# Your First HTML Page

Let's write a complete HTML page from scratch and walk through every line. By
the end you'll understand what each piece does and why it's there.

## The starter file

Create a new file called `index.html` and type this in:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is my first real HTML page.</p>
  </body>
</html>
```

Open it in a browser. You'll see a heading and a paragraph. Simple — but every
line above has a purpose.

## Line-by-line breakdown

### `<!DOCTYPE html>`

Tells the browser: "This is a modern HTML5 document." It's not a tag — it's a
declaration. Always the very first thing in the file, no exceptions.

### `<html lang="en">`

The root element. Everything else lives inside it. `lang="en"` tells browsers,
search engines, and screen readers that the content is in English. Change it to
`lang="fr"` for French, `lang="es"` for Spanish, and so on.

### `<head>`

Metadata container. Nothing inside `<head>` is displayed on the page. It holds
information *about* the page — title, character set, styles, scripts, and other
settings.

### `<meta charset="UTF-8">`

Says: "This file uses UTF-8 character encoding." UTF-8 covers every character in
every language, plus emoji and symbols. Always include this. Without it, you'll
see garbled characters like `â€™` where apostrophes should be.

### `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

Tells mobile browsers: "Don't zoom out. Use the device's actual width." Without
this, mobile browsers render the page as if it were 980 pixels wide and shrink
it to fit — tiny text, unusable zoom. This one line makes everything mobile-
friendly.

### `<title>My First Page</title>`

The text that appears in the browser tab, in bookmarks, and as the clickable
headline in search results. Not visible in the page body itself.

### `<body>`

Everything visible on the page lives here. Headings, paragraphs, images, links,
forms — all of it. If a user can see it, it's in the `<body>`.

### `<h1>Welcome</h1>`

A top-level heading. There should only be **one `<h1>` per page** — it's the
main title of the content. Search engines and screen readers use it to
understand what the page is about.

### `<p>This is my first real HTML page.</p>`

A paragraph. Regular block of text. The most common element on the web.

## Indentation

Notice the two-space indentation inside `<html>`, `<head>`, and `<body>`. It's
not required — browsers ignore whitespace — but it makes the structure visible
to humans.

Consistency matters more than the specific size. Two spaces, four spaces, tabs —
pick one and stick to it. Most editors will do it automatically.

## What the browser sees

If you open DevTools and click the **Elements** tab, you'll see the DOM — the
browser's internal view of your page. It should look almost identical to your
file, but the browser might have filled in a few things:

- If you forgot `<html>`, `<head>`, or `<body>`, the browser creates them
- Attributes might be normalized
- Whitespace might be collapsed

Try deleting the `<body>` tags and refreshing. The page still works — because
the browser inserts them for you. **Don't rely on this.** Write them out
explicitly.

## Adding content

Now try adding a few more elements inside `<body>`:

```html
<body>
  <h1>Welcome</h1>
  <p>This is my first real HTML page.</p>
  <p>I'm learning HTML, one tag at a time.</p>
  <h2>A subheading</h2>
  <p>And here's more text under it.</p>
</body>
```

Refresh. You'll see a clear hierarchy: h1 is the biggest, h2 smaller, paragraphs
are normal-size. That visual hierarchy comes from the browser's default styles —
you haven't written any CSS yet.

## Where the file lives

For a single page, location doesn't matter. As soon as you have more than one
page (or images, or stylesheets), it starts to. For now:

- Keep everything in one folder
- Name the main page `index.html` — browsers and servers treat that as the
  default file
- Keep the file names lowercase and use hyphens instead of spaces

## Common mistakes

- Forgetting `<!DOCTYPE html>`. Without it, browsers use "quirks mode" — a
  legacy rendering mode that breaks modern CSS.
- Putting visible content inside `<head>`. It won't show up.
- Using more than one `<h1>` on a page. It's allowed, but it confuses structure.
- Skipping the viewport meta tag and then being surprised the page looks wrong
  on mobile.
- Naming the file with spaces (`my page.html`). Technically works, practically
  painful. Use `my-page.html`.

## The takeaway

- Every HTML page has the same skeleton: `<!DOCTYPE>`, `<html>`, `<head>`,
  `<body>`
- The `<head>` holds information *about* the page
- The `<body>` holds what the user actually sees
- `<h1>` is the page's main title — use it once
- Always set `charset` and `viewport`
- Indent consistently, even though the browser doesn't care

You've now written a complete, valid HTML page. Everything from here is about
adding more specific elements to do more specific jobs.