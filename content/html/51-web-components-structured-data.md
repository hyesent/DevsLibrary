---
title: Web Components Intro and Structured Data
order: 51
book: html
---

# Web Components Intro and Structured Data

Two advanced topics: building your own custom elements, and marking up content
so machines can understand it.

## Web Components — three specs

Web Components are a set of standards for building reusable custom elements:

1. **Custom Elements** — define new HTML tags
2. **Shadow DOM** — encapsulate markup and styles
3. **HTML Templates** — inert blueprints (covered in the last lesson)

Together, they let you build `<my-widget>` elements that behave like native
HTML.

## Custom Elements

Define a new tag:

```js
class MyGreeting extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<p>Hello, ${this.getAttribute('name')}!</p>`;
  }
}

customElements.define('my-greeting', MyGreeting);
```

Use it:

```html
<my-greeting name="Alice"></my-greeting>
```

The browser constructs `MyGreeting` when it encounters the tag. Lifecycle
callbacks:

- `connectedCallback()` — added to the DOM
- `disconnectedCallback()` — removed from the DOM
- `attributeChangedCallback(name, oldValue, newValue)` — attribute changed
- `observedAttributes` (static getter) — attributes to watch

Custom element names **must contain a hyphen** (e.g. `my-greeting`,
`x-accordion`). This prevents name collisions with future HTML elements.

## Shadow DOM

Shadow DOM encapsulates an element's internal structure. Outside styles don't
leak in; inside styles don't leak out.

```js
class MyButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        button {
          background: rebeccapurple;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
        }
      </style>
      <button><slot></slot></button>
    `;
  }
}

customElements.define('my-button', MyButton);
```

Usage:

```html
<my-button>Click me</my-button>
```

The `<button>` inside the shadow DOM has isolated styles — no CSS from the
page affects it, and its styles don't affect the page.

### `<slot>` for content projection

The `<slot>` element inside the shadow DOM receives content from the parent:

```html
<my-button>Click me</my-button>
<!-- "Click me" ends up inside the <button> in the shadow root -->
```

## Why web components

- **Reusable** — package as a single tag
- **Encapsulated** — styles and behavior are internal
- **Framework-agnostic** — works with vanilla, React, Vue, etc.
- **Standard** — not tied to any library

## Why not always

- **Verbose** — lots of boilerplate for simple components
- **Shadow DOM styling limits** — some CSS features don't cross the boundary
- **Server-side rendering is tricky** — needs extra work
- **Accessibility gotchas** — you can break ARIA if you're not careful

For a lot of apps, a framework like React, Vue, or Svelte is a nicer
developer experience. Web components shine when you need true portability.

## Structured data — helping machines understand

Search engines and social platforms read your HTML. Structured data adds
machine-readable context on top.

### JSON-LD (preferred)

Google's recommended format. A `<script>` tag with JSON:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Introduction to HTML",
  "author": {
    "@type": "Person",
    "name": "Jane Doe"
  },
  "datePublished": "2024-03-15",
  "image": "https://example.com/cover.jpg"
}
</script>
```

The script has `type="application/ld+json"` — browsers ignore it (they don't
run it), but search engines parse it.

### What it enables

- Rich search results (star ratings, prices, event dates)
- Better social previews
- Voice assistant and AI understanding
- Knowledge graph entries

### Common types

| Type | Use for |
|---|---|
| `Article` | Blog posts, news |
| `Product` | E-commerce items |
| `Person` | Author pages, bios |
| `Organization` | Company pages |
| `Event` | Events |
| `Recipe` | Recipes |
| `FAQPage` | FAQ pages |
| `BreadcrumbList` | Breadcrumb trails |
| `WebSite` | Site-level info |

Full list: [schema.org](https://schema.org).

### Where to put it

In `<head>` or `<body>` — either works. Common:

```html
<head>
  <title>Page</title>
  <script type="application/ld+json">
    { ... }
  </script>
</head>
```

### Microdata (old)

Inline attributes on HTML elements:

```html
<div itemscope itemtype="https://schema.org/Person">
  <span itemprop="name">Jane Doe</span>
  <span itemprop="jobTitle">Developer</span>
</div>
```

Valid but verbose. Superseded by JSON-LD.

### RDFa (older still)

```html
<div vocab="https://schema.org/" typeof="Person">
  <span property="name">Jane Doe</span>
</div>
```

Rarely used. JSON-LD wins.

## Testing structured data

- **Google Rich Results Test** — search.google.com/test/rich-results
- **Schema.org validator** — validator.schema.org
- **Google Search Console** — reports on parsed structured data

## A complete example

A blog post with structured data:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Understanding Semantic HTML</title>
  <meta name="description" content="A guide to writing meaningful HTML.">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Understanding Semantic HTML",
    "description": "A guide to writing meaningful HTML.",
    "author": {
      "@type": "Person",
      "name": "Jane Doe"
    },
    "publisher": {
      "@type": "Organization",
      "name": "My Blog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      }
    },
    "datePublished": "2024-03-15",
    "image": "https://example.com/cover.jpg"
  }
  </script>
</head>
<body>
  <article>
    <header>
      <h1>Understanding Semantic HTML</h1>
      <p>By Jane Doe on <time datetime="2024-03-15">March 15, 2024</time></p>
    </header>
    <p>...</p>
  </article>
</body>
</html>
```

The visible HTML is unchanged. The JSON-LD adds machine-readable meaning.

## Common mistakes

- Custom element names without a hyphen — those fail to register.
- Using shadow DOM and expecting global CSS to style internals.
- Accessing shadow DOM content with `document.querySelector` — you need
  `element.shadowRoot.querySelector`.
- Structured data that lies — mismatched dates, prices, etc. Google penalizes
  this.
- Duplicating structured data that's already in the visible HTML.
- Using microdata when JSON-LD is simpler and better supported.

## The takeaway

- Web Components: Custom Elements + Shadow DOM + Templates
- Custom element names need a hyphen
- Shadow DOM encapsulates styles and markup
- Structured data helps search engines understand your content
- **JSON-LD** is the preferred format — a `<script
  type="application/ld+json">` with schema.org types
- Test with Google's Rich Results Test
- Match structured data to what's visible — no lying

Both are advanced tools. Use them when the standard HTML isn't enough.