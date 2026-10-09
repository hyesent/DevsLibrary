# Accessible Data Tables and Visualizations

> DevsLibrary · Web Accessibility · Lesson 16

## Use tables for data relationships
A data table communicates relationships between row and column headers. Use `<th>` for header cells and `<td>` for data cells. For simple tables, `scope="col"` and `scope="row"` often provide sufficient relationships. More complex tables may need explicit `id` and `headers` associations or a redesign into simpler tables.

```html
<table>
  <caption>Monthly support requests</caption>
  <thead><tr><th scope="col">Month</th><th scope="col">Requests</th></tr></thead>
  <tbody><tr><th scope="row">January</th><td>124</td></tr></tbody>
</table>
```

Do not use tables for visual layout. If a table is wide, keep it understandable at zoom and narrow widths; a horizontally scrollable wrapper may be justified for data that truly requires two-dimensional presentation, but communicate and test the scrolling behavior.

## Charts and maps
Do not make color the only way to distinguish series. Use direct labels, patterns, markers, or text descriptions. Include a concise summary of the main finding and offer an accessible table or equivalent data where useful. Ensure tooltips are available by keyboard and do not disappear before they can be read.

## Exercise
Create a small data table and a chart alternative. Test row and column relationships with a screen reader or accessibility inspector and compare the chart's visual takeaway with its text summary.
