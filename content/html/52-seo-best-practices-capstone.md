---
title: SEO, Best Practices, and Capstone
order: 52
book: html
---

# SEO, Best Practices, and Capstone

The final lesson ties together everything: search engine optimization, HTML
hygiene, and a capstone project that uses every major concept in the book.

## SEO — what HTML controls

Search engines parse your HTML. What you write influences how they understand
and rank you.

### The essentials

1. **`<title>`** — the most important on-page signal
2. **`<meta name="description">`** — what appears in search results
3. **Heading structure** — reflects topic hierarchy
4. **Semantic HTML** — helps crawlers understand content
5. **`<a href>`** — links are how crawlers discover pages
6. **Content** — the actual text (you can't fake this)
7. **Structured data** — machine-readable context
8. **Canonical URL** — the preferred URL for duplicate content

### `<title>` — the biggest signal

```html
<title>HTML Forms: A Complete Guide — My Blog</title>
```

Good titles:
- Describe the page specifically
- Under 60 characters (or they get truncated)
- Include the brand name
- Are unique across pages

Bad titles:
- Duplicated across all pages
- Keyword stuffing ("HTML, HTML forms, HTML tutorial, forms...")
- Just the site name

### Meta description

```html
<meta name="description" content="Learn how to build accessible, well-structured HTML forms with labels, validation, and modern input types.">
```

- 120–160 characters
- Compelling enough to click
- Unique per page
- Google may ignore it (uses its own snippet), but you should still provide one

### Heading structure

One `<h1>`, logical hierarchy, no skipped levels. Search engines use headings
to understand topic structure.

### Semantic HTML

`<article>`, `<section>`, `<nav>`, `<header>`, `<main>`, `<footer>` — search
engines weight content differently based on context.

### Canonical

```html
<link rel="canonical" href="https://example.com/html-forms">
```

Tells search engines the preferred URL when content is reachable via multiple
URLs (with query params, `www`/non-`www`, etc.).

### Links

- Internal links spread "authority" and help crawlers discover pages
- External links to trusted sources can help
- Link text matters — "click here" is useless; "read the CSS guide" is good

### Alt text

Every image should have `alt`. It's used by screen readers, search engines,
and image search.

### URL structure

Clean, readable URLs rank better:

- `/html-forms-guide` — good
- `/posts/2024/03/15/?id=123&cat=html` — bad

That's a server-side concern, but worth knowing.

## Best practices — HTML hygiene

### Document structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page title — Site name</title>
    <meta name="description" content="...">
    <!-- stylesheets, scripts with defer, favicon, SEO, social -->
  </head>
  <body>
    <!-- skip link, header, nav, main, footer -->
  </body>
</html>
```

### Every page needs

- A unique `<title>`
- A meta description
- The viewport meta tag
- Charset first
- `lang` on `<html>`
- Semantic landmarks

### Content hierarchy

- One `<h1>`
- Sequential headings (no skipped levels)
- Paragraphs for prose
- Lists for lists
- Tables for tabular data

### Accessibility

- Every image has `alt`
- Every form input has a `<label>`
- Keyboard navigation works
- Focus states are visible
- Contrast meets WCAG AA (4.5:1 for text)
- Semantic HTML before ARIA

### Performance

- Compress images
- `loading="lazy"` for below-the-fold images
- `defer` scripts in `<head>`, or place at end of `<body>`
- Minimize inline styles
- Use `<link rel="preload">` for critical resources

### Validation

- Run [W3C Markup Validation Service](https://validator.w3.org/)
- Fix every error (warnings are often fine)
- Validate HTML, CSS, and structured data

## Common validation errors

- Duplicate `id`s
- Missing `alt` on `<img>`
- Missing `name` on form inputs
- Unclosed tags
- `<li>` outside `<ul>`/`<ol>`
- Block elements inside `<p>`
- Improper nesting

Validate early, validate often.

## A checklist for every page

**Structure**
- [ ] `<!DOCTYPE html>` first
- [ ] `<html lang="...">`
- [ ] `<meta charset="UTF-8">` first in `<head>`
- [ ] `<meta name="viewport">`
- [ ] One `<h1>`
- [ ] Sequential headings
- [ ] `<main>` for primary content
- [ ] `<header>`, `<footer>`, `<nav>` as appropriate

**Accessibility**
- [ ] All images have `alt`
- [ ] All form inputs have `<label>`
- [ ] Focus states visible
- [ ] Keyboard navigable
- [ ] Contrast meets WCAG AA
- [ ] Skip link at top

**SEO**
- [ ] Unique `<title>` under 60 chars
- [ ] Meta description, 120–160 chars
- [ ] Canonical URL
- [ ] Open Graph + Twitter cards
- [ ] Structured data (if applicable)

**Performance**
- [ ] Images compressed and sized
- [ ] Scripts deferred or at bottom
- [ ] Lazy loading where useful

## Capstone — build a full page

Build a complete, semantic, accessible page using everything from this book.
Here's a template to work from.

### Requirements

- A blog post page
- Semantic structure: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`,
  `<footer>`
- A form (comment form) with labels, validation, fieldsets
- A table (e.g. keyboard shortcuts)
- Images with `alt` and `width`/`height`
- SVG icons inline
- A `<details>` FAQ
- A `<dialog>` for a "share" panel
- Structured data (JSON-LD Article)
- Full SEO meta
- Skip link
- Accessible throughout

### Starter HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Building Accessible Forms — My Blog</title>
  <meta name="description" content="A guide to building forms that everyone can use.">
  <link rel="canonical" href="https://example.com/accessible-forms">
  <meta property="og:title" content="Building Accessible Forms">
  <meta property="og:description" content="A guide to building forms that everyone can use.">
  <meta property="og:type" content="article">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Building Accessible Forms",
    "author": { "@type": "Person", "name": "Jane Doe" },
    "datePublished": "2024-03-15"
  }
  </script>
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>

  <header>
    <h1>My Blog</h1>
    <nav aria-label="Main">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" tabindex="-1">
    <article>
      <header>
        <h2>Building Accessible Forms</h2>
        <p>By Jane Doe on <time datetime="2024-03-15">March 15, 2024</time></p>
      </header>

      <section>
        <h3>Introduction</h3>
        <p>Forms are how users interact with your site...</p>
      </section>

      <section>
        <h3>Keyboard shortcuts</h3>
        <table>
          <caption>Common form navigation keys</caption>
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><kbd>Tab</kbd></td>
              <td>Move to next field</td>
            </tr>
            <tr>
              <td><kbd>Shift</kbd> + <kbd>Tab</kbd></td>
              <td>Move to previous field</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>FAQ</h3>
        <details>
          <summary>Do I need JavaScript?</summary>
          <p>No, native HTML handles most validation.</p>
        </details>
      </section>

      <section>
        <h3>Leave a comment</h3>
        <form action="/comment" method="post">
          <fieldset>
            <legend>Your details</legend>

            <label for="name">Name</label>
            <input id="name" name="name" type="text" required autocomplete="name">

            <label for="email">Email</label>
            <input id="email" name="email" type="email" required autocomplete="email">
          </fieldset>

          <fieldset>
            <legend>Comment</legend>

            <label for="comment">Your comment</label>
            <textarea id="comment" name="comment" rows="4" required maxlength="500"></textarea>
          </fieldset>

          <button type="submit">Post comment</button>
        </form>
      </section>

      <footer>
        <p>Tags: HTML, accessibility, forms</p>
      </footer>
    </article>

    <aside aria-label="About the author">
      <h2>About the author</h2>
      <p>Jane Doe is a web developer...</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 My Blog</p>
  </footer>
</body>
</html>
```

Extend it with your own content, more sections, a dialog, SVG icons, and any
other elements from the book.

## The whole book, one page

You've covered:

- Document structure
- Text, headings, lists
- Links, paths, anchors
- Images and responsive images
- Media: video, audio, iframe
- Tables
- Forms (inputs, validation, accessibility)
- Semantic structure and landmarks
- Global attributes
- Modern elements
- Web components and structured data
- SEO and best practices

That's a complete HTML foundation. Everything else is practice.

## What comes next

- **CSS** — for styling what you've structured
- **JavaScript** — for making it interactive
- **Accessibility deep dive** — for going beyond the basics
- **Performance** — for making it fast
- **Real projects** — for building muscle memory

## The takeaway

- SEO starts with good HTML: titles, headings, semantics, links, structure
- Best practices: validate, use landmarks, one `<h1>`, sequential headings
- Accessibility isn't optional — labels, `alt`, contrast, keyboard
- Every page has a checklist
- Build real pages — the capstone is a starting point, not the end
- HTML is the foundation of the web; everything else builds on it

You've reached the end of the HTML book. Now go build something.