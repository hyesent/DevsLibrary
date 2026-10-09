---
title: How Browsers Read HTML
order: 2
book: html
---

# How Browsers Read HTML

When you open a webpage, a lot happens in the first few hundred milliseconds.
The browser downloads a file, reads it, builds a structure in memory, and
paints it to the screen. Understanding that sequence makes you a better
developer — because you start seeing *why* things work the way they do.

## The four stages

Every page goes through the same four stages:

1. **Fetch** — get the HTML file from a server (or from disk)
2. **Parse** — read the HTML and build a tree of objects
3. **Style** — match CSS rules to those objects
4. **Render** — draw the final result to the screen

We'll focus on parsing here, since that's the part that directly involves the
HTML you write.

## Parsing: text → tree

The browser reads your HTML **top to bottom**, character by character. As it
goes, it turns tags into objects. Those objects form a tree called the **DOM**
(Document Object Model).

Given this HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>World.</p>
  </body>
</html>
```

The browser builds a tree like this:

```
document
└── html
    ├── head
    │   └── title → "Hello"
    └── body
        ├── h1 → "Hello"
        └── p → "World."
```

Every tag becomes a node in that tree. Every piece of text becomes a node too.

## Why the tree matters

Once the tree exists, other systems can walk it:

- **CSS** matches selectors against the tree to figure out what to style
- **JavaScript** manipulates the tree to change the page
- **Accessibility tools** read the tree to describe the page to screen readers
- **Search engines** parse the tree to understand your content

If your HTML is a mess, every one of those systems suffers.

## Bad HTML gets fixed for you

Here's a surprise: browsers never fail. If you write broken HTML, the browser
**guesses** what you meant and repairs it silently.

For example, you might write:

```html
<p>One
<p>Two
```

You forgot the closing tags. The browser closes them for you:

```
<p>One</p>
<p>Two</p>
```

This is called **error recovery**. It's why old, sloppy websites still work.

But don't rely on it. Just because the browser fixes your mistake doesn't mean
your HTML was correct — and the fix might not be what you expected.

## The DOM vs the HTML file

Important distinction: the HTML file you write is just text. The **DOM** is
what the browser builds from that text.

They can diverge:

- JavaScript can add, remove, or change nodes in the DOM
- The DOM has things that aren't in your file at all — like the implicit
  `<html>`, `<head>`, and `<body>` elements the browser creates if you forgot them

When people say "the DOM," they mean the live tree the browser is working with,
not the text file.

## Inline vs external resources

When the parser hits certain tags, it has to *pause* and fetch something else:

- `<link rel="stylesheet">` — pauses to fetch the CSS
- `<script src="...">` — **blocks** parsing until the script is downloaded and run
- `<img src="...">` — doesn't pause parsing, but the image loads in the background

This is why `<script>` tags block rendering and are usually placed at the bottom
of the `<body>`, or given `defer` / `async` attributes. We'll cover that in a
later lesson.

## The rendering step

After parsing, the browser:

1. Builds a **CSSOM** (another tree, this time of styles)
2. Combines DOM + CSSOM into a **render tree**
3. Calculates where everything goes (**layout**)
4. Paints pixels to the screen (**paint**)

You don't need to memorize this pipeline yet. Just know that **the shape of your
HTML determines everything downstream** — layout, styling, accessibility, and
performance all start from the tree.

## Common mistakes

- Assuming the browser reads HTML like a human — it doesn't; it reads it
  character by character and constructs a tree.
- Believing "it works in the browser" means "my HTML is correct." Browsers
  silently repair broken markup.
- Thinking the HTML file *is* the DOM. They're different things once JavaScript
  starts running.
- Putting `<script>` tags in the `<head>` without `defer` and wondering why the
  page feels slow.

## The takeaway

- The browser fetches, parses, styles, and renders
- Parsing turns your HTML into a **tree** (the DOM)
- The DOM is the live structure — not the text file
- Browsers **repair** broken HTML silently — don't rely on it
- The shape of your HTML affects styling, JavaScript, accessibility, and
  performance

Write clean HTML and everything downstream gets easier. Write sloppy HTML and
you'll fight the browser forever.