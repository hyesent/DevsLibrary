---
title: <iframe>, <canvas>, <map>, and <area>
order: 30
book: html
---

# `<iframe>`, `<canvas>`, `<map>`, and `<area>`

Four elements for embedding and image interactions: iframes to embed other
pages, canvas to draw with JavaScript, and map/area to make clickable regions
in an image.

## `<iframe>` — inline frame

Embeds another HTML page inside the current one:

```html
<iframe src="https://example.com" width="600" height="400"></iframe>
```

Used for:
- Embedded videos (YouTube, Vimeo)
- Maps (Google Maps, OpenStreetMap)
- Third-party widgets (social posts, comment systems)
- Advertisements (though usually not directly)
- Sandboxed user content

### Key attributes

| Attribute | Purpose |
|---|---|
| `src` | URL of the page to embed |
| `width`, `height` | Size (CSS also works) |
| `title` | Accessibility description (required for a11y) |
| `loading` | `lazy` or `eager` |
| `allow` | Feature policies |
| `sandbox` | Restrict capabilities |
| `referrerpolicy` | Referrer sending policy |
| `allowfullscreen` | Allow fullscreen playback |

### Always include `title`

```html
<iframe
  src="https://www.youtube.com/embed/abc123"
  title="Tutorial: Intro to CSS Flexbox"
  width="560"
  height="315"
  loading="lazy"
  allowfullscreen>
</iframe>
```

Without `title`, screen readers announce "iframe" with no context. Bad.

### Sandbox for untrusted content

```html
<iframe src="user-content.html" sandbox="allow-scripts"></iframe>
```

The `sandbox` attribute restricts the embedded page. Empty `sandbox` applies
maximum restrictions (no scripts, no forms, no navigation). Add back abilities
one by one:

- `allow-scripts` — enable JavaScript
- `allow-forms` — enable form submission
- `allow-same-origin` — treat the iframe as same-origin
- `allow-popups` — allow popups
- `allow-top-navigation` — allow navigation of parent page

For embedded user content, `sandbox` is essential.

### `loading="lazy"`

Lazy-load iframes far down the page. YouTube embeds in particular are heavy:

```html
<iframe src="..." loading="lazy"></iframe>
```

### Performance warning

Every iframe is a full browsing context — its own document, styles, scripts.
Ten YouTube embeds on a page = ten times the work. Use lazily, and consider
loading placeholders instead.

## `<canvas>` — programmable drawing surface

An area for drawing with JavaScript:

```html
<canvas id="graph" width="600" height="400"></canvas>
```

By itself, `<canvas>` shows nothing. JavaScript draws into it:

```js
const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#61dafb';
ctx.fillRect(20, 20, 200, 100);
```

Used for:
- Charts and graphs
- Games
- Image editing tools
- Data visualization
- Complex animations

### Accessibility

`<canvas>` has no built-in way to describe what's drawn. Provide fallback text
inside the tag:

```html
<canvas width="600" height="400">
  A bar chart showing revenue growth from 2020 to 2024.
</canvas>
```

And consider adding a table of the underlying data nearby for screen readers.

## `<map>` and `<area>` — image maps

Make parts of an image clickable.

```html
<img src="world.png" alt="World map" usemap="#worldmap">

<map name="worldmap">
  <area shape="rect" coords="0,0,100,100" href="/north" alt="North">
  <area shape="circle" coords="200,200,50" href="/central" alt="Central">
  <area shape="poly" coords="300,100,350,150,320,200" href="/south" alt="South">
</map>
```

- `<map>` defines the clickable regions
- `<area>` defines one region
- The `<img>` links to the map via `usemap="#name"`

`shape` values:
- `rect` — rectangle (4 coords: x1,y1,x2,y2)
- `circle` — circle (3 coords: cx, cy, r)
- `poly` — polygon (2×n coords)
- `default` — entire image

### When image maps make sense

- Geographic maps
- Diagrams with multiple clickable parts
- Complex illustrations with distinct regions

### When they don't

Modern HTML has better options for most cases:

- SVG with `<a>` inside (also scalable)
- Regular positioned `<a>` elements on top
- Multiple separate images

Image maps are old and rare. Only use them when the image is genuinely
irreplaceable and the regions are inherently defined by the image.

### Accessibility

Each `<area>` needs `alt`. The overall `<img>` also needs `alt` describing the
image.

## Combining example — an SVG map instead

Modern approach for clickable regions:

```html
<svg viewBox="0 0 400 300" role="img" aria-label="World map">
  <a href="/north">
    <title>Northern region</title>
    <path d="..." fill="#ddd"/>
  </a>
  <a href="/south">
    <title>Southern region</title>
    <path d="..." fill="#ccc"/>
  </a>
</svg>
```

Scalable, accessible, styleable with CSS. Better than `<map>` in most modern
cases.

## `<embed>` and `<object>`

Older alternatives for embedding content:

```html
<embed src="file.pdf" type="application/pdf" width="600" height="400">
<object data="file.pdf" type="application/pdf" width="600" height="400">
  <p>Your browser doesn't support PDFs. <a href="file.pdf">Download</a>.</p>
</object>
```

Rarely needed today. `<iframe>` handles most cases. PDFs work better as links
than embeds.

## Common mistakes

- Iframes without `title` — inaccessible.
- Sandboxing iframes incorrectly, breaking embedded functionality.
- Embedding a whole YouTube iframe for a video that's not visible — kills page
  load. Use `loading="lazy"`.
- Using `<canvas>` for static images — that's what `<img>` is for.
- Using `<map>` when an SVG or overlaid links would be cleaner.
- Assuming `<iframe>` content is stylable — you can't style inside a
  cross-origin iframe.
- Forgetting that iframes count as separate pages for SEO — content inside them
  isn't indexed with the parent page.

## The takeaway

- `<iframe>` — embed another page (always add `title`, use `sandbox` for
  untrusted content)
- `<canvas>` — draw with JavaScript (provide fallback text)
- `<map>` + `<area>` — clickable image regions (rarely the right choice today)
- `<embed>` and `<object>` — legacy alternatives
- Prefer SVG for interactive diagrams
- Lazy-load heavy embedded content

These are the "escape hatches" of HTML — reach for them when the standard tools
don't fit.