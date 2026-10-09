---
title: Building Accessible Tables
order: 34
book: html
---

# Building Accessible Tables

Tables are notoriously hard to make accessible. Sighted users scan them
visually — column headers at top, row headers at the side, cells in between.
Screen reader users navigate them cell by cell and rely on explicit markup to
know what each cell means.

This lesson is the checklist for making tables work for everyone.

## The basics — recap

Every table should have:

1. A `<caption>` describing what the table shows
2. `<thead>`, `<tbody>`, `<tfoot>` for structure
3. `<th>` for all header cells
4. `scope` on every `<th>`
5. No merged cells unless you really need them

```html
<table>
  <caption>Top 5 highest mountains, 2024</caption>
  <thead>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col">Mountain</th>
      <th scope="col">Height (m)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <th scope="row">Everest</th>
      <td>8,849</td>
    </tr>
    <tr>
      <td>2</td>
      <th scope="row">K2</th>
      <td>8,611</td>
    </tr>
  </tbody>
</table>
```

## Why this matters

Imagine navigating a table only by ear. A screen reader user presses a key to
move from cell to cell. At each cell, they hear:

> "Height, K2, 8,611"

Without `scope` and proper headers, they'd hear:

> "8,611"

…with no idea what it means.

The whole point of table markup is to preserve the header-data relationships
that sighted users get for free from visual layout.

## The five rules

### 1. Always include a `<caption>`

The caption is the table's accessible name. Screen readers announce it when a
user enters the table:

> "Table: Top 5 highest mountains, 2024. 5 rows, 3 columns."

Without a caption, users hear "table" with no context. Every data table needs
one.

### 2. Use `<th>` for all headers

Not `<td>` with bold styling. Use `<th>` — it's the semantic marker for "this
cell labels other cells."

Both column headers and row headers use `<th>`. The difference is `scope`.

### 3. Set `scope` on every `<th>`

```html
<th scope="col">Price</th>
<th scope="row">Widget</th>
```

Values:
- `col` — labels its column
- `row` — labels its row
- `colgroup` — labels a group of columns
- `rowgroup` — labels a group of rows

Explicit is better. Don't make the browser guess.

### 4. Group rows with `<thead>`, `<tbody>`, `<tfoot>`

This gives screen readers structure to navigate by. A user can jump to the
header, jump to the body, etc.

### 5. Keep it simple when you can

The more merged cells, multi-level headers, and nested tables you have, the
harder the table is to navigate — for everyone.

Ask: could this be split into two simpler tables? Could a list work? Only use
a complex table when the data genuinely requires it.

## Complex tables — explicit headers

When headers span multiple rows/columns, `scope` alone isn't enough. Use `id`
and `headers`:

```html
<table>
  <caption>Quarterly sales by region</caption>
  <thead>
    <tr>
      <th id="region">Region</th>
      <th id="q1" colspan="2">Q1</th>
      <th id="q2" colspan="2">Q2</th>
    </tr>
    <tr>
      <th></th>
      <th id="q1-usd">USD</th>
      <th id="q1-eur">EUR</th>
      <th id="q2-usd">USD</th>
      <th id="q2-eur">EUR</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="north">North</th>
      <td headers="region north q1 q1-usd">$1.2M</td>
      <td headers="region north q1 q1-eur">€1.1M</td>
      <td headers="region north q2 q2-usd">$1.5M</td>
      <td headers="region north q2 q2-eur">€1.4M</td>
    </tr>
  </tbody>
</table>
```

Each cell lists all the headers that apply, space-separated. Screen readers
announce them in order:

> "Region: North. Q1, USD: $1.2M"

Verbose in the markup, but exact.

For most tables, you won't need this. Use `scope` unless the header structure is
genuinely multi-level.

## Table navigation patterns

Screen readers offer table-specific commands (varies by reader):

- Jump to next cell, previous cell
- Jump to next row, previous row
- Jump to next column, previous column
- Announce current row/column header
- Jump to table start/end

For these to work well, the markup needs:
- `<caption>` for context
- `<th>` + `scope` for headers
- `<thead>`/`<tbody>` for navigation boundaries

Get these right and users can fly through even large tables.

## Mobile considerations

Tables are wide by nature. On narrow screens, tables overflow. Two approaches:

### Horizontal scroll

```html
<div class="table-wrap">
  <table>...</table>
</div>
```

```css
.table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

Simple, preserves structure, works with screen readers. Add `tabindex="0"` to
the wrapper so keyboard users can scroll:

```html
<div class="table-wrap" tabindex="0">
```

### Responsive tables — cards on mobile

For a different approach, some sites convert table rows to card layouts below a
breakpoint. This is done with CSS:

```css
@media (max-width: 600px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  td {
    position: relative;
    padding-left: 50%;
  }
  td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    font-weight: bold;
  }
}
```

Requires data attributes on cells:

```html
<td data-label="Price">$9.99</td>
```

Nice visually, but adds complexity. And a caveat: converting `display: table`
to `display: block` removes table semantics — you'll need
`role="table"`, `role="row"`, etc. to preserve them. It gets messy.

For most projects, horizontal scroll is simpler and safer.

## Color and contrast

Table cells are content — they need to meet contrast requirements:

- Text on background: 4.5:1 minimum (WCAG AA)
- Interactive cells (links): same
- Don't rely on color alone to convey meaning (a red cell that says "error"
  needs a text label too)

Dark mode and theme support matter here — test your tables in every theme.

## Testing accessibility

1. **Keyboard navigation**: Tab through the table. Can you reach every cell
   (if interactive)? Can you scroll the wrapper?
2. **Screen reader**: Use VoiceOver (Mac), NVDA (Windows), or Orca (Linux).
   Navigate to the table. Do headers announce correctly?
3. **Zoom**: Zoom to 200%. Does the table become unusable?
4. **Automated tools**: axe, Lighthouse, WAVE. They catch missing captions and
   scopes.

Automated tools catch maybe 30% of issues. Manual testing is essential.

## Common mistakes

- No `<caption>` — screen reader users have no context.
- Using `<td>` for headers with bold CSS styling.
- Missing `scope` on `<th>`.
- Merged cells without `id`/`headers` to link them.
- Empty header cells with no label.
- Tables with cells that don't line up (miscounting `colspan`).
- Making tables that are 15 columns wide and expecting mobile users to cope.
- Relying on color alone to indicate status.
- Not testing with a screen reader.

## The takeaway

- Every table needs a `<caption>`
- Use `<th>` for all headers, both column and row
- Set `scope` on every `<th>`
- Structure with `<thead>`, `<tbody>`, `<tfoot>`
- Use `id`/`headers` for complex multi-level headers
- Wrap wide tables in a scrollable container
- Test with a screen reader — automated tools miss most issues
- Prefer simple tables — complex is hard for everyone

Accessible tables are more work upfront, but they're the difference between a
table that "looks fine" and one that everyone can actually read.