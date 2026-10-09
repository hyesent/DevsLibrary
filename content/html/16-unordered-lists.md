---
title: Unordered Lists — <ul> and <li>
order: 16
book: html
---

# Unordered Lists — `<ul>` and `<li>`

An unordered list is a collection of items where **order doesn't matter**.
Browsers render it as a bulleted list by default, but the meaning is
structural: these things belong together as a group.

## Basic structure

```html
<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Bread</li>
</ul>
```

Two elements:
- `<ul>` — the list container (unordered list)
- `<li>` — a list item

Every `<li>` must be inside a `<ul>` or `<ol>`. A bare `<li>` in the body is
invalid.

## When to use `<ul>`

Use it when the items have no meaningful order:

- A shopping list
- A list of features
- Navigation links
- Ingredients
- Bullet-point notes

The order you write them in doesn't change the meaning. If you shuffled them,
the list would still make sense.

## When NOT to use `<ul>`

Don't use `<ul>` to fake visual bullets or indentation. If the content isn't
actually a list, use a `<div>` with styling, or a `<p>`.

Bad:

```html
<ul>
  <li>This is really just a paragraph.</li>
</ul>
```

If you're not grouping related items, `<ul>` is the wrong element.

## Styling the bullets

The browser's default bullet is a filled disc. You can change it with CSS:

```css
ul { list-style-type: disc; }
ul { list-style-type: circle; }
ul { list-style-type: square; }
ul { list-style-type: none; }
ul { list-style: none; padding: 0; }
```

`list-style: none` removes bullets entirely — common for navigation menus and
custom-styled lists.

You can also set it inline (not recommended):

```html
<ul style="list-style-type: square;">
  <li>Item</li>
</ul>
```

## Markers and layout

By default, the bullet sits outside the content flow:

```css
ul {
  padding-left: 40px;   /* indent for the marker */
  list-style-position: outside;
}
```

`list-style-position: inside` moves the bullet into the content area:

```css
ul { list-style-position: inside; }
```

Use `outside` for typical lists. Use `inside` when the marker should align with
text or when the list is in a tight container.

## Lists in navigation

A common use: building a nav menu.

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

Then strip the bullets with CSS:

```css
nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 20px;
}
```

The semantic meaning — "this is a list of navigation links" — stays.

## Why not just use `<div>`s?

You could write:

```html
<div>Milk</div>
<div>Eggs</div>
<div>Bread</div>
```

Visually similar. Semantically wrong.

Screen readers use lists to announce "list of 3 items" and let users jump
between items. Search engines interpret list content as grouped data. A `<ul>`
communicates all of that for free.

## Nested content inside `<li>`

`<li>` can contain almost anything — text, links, images, other lists:

```html
<ul>
  <li>
    <strong>Milk</strong> — 2 liters
  </li>
  <li>
    <a href="/eggs">Eggs</a> — free range
  </li>
</ul>
```

But if a list item needs multiple paragraphs, structure it:

```html
<ul>
  <li>
    <h3>First item</h3>
    <p>Details about the first item.</p>
  </li>
</ul>
```

Valid and readable.

## Common mistakes

- Using `<ul>` purely for visual bullets when the content isn't a list.
- Forgetting `<ul>` and just writing `<li>` items directly.
- Putting non-`<li>` elements directly inside `<ul>` (a `<p>` or `<div>` as a
  direct child is invalid — only `<li>`, `<script>`, or `<template>` are
  allowed).
- Using `<ul>` where order matters (a numbered recipe, a ranking). Use `<ol>`
  instead.
- Adding bullets to a nav menu that should have none. Strip with
  `list-style: none`.

## The takeaway

- `<ul>` — an unordered list, order doesn't matter
- `<li>` — a list item
- Only `<li>` elements go directly inside `<ul>`
- Browsers show bullets by default — change with `list-style-type`
- Use lists for navigation, feature lists, ingredients, etc.
- Don't fake bullets with `<div>`s; use a real list

Lists are one of the oldest and most useful HTML elements. Use them whenever
you have a group of related items.