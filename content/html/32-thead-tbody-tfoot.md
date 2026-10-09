---
title: <thead>, <tbody>, <tfoot>
order: 32
book: html
---

# `<thead>`, `<tbody>`, `<tfoot>`

A table can be divided into three semantic sections: header, body, and footer.
They don't change the visual rendering much, but they clarify structure and
enable useful features.

## The three sections

```html
<table>
  <caption>Monthly revenue, 2024</caption>

  <thead>
    <tr>
      <th>Month</th>
      <th>Revenue</th>
      <th>Expenses</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>January</td>
      <td>$12,000</td>
      <td>$8,000</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$14,500</td>
      <td>$9,200</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <th>Total</th>
      <td>$26,500</td>
      <td>$17,200</td>
    </tr>
  </tfoot>
</table>
```

- `<thead>` — the header rows
- `<tbody>` — the main data rows
- `<tfoot>` — the footer rows (typically totals, notes)

## Order in the source

Traditionally you write them in the order: `<thead>`, `<tbody>`, `<tfoot>`.

There's an older rule that says `<tfoot>` should go **before** `<tbody>` in the
source (so browsers could render the footer first in print, before the body
finished downloading). Modern HTML doesn't require this — you can put them in
logical order.

If you use the old order, browsers still render `<tfoot>` at the bottom.

## Why use them?

You could write a table without these sections:

```html
<table>
  <tr><th>Month</th><th>Revenue</th></tr>
  <tr><td>Jan</td><td>$12k</td></tr>
  <tr><td>Feb</td><td>$14k</td></tr>
</table>
```

This works. But adding `<thead>`, `<tbody>`, `<tfoot>` gives you:

- **Semantics** — screen readers can navigate by section
- **CSS hooks** — style the header/body/footer separately
- **Print behavior** — some browsers repeat `<thead>` on every printed page
- **JavaScript hooks** — easy to target the header versus data rows

For anything beyond a trivial table, use them.

## `<thead>` — header section

Contains the header rows. Usually one `<tr>` with `<th>` cells.

```html
<thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
  </tr>
</thead>
```

Multiple header rows are allowed, but rare.

## `<tbody>` — body section

Contains the main data rows. Most tables have exactly one `<tbody>` — but
multiple are allowed (useful for grouping).

```html
<tbody>
  <tr>
    <td>Alice</td>
    <td>alice@example.com</td>
    <td>Admin</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>bob@example.com</td>
    <td>Editor</td>
  </tr>
</tbody>
```

If you omit `<tbody>`, browsers add an implicit one. Always write it explicitly
for clarity.

## Multiple `<tbody>` for grouping

When rows belong to distinct groups, use multiple `<tbody>` elements:

```html
<table>
  <thead>
    <tr><th>Item</th><th>Quantity</th></tr>
  </thead>

  <tbody>
    <tr><th colspan="2">Fruits</th></tr>
    <tr><td>Apple</td><td>3</td></tr>
    <tr><td>Banana</td><td>5</td></tr>
  </tbody>

  <tbody>
    <tr><th colspan="2">Vegetables</th></tr>
    <tr><td>Carrot</td><td>2</td></tr>
    <tr><td>Broccoli</td><td>1</td></tr>
  </tbody>
</table>
```

Each `<tbody>` can be styled or scripted independently.

## `<tfoot>` — footer section

Contains footer rows — totals, averages, summary lines, notes.

```html
<tfoot>
  <tr>
    <th>Total</th>
    <td>10</td>
  </tr>
</tfoot>
```

Typically contains the summary row.

## Sticky headers with CSS

A popular effect: making the `<thead>` stick to the top of a scrolling table.

```css
table {
  border-collapse: collapse;
}

thead th {
  position: sticky;
  top: 0;
  background: var(--bg-card);
  z-index: 1;
}

.table-wrap {
  max-height: 400px;
  overflow-y: auto;
}
```

Requires the table to be inside a scrollable container (or the whole page to
scroll). `position: sticky` on `<thead>` itself doesn't work in all browsers —
target the `<th>` cells inside.

## Print styling

In print, `<thead>` can repeat on every page if the table spans multiple pages.
Browsers do this automatically in many cases.

```css
@media print {
  thead {
    display: table-header-group;
  }
  tfoot {
    display: table-footer-group;
  }
}
```

Explicit styling helps ensure the behavior across browsers.

## Styling by section

```css
thead th {
  background: #f5f5f5;
  font-weight: 600;
  text-align: left;
  position: sticky;
  top: 0;
}

tbody td {
  border-bottom: 1px solid #eaeaea;
}

tbody tr:nth-child(even) {
  background: #fafafa;
}

tfoot th {
  font-weight: 600;
  border-top: 2px solid #ccc;
}
```

Section-specific CSS keeps the styling organized.

## Common mistakes

- Forgetting `<tbody>` — not fatal (browser adds one) but the source is less
  clear.
- Putting `<tfoot>` inside `<tbody>` — it belongs as a sibling.
- Multiple `<tfoot>` elements — only one is allowed.
- Using `<thead>` to visually bold cells instead of using `<th>` — that's what
  `<th>` is for.
- Not styling `position: sticky` correctly for sticky headers — the sticky
  needs to be on the `<th>`, not the `<thead>`.
- Assuming all browsers will repeat `<thead>` on printed pages — specify the
  CSS.

## The takeaway

- `<thead>`, `<tbody>`, `<tfoot>` — divide tables semantically
- Not visually required, but clarify structure
- Screen readers navigate by section
- Use them for anything beyond a trivial table
- `position: sticky` on `<th>` cells for sticky headers
- Browsers repeat `<thead>` on print in most cases

Three small wrappers that make tables more useful in every context — CSS,
JavaScript, accessibility, and print.