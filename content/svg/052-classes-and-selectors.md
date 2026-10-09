---
title: "Classes and selectors"
order: 52
book: "svg"
---

# Classes and selectors

## What this lesson is really about

Use class-based SVG styling and combine SVG-specific selectors with ordinary CSS selector logic.

## Mental model

SVG is not a bag of visual tricks. Treat it as a structured graphics document: elements describe geometry or reusable resources, attributes and CSS control presentation, coordinate systems determine where things live, and the browser turns the document into pixels.

The important question in this lesson is not only **“what syntax do I type?”** but **“what does the browser now know about this graphic?”**

## Core ideas

- Identify the SVG concept being introduced.
- Separate **geometry**, **painting**, **coordinate systems**, and **document structure**.
- Ask which coordinate space an operation uses.
- Prefer understanding relationships over memorizing attributes.
- Connect the concept back to HTML/CSS when the browser uses the same underlying DOM and cascade ideas.

## Example

```html
<svg viewBox="0 0 100 100" role="img" aria-labelledby="title">
  <title id="title">Example graphic</title>
  <circle cx="50" cy="50" r="30" fill="currentColor" />
</svg>
```

Read this from the browser's perspective:

1. `svg` creates a graphics document with an internal coordinate system.
2. `viewBox` says that the internal drawing space is 100 by 100 units.
3. `circle` describes geometry inside that space.
4. `fill` controls how that geometry is painted.
5. The browser maps the internal coordinates onto the actual rendered size.
6. Accessibility metadata can give the graphic a meaningful name.

## Architecture connection

You will eventually combine SVG with HTML, CSS, and JavaScript.

- **HTML** gives you document structure.
- **CSS** controls presentation and layout.
- **SVG** gives you scalable geometry and graphics.
- **JavaScript** can inspect and change the SVG DOM.
- Later, frameworks such as React can generate the same underlying SVG tree declaratively.

That separation is important because it prevents SVG from becoming a mysterious collection of copied snippets.

## Practice

Before moving on, explain in your own words:

1. What part of this lesson describes geometry?
2. What part controls appearance?
3. What coordinate system is involved?
4. What would happen if you changed the SVG's rendered width without changing its `viewBox`?
5. How does this concept connect to something you already learned in HTML or CSS?

## Key takeaway

**Learn SVG by understanding the graphics model: document tree → coordinate space → geometry → paint → rendering.**
