---
title: colgroup, col, scope, rowspan, colspan
order: 33
book: html
---

# `colgroup`, `col`, `scope`, `rowspan`, `colspan`

Five attributes and elements that give tables real power: grouping columns,
spanning cells across rows or columns, and connecting headers to their data for
accessibility.

## `colspan` — merge cells across columns

A cell can span multiple columns with `colspan`:

```html
<table>
  <tr>
    <th colspan="2">Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>First</td>
    <td>Last</td>
    <td></td>
  </tr>
  <tr>
    <td>Alice</td>
    <td>Smith</td>
    <td>30</td>
  </tr>
</table>
```

The first `<th>` spans two columns — "First" and "Last" sit under it.

`colspan="2"` means the cell takes up two column slots.

## `rowspan` — merge cells across rows

A cell can span multiple rows:

```html
<table>
  <tr>
    <th>Category</th>
    <th>Item</th>
    <th>Price</th>
  </tr>
  <tr>
    <td rowspan="2">Fruit</td>
    <td>Apple</td>
    <td>$1</td>
  </tr>
  <tr>
    <td>Banana</td>
    <td>$0.50</td>
  </tr>
  <tr>
    <td>Vegetable</td>
    <td>Carrot</td>
    <td>$0.30</td>
  </tr>
</table>
```

The "Fruit" cell covers two rows. The next row skips it — that's how rowspan
works: subsequent rows leave room for the spanning cell.

## Combining colspan and rowspan

You can use both on the same cell:

```html
<td colspan="2" rowspan="2">Big cell</td>
```

This is where tables get confusing. Keep merged cells to a minimum — they
quickly become hard to reason about.

## The counting rule

When a cell has `colspan="2"`, the row effectively has one less cell. You don't
write the second cell — the colspan consumes that slot.

```html
<tr>
  <th colspan="3">All three columns</th>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
</tr>
```

The first row has one `<th>`, but it "counts" as three cells wide. The second
row has three separate cells.

If your row cell counts don't add up, the table renders unpredictably. Count
carefully.

## `<colgroup>` and `<col>` — group columns

`<colgroup>` groups columns together, usually for styling.

```html
<table>
  <colgroup>
    <col>
    <col class="highlight">
    <col>
  </colgroup>
  <tr>
    <th>Product</th>
    <th>Price</th>
    <th>Stock</th>
  </tr>
  ...
</table>
```

Each `<col>` corresponds to one column of the table, in order. The class on the
second `<col>` applies to the second column.

Style the whole column with CSS:

```css
col.highlight {
  background: #fffbe6;
}
```

You can also use `span` to apply one `<col>` to multiple columns:

```html
<colgroup>
  <col span="2" class="narrow">
  <col class="wide">
</colgroup>
```

`<col>` is a void element (no content, no closing tag).

## When to use `<colgroup>`

- Styling columns uniformly (backgrounds, widths)
- Semantic grouping in complex tables
- Applying attributes to columns (limited — mostly just `span` and class)

`<col>` only accepts a handful of CSS properties: `background`, `border`,
`width`, `visibility`. Not all properties work on it.

For most layouts, styling via `<td>` and `<th>` is more flexible. `<colgroup>`
is best for background shading or fixed column widths.

## `scope` — connect headers to data

The `scope` attribute makes the header-data relationship explicit:

```html
<table>
  <tr>
    <th scope="col">Product</th>
    <th scope="col">Price</th>
    <th scope="col">Stock</th>
  </tr>
  <tr>
    <th scope="row">Widget</th>
    <td>$9.99</td>
    <td>42</td>
  </tr>
  <tr>
    <th scope="row">Gadget</th>
    <td>$19.99</td>
    <td>18</td>
  </tr>
</table>
```

Values:
- `col` — the header labels its column
- `row` — the header labels its row
- `colgroup` — the header labels a group of columns
- `rowgroup` — the header labels a group of rows

## Why `scope` matters

Screen readers rely on header labels to announce table cells. When a user
navigates to a cell, they hear: *"Price, Widget, $9.99"* — the column header,
row header, and cell value.

Without `scope`, browsers try to infer the relationship, which usually works
but isn't guaranteed. Explicit `scope` removes ambiguity.

For simple tables with only column headers:

```html
<tr>
  <th scope="col">Name</th>
  <th scope="col">Age</th>
</tr>
```

For tables with both row and column headers (the "cross-tab" pattern):

```html
<th scope="col">Monday</th>
...
<th scope="row">Morning</th>
```

Row headers help screen reader users know "this cell is for Wednesday
afternoon" without re-counting.

## Complex headers — `id` + `headers`

For very complex tables with headers that span multiple rows and columns,
`scope` isn't enough. Use `id` on headers and `headers` on cells to reference
them explicitly:

```html
<table>
  <tr>
    <th id="name">Name</th>
    <th id="price" colspan="2">Price</th>
  </tr>
  <tr>
    <td></td>
    <th id="usd">USD</th>
    <th id="eur">EUR</th>
  </tr>
  <tr>
    <td headers="name">Widget</td>
    <td headers="price usd">$9.99</td>
    <td headers="price eur">€9.20</td>
  </tr>
</table>
```

Each cell lists all headers that apply to it, space-separated. Powerful but
verbose. Use only for genuinely complex tables.

## Real-world example — a schedule

```html
<table>
  <caption>Weekly schedule</caption>
  <colgroup>
    <col>
    <col span="5" class="days">
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Mon</th>
      <th scope="col">Tue</th>
      <th scope="col">Wed</th>
      <th scope="col">Thu</th>
      <th scope="col">Fri</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">9:00</th>
      <td>Math</td>
      <td>Science</td>
      <td>History</td>
      <td>Art</td>
      <td>Music</td>
    </tr>
    <tr>
      <th scope="row">10:00</th>
      <td colspan="5">Assembly</td>
    </tr>
  </tbody>
</table>
```

Column headers (`scope="col"`), row headers (`scope="row"`), and a colspan for
the assembly that spans the week. Each cell is properly labeled.

## Common mistakes

- Using `colspan` or `rowspan` and then not reducing the cells in subsequent
  rows — the table becomes misaligned.
- Over-merging cells — a table with 40% merged cells is a nightmare to
  maintain.
- Forgetting `scope` on headers — screen reader users lose their bearings.
- Using `<td>` when `<th>` is more appropriate (row or column labels).
- Applying `<col>` styles to properties that don't work on columns — only
  `background`, `border`, `width`, `visibility` are reliable.
- Not testing complex tables with a screen reader. If it's not accessible to
  them, it's not finished.

## The takeaway

- `colspan` — cell spans multiple columns
- `rowspan` — cell spans multiple rows
- `<colgroup>` + `<col>` — style entire columns
- `scope="col"` or `"row"` — label headers for accessibility
- `id` + `headers` — explicit header-data links for very complex tables
- Keep merged cells to a minimum
- Every header should have a `scope`

Merged cells and column groups are advanced tools. Use them deliberately, test
with assistive tech, and keep tables as simple as you can.