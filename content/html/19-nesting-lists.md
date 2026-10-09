---
title: Nesting Lists
order: 19
book: html
---

# Nesting Lists

A list can contain another list inside one of its items. Browsers show this
with indentation and a different marker style per level — but the structure is
what matters.

## Basic structure

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Cherry</li>
    </ul>
  </li>
  <li>Vegetables
    <ul>
      <li>Carrot</li>
      <li>Broccoli</li>
    </ul>
  </li>
</ul>
```

The nested `<ul>` lives **inside** the parent `<li>`, not as a sibling of the
`<li>` and not directly inside the outer `<ul>`.

## The critical rule

**The nested list must be inside an `<li>`.**

Correct:

```html
<ul>
  <li>
    Fruits
    <ul>
      <li>Apple</li>
    </ul>
  </li>
</ul>
```

Invalid:

```html
<ul>
  <li>Fruits</li>
  <ul>
    <li>Apple</li>
  </ul>
</ul>
```

The second example has the inner `<ul>` as a direct child of the outer `<ul>`,
which is invalid. Only `<li>` elements (plus `<script>` and `<template>`) can be
direct children of a list container.

## Mixed nesting — ul inside ol

You can nest `<ul>` inside `<ol>` and vice versa:

```html
<ol>
  <li>
    Prepare the ingredients:
    <ul>
      <li>Flour</li>
      <li>Sugar</li>
      <li>Eggs</li>
    </ul>
  </li>
  <li>
    Mix them together:
    <ol>
      <li>Beat the eggs</li>
      <li>Add sugar</li>
      <li>Fold in flour</li>
    </ol>
  </li>
</ol>
```

The outer list is ordered (steps matter). The inner lists use whichever type
fits their own content — a `<ul>` for ingredients (no order), an `<ol>` for
sub-steps (order matters).

## Depth

You can nest as deep as you want. Browsers handle it fine. Practical limit is
usually 3–4 levels — beyond that, the indentation gets cramped and users lose
track of where they are.

If you find yourself nesting 5+ levels, the content probably needs restructuring
or a different layout.

## How browsers style nested lists

By default:
- First level `<ul>`: filled disc (●)
- Second level `<ul>`: open circle (○)
- Third level `<ul>`: filled square (■)
- Beyond: repeats

For `<ol>`:
- First level: 1, 2, 3
- Second level: a, b, c (or i, ii, iii in some browsers)
- Third level: i, ii, iii
- Beyond: repeats

You can override all of this with CSS.

## Common nesting mistakes

### Sibling instead of nested

Wrong:

```html
<ul>
  <li>Fruits</li>
  <ul>
    <li>Apple</li>
  </ul>
</ul>
```

Right:

```html
<ul>
  <li>
    Fruits
    <ul>
      <li>Apple</li>
    </ul>
  </li>
</ul>
```

Browsers often "fix" the wrong version silently — but the resulting DOM might
not match what you intended, and your CSS will behave unpredictably.

### Closing the parent `<li>` too early

Wrong:

```html
<ul>
  <li>Fruits</li>          <!-- closed too early -->
  <li>
    <ul>
      <li>Apple</li>
    </ul>
  </li>
</ul>
```

This creates two sibling `<li>` elements: one called "Fruits" (empty), and one
containing just a nested list. Visually close but semantically wrong.

Right:

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
    </ul>
  </li>
</ul>
```

The "Fruits" text is inside the outer `<li>`, and the nested list is inside the
same `<li>`, after the text.

### Text after the nested list

If you want text to appear **after** a nested list, put it in the same `<li>`
but after the inner list:

```html
<li>
  Fruits
  <ul>
    <li>Apple</li>
    <li>Banana</li>
  </ul>
  All fresh, in season.
</li>
```

That "All fresh, in season." appears under the nested list, inside the same
outer item.

## When to nest

Nest when there's a **hierarchical relationship** between the parent item and
the sub-items.

Real-world examples:

- Navigation menu with submenus
- Table of contents with chapters and sections
- Feature list with sub-features
- Recipe with ingredients per step
- Task list with subtasks

Don't nest:
- Flat lists of similar things
- Anything where the sub-items aren't conceptually "inside" the parent item

## A full example

```html
<nav aria-label="Main">
  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/products">Products</a>
      <ul>
        <li><a href="/products/laptops">Laptops</a></li>
        <li><a href="/products/phones">Phones</a></li>
        <li>
          <a href="/products/accessories">Accessories</a>
          <ul>
            <li><a href="/products/accessories/cables">Cables</a></li>
            <li><a href="/products/accessories/chargers">Chargers</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

Three levels deep, each one nested inside the correct parent `<li>`.

## Common mistakes

- Placing the nested list as a sibling of `<li>` instead of inside it.
- Closing the parent `<li>` before the nested list.
- Nesting more than 4 levels — it becomes hard to read.
- Forgetting that the nested list goes *inside* the outer item, not after it.
- Mixing `<ul>` and `<ol>` carelessly — think about which meaning applies at
  each level.
- Not indenting the source consistently, making the structure impossible to see.

## The takeaway

- Nested lists go **inside** an `<li>`, never as a sibling
- Any list can nest inside any other list
- Match the type to the meaning at each level
- Keep nesting shallow — 3–4 levels max for usability
- Indent your source so the structure is visible

Nested lists are the cleanest way to express hierarchies in HTML. Get the
nesting right and everything else — CSS, accessibility, structure — works with
you instead of against you.