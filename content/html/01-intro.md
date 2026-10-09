---
title: What HTML Is and Why It Exists
order: 1
book: html
---

# What HTML Is and Why It Exists

HTML stands for **HyperText Markup Language**. It's the language every website
on the internet is built on — including this one.

It is not a programming language. It doesn't do math, it doesn't make decisions,
it doesn't loop. It's a **markup** language. Its only job is to tell the browser
what each piece of content *is* — this is a heading, this is a paragraph, this
is an image, this is a link.

That's it. That's the whole job.

## Why it exists

Before HTML, documents were plain text. There was no way to say "this line is a
title" or "this word is important." Everything was flat and unstructured.

HTML was invented in 1991 by Tim Berners-Lee at CERN so scientists could share
research papers over the internet. The idea was simple: wrap content in **tags**
that describe what it is.

```html
<h1>My Research Paper</h1>
<p>This is the introduction.</p>
```

The browser reads those tags and knows: the first line is a top-level heading,
the second is a paragraph. Then it styles them accordingly.

## Tags, elements, content

Three words you'll hear constantly. Get them straight now.

- A **tag** is the thing in angle brackets: `<p>` or `</p>`
- An **element** is the whole package: `<p>Hello</p>`
- **Content** is what's between the tags: `Hello`

```html
<p>Hello, world.</p>
```

Together, opening tag + content + closing tag is an **element**.

## Not every element has content

Some elements are empty. They don't wrap anything. Examples:

- `<br>` — a line break
- `<hr>` — a horizontal rule
- `<img>` — an image
- `<input>` — a form field

These are called **void elements**. They have no closing tag.

```html
<br>
<hr>
<img src="cat.jpg" alt="A cat">
```

## How a browser reads HTML

When you open a `.html` file, the browser:

1. **Downloads** the file (or reads it from disk)
2. **Parses** it — reads the tags and builds a tree structure in memory
3. **Renders** it — paints the tree onto the screen

That tree is called the **DOM** (Document Object Model). You'll hear that word
a lot. Everything the browser knows about your page lives in the DOM.

## What HTML is not

A few things people confuse:

- **HTML is not CSS.** HTML says what something *is*. CSS says how it *looks*.
- **HTML is not JavaScript.** HTML is static. JavaScript makes things move.
- **HTML is not a design tool.** If you're using HTML to make things look a
  certain way, you're doing it wrong. That's CSS's job.

Your job when writing HTML: describe the **meaning** of content, not its
appearance.

## A tiny real example

Here's a complete, valid HTML page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>This is my first webpage.</p>
  </body>
</html>
```

Every part of that has a reason. We'll break it down piece by piece over the
next few lessons.

## Common mistakes

- Thinking HTML is a programming language — it's not.
- Using tags for how they *look* instead of what they *mean*. `<b>` vs
  `<strong>` is the classic example: use `<strong>` when something is important,
  not when you just want bold text.
- Forgetting that void elements (`<br>`, `<img>`, `<hr>`) don't need closing tags.
- Writing HTML to make things "look right" instead of "mean right." That fight
  belongs to CSS.

## The takeaway

- HTML describes the **structure and meaning** of content
- It uses **tags** to mark up content
- The browser reads it and builds the **DOM**
- It's not a programming language — it's a markup language
- Styling is CSS's job, behavior is JavaScript's job

Get comfortable with that mental model and the rest of this book will feel
obvious.