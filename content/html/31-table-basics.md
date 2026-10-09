---
title: Table Basics — table, tr, td, th, caption
order: 31
book: html
---

# Table Basics — `table`, `tr`, `td`, `th`, `caption`

The `<table>` element is for **tabular data** — information that naturally
fits into rows and columns. Not for layout (that was 1990s practice; today we
use CSS).

## Basic structure

```html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>City</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>30</td>
    <td>Springfield</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>25</td>
    <td>Portland</td>
  </tr>
</table>
```

Four elements:
- `<table>` — the container
- `<tr>` — a table row
- `<th>` — a header cell
- `<td>` — a data cell

Browsers render `<th>` bold and centered by default. `<td>` is plain.

## When to use a table

Use a `<table>` when:
- Data has two or more dimensions
- Each row shares the same shape (same columns)
- Comparisons across rows make sense

Good fits:
- Financial data
- Schedules and timetables
- Comparison charts
- Statistics
- Structured lists where columns matter

Bad fits:
- Page layout (use CSS grid/flex)
- Lists of items (use `<ul>` or `<ol>`)
- Anything that's one-dimensional

If you're reaching for a `<table>` to position things on a page, stop.

## `<caption>` — the table's title

Every table should have a caption describing what it shows:

```html
<table>
  <caption>Monthly revenue, 2024</caption>
  <tr>
    <th>Month</th>
    <th>Revenue</th>
  </tr>
  ...
</table>
```

The caption appears above the table by default (you can reposition with CSS).
It's the table's accessible name — screen readers announce it.

`<caption>` goes **immediately after `<table>`**, before any `<tr>`.

## Header cells — `<th>`

Use `<th>` for cells that label a row or column. Use `<td>` for data.

```html
<tr>
  <th>Product</th>
  <th>Price</th>
  <th>Stock</th>
</tr>
<tr>
  <td>Widget</td>
  <td>$9.99</td>
  <td>42</td>
</tr>
```

Header cells at the top are **column headers**. You can also have **row
headers** on the left:

```html
<tr>
  <th>Widget</th>
  <td>$9.99</td>
  <td>42</td>
</tr>
<tr>
  <th>Gadget</th>
  <td>$19.99</td>
  <td>18</td>
</tr>
```

For accessibility, add `scope` (covered in a later lesson).

## Rows — `<tr>`

Every row of the table is a `<tr>`, containing `<td>` and `<th>` cells. Rows
can't contain text directly — only cells.

Invalid:

```html
<tr>
  Hello
  <td>World</td>
</tr>
```

Valid:

```html
<tr>
  <td>Hello</td>
  <td>World</td>
</tr>
```

## Cells — `<td>` and `<th>`

Cells hold content. Any content — text, links, images, lists, even other
tables.

```html
<tr>
  <td>Widget</td>
  <td><a href="/widgets/widget">Details</a></td>
  <td>42</td>
</tr>
```

Don't nest a table directly in a table without structure. If you must nest,
wrap it inside a cell.

## A complete example

```html
<table>
  <caption>Population by city (2020 census)</caption>
  <tr>
    <th>City</th>
    <th>Population</th>
    <th>Area (km²)</th>
  </tr>
  <tr>
    <td>Springfield</td>
    <td>168,000</td>
    <td>214</td>
  </tr>
  <tr>
    <td>Portland</td>
    <td>652,000</td>
    <td>376</td>
  </tr>
  <tr>
    <td>Salem</td>
    <td>175,000</td>
    <td>125</td>
  </tr>
</table>
```

Renders as a clean three-column table.

## Default styling

Browsers give tables minimal styling:

```css
table {
  border-collapse: separate;
  border-spacing: 2px;
}
```

That produces the classic "gap between cells" look. Most modern designs use:

```css
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f5f5f5;
  font-weight: 600;
}
```

That's the modern minimal table.

## Tables aren't for layout

In the 1990s and early 2000s, `<table>` was used to lay out entire pages —
sidebar in a cell, content in another, header spanning both.

**Don't do this.** It's bad for:
- Accessibility (screen readers announce "table" for content that isn't data)
- Responsive design (tables don't adapt to narrow screens easily)
- Code clarity (nested tables make pages unmaintainable)
- Performance

Use CSS grid or flexbox for layout. Always.

The one exception: **emails**. HTML email still uses tables for layout because
email clients have terrible CSS support. But that's a specialized area — for
the web, use CSS.

## Common mistakes

- Using tables for layout. Stop.
- Forgetting `<caption>`. Every table should have one.
- Using `<td>` for header cells. Use `<th>` where appropriate.
- Missing `<tr>` — every cell needs a row wrapper.
- Nesting tables without a clear reason.
- Not adding `scope` to headers (covered in the accessible tables lesson).
- Making the table too wide to fit on mobile without a plan. Wrap in a
  scrollable container:

```html
<div style="overflow-x: auto;">
  <table>...</table>
</div>
```

## The takeaway

- `<table>` — the container
- `<caption>` — the table's title (always include it)
- `<tr>` — a row
- `<th>` — a header cell
- `<td>` — a data cell
- Tables are for **tabular data**, not layout
- Modern tables use `border-collapse: collapse` and light borders
- Wrap in a scrolling container for mobile

Once you understand the four elements, tables are simple. The complexity comes
in styling and accessibility — which the next lessons cover.