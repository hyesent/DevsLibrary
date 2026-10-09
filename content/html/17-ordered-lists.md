---
title: Ordered Lists — <ol> and <li>
order: 17
book: html
---

# Ordered Lists — `<ol>` and `<li>`

An ordered list is a collection of items where **order matters**. Browsers
render it with numbers by default, but the meaning is: these items have a
sequence.

## Basic structure

```html
<ol>
  <li>Preheat oven to 180°C</li>
  <li>Mix flour and sugar</li>
  <li>Add eggs and stir</li>
  <li>Bake for 25 minutes</li>
</ol>
```

Two elements, same as `<ul>`:
- `<ol>` — the ordered list container
- `<li>` — a list item

The difference between `<ul>` and `<ol>` is **semantic only**: does the order
matter? If yes, `<ol>`. If no, `<ul>`. Visually the browser just changes the
marker.

## When to use `<ol>`

Use it when the sequence is meaningful:

- Recipe steps
- Instructions
- Rankings (top 10, best to worst)
- Legal clauses
- Anywhere the order changes the meaning

If reordering the items would break the sense, it's an `<ol>`.

## The `type` attribute

Changes the numbering style.

```html
<ol type="1">  <!-- 1, 2, 3 (default) -->
<ol type="A">  <!-- A, B, C -->
<ol type="a">  <!-- a, b, c -->
<ol type="I">  <!-- I, II, III (uppercase Roman) -->
<ol type="i">  <!-- i, ii, iii (lowercase Roman) -->
```

Example:

```html
<ol type="A">
  <li>Introduction</li>
  <li>Methods</li>
  <li>Results</li>
  <li>Discussion</li>
</ol>
```

Renders as A, B, C, D.

This is a **presentation** attribute but it's also valid in HTML5. For pure
styling, `list-style-type` in CSS is preferred. For semantic reasons (like "the
sections of a legal document are lettered"), the `type` attribute is fine.

## The `start` attribute

Starts the numbering at a specific number.

```html
<ol start="5">
  <li>Fifth item</li>
  <li>Sixth item</li>
</ol>
```

Renders as 5, 6.

Useful when a list continues from somewhere else — like a two-page recipe, or
a list that was interrupted.

## The `reversed` attribute

Numbers in reverse — from N down to 1.

```html
<ol reversed>
  <li>Bronze</li>
  <li>Silver</li>
  <li>Gold</li>
</ol>
```

Renders as 3, 2, 1. If you add `start="10"`:

```html
<ol reversed start="10">
  <li>First</li>
  <li>Second</li>
</ol>
```

Renders as 10, 9.

Handy for countdowns or "top 10" lists.

## Combining attributes

```html
<ol type="i" start="3" reversed>
  <li>Third</li>
  <li>Second</li>
  <li>First</li>
</ol>
```

Renders as iii, ii, i. All three attributes can combine.

## The `value` attribute on `<li>`

You can override the number of a specific list item:

```html
<ol>
  <li>One</li>
  <li value="10">Jump to ten</li>
  <li>Eleven</li>
</ol>
```

Renders as 1, 10, 11.

Rarely useful. Occasionally used for legal documents where sections are
referenced by number.

## Styling

Like `<ul>`, you can change the marker with CSS:

```css
ol { list-style-type: decimal; }
ol { list-style-type: lower-alpha; }
ol { list-style-type: upper-roman; }
ol { list-style-type: none; }
```

## Custom numbering with CSS counters

When you need full control over the marker — like "Step 1:", "Chapter 3:", etc.
— use CSS counters:

```css
ol.steps {
  counter-reset: step;
  list-style: none;
}

ol.steps li::before {
  counter-increment: step;
  content: "Step " counter(step) ": ";
  font-weight: bold;
}
```

This gives you a marker that says "Step 1:", "Step 2:", etc., instead of just
numbers.

## `<ol>` vs `<ul>` — the decision

Quick rule:

- Can the items be rearranged without changing meaning? → `<ul>`
- Does the order carry information? → `<ol>`

Examples:

| Content | Element |
|---|---|
| Shopping list | `<ul>` |
| Recipe steps | `<ol>` |
| Navigation links | `<ul>` |
| Top 10 movies | `<ol>` |
| Features of a product | `<ul>` |
| Assembly instructions | `<ol>` |
| Ranking (1st, 2nd, 3rd) | `<ol>` |
| Legal clauses | `<ol>` |

If you're unsure, ask: **would renaming the numbers change anything?** If yes,
`<ol>`.

## Nested ordered lists

You can nest an `<ol>` inside an `<li>`:

```html
<ol>
  <li>
    First major step
    <ol>
      <li>Sub-step one</li>
      <li>Sub-step two</li>
    </ol>
  </li>
  <li>Second major step</li>
</ol>
```

Browsers automatically switch the nested marker to a different style (letters
or lowercase Roman) so you can tell the levels apart.

## Common mistakes

- Using `<ol>` when order doesn't matter. If the items could be reordered, it's
  a `<ul>`.
- Using `<ul>` for steps in a recipe or instructions. Those have order.
- Forgetting `<li>` and writing text directly inside `<ol>`.
- Nesting `<ol>` directly inside `<ol>` without an `<li>` wrapper. The inner
  list must be inside a `<li>`.
- Confusing "the user read this in order" with "the items have order." Almost
  all lists are read in order; that's not the criterion.
- Overriding markers with `type` when CSS `list-style-type` would do.

## The takeaway

- `<ol>` — ordered list, order matters
- `<li>` — list item
- `type` changes numbering style (1, A, a, I, i)
- `start` sets the beginning number
- `reversed` counts backward
- `value` on `<li>` overrides a specific item
- Use `<ol>` when reordering would change meaning

Lists are the backbone of instructions, recipes, rankings, and legal documents.
Pick `<ol>` when sequence matters.