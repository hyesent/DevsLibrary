---
title: Buttons, output, progress, meter
order: 41
book: html
---

# Buttons, `output`, `progress`, `meter`

Beyond inputs, forms have buttons and several utility elements for showing
values, progress, and measurements.

## `<button>` vs `<input type="button">`

Two ways to make a button. Use `<button>` almost always.

```html
<button type="button">Click me</button>
<input type="button" value="Click me">
```

Differences:
- `<button>` has opening and closing tags — content can be HTML (icons,
  images, mixed text)
- `<input>` is a void element — label is set via `value` attribute, text only
- `<button>` is more flexible and easier to style
- Both are focusable and behave the same for forms

Use `<button>` unless you're matching legacy code.

## Button types

The `type` attribute on `<button>` matters:

```html
<button type="submit">Send</button>
<button type="reset">Reset</button>
<button type="button">Do something</button>
```

### `type="submit"`

Submits the form. This is the **default** — a button without `type` inside a
form submits.

```html
<form action="/save" method="post">
  <input name="title">
  <button>Save</button>  <!-- submits the form -->
</form>
```

### `type="reset"`

Resets all inputs in the form to their initial values. Rarely used — users
often click it accidentally.

```html
<button type="reset">Clear</button>
```

### `type="button"`

Does nothing by default. Meant to be hooked up with JavaScript.

```html
<button type="button" onclick="openModal()">Open</button>
```

**Always specify `type="button"`** for buttons inside a form that aren't
submitting. Otherwise clicking them submits the form unexpectedly.

## Button vs link

Use `<button>` for actions and `<a>` for navigation:

- `<button>` — opens a modal, submits a form, toggles a menu
- `<a>` — goes to another page, opens a document

Links can be opened in new tabs, shared, bookmarked. Buttons can't. If the
action navigates somewhere, use a link.

Bad:

```html
<a href="#" onclick="openModal(); return false;">Open</a>
```

Better:

```html
<button type="button" onclick="openModal()">Open</button>
```

## Disabling buttons

```html
<button type="submit" disabled>Sending...</button>
```

Disabled buttons:
- Can't be clicked
- Are skipped in tab order
- Don't submit with the form
- Screen readers announce them as "unavailable"

Common for showing pending state during form submission.

## Button content

Buttons can contain HTML:

```html
<button type="submit">
  <svg><!-- icon --></svg>
  Save changes
</button>
```

Icons, images, styled spans — all valid inside `<button>`.

Accessibility note: if a button is icon-only, add `aria-label`:

```html
<button type="button" aria-label="Close">
  <svg>...</svg>
</button>
```

Without it, screen readers announce nothing useful.

## `<output>` — computed result

A container for the result of a calculation or user action:

```html
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" name="a" id="a" value="0">
  +
  <input type="number" name="b" id="b" value="0">
  =
  <output name="result" for="a b">0</output>
</form>
```

- `for` — space-separated ids of the inputs it depends on
- Content is the current value
- Screen readers announce it as a live region (updates are announced)

Use for calculators, form totals, live previews.

## `<progress>` — a task progress bar

Shows progress toward completion.

### Determinate (known progress)

```html
<label for="upload">Uploading...</label>
<progress id="upload" value="70" max="100">70%</progress>
```

`value` divided by `max` gives the fraction. Rendered as a filled bar.

### Indeterminate (unknown progress)

```html
<progress></progress>
```

No `value` — shows an animated indefinite bar. Use when you don't know how
long something will take.

## `<meter>` — a scalar measurement

Shows a value within a known range, with visual zones (low/medium/high):

```html
<label for="disk">Disk usage</label>
<meter id="disk" value="0.7" min="0" max="1">70%</meter>
```

Different from `<progress>` semantically:
- `<progress>` — "task is X% done, ends at 100%"
- `<meter>` — "current value is 0.7 out of 1" (no inherent task)

### Zones

```html
<meter
  value="75"
  min="0"
  max="100"
  low="25"
  high="75"
  optimum="100">
  75%
</meter>
```

- `low` — below this is "low"
- `high` — above this is "high"
- `optimum` — what value is "good"

Browsers color the meter differently based on where `value` falls.

Use for:
- Disk usage
- Battery level
- Score out of 100
- Temperature (with min/max)
- Any measurement in a known range

## Styling progress and meter

Both are relatively limited in CSS customization. Each browser styles them
differently. Common approaches:

- Use `::-webkit-progress-bar` and `::-webkit-progress-value` for WebKit
- Use `::-moz-progress-bar` for Firefox
- Or build a custom bar with `<div>` and CSS

For consistent cross-browser styling, custom divs are more reliable. Use
`<progress>` / `<meter>` when accessibility matters more than perfect visuals.

## Complete example — form with feedback

```html
<form action="/submit" method="post" id="signup">
  <label for="username">Username</label>
  <input
    id="username"
    name="username"
    required
    minlength="3"
    maxlength="20"
    oninput="checkLength(this.value)">

  <output for="username" id="feedback">3-20 characters</output>

  <div>
    <label for="strength">Password strength</label>
    <meter
      id="strength"
      min="0"
      max="100"
      low="40"
      high="70"
      optimum="100"
      value="0">0%</meter>
  </div>

  <button type="submit">Create account</button>
  <button type="reset">Clear</button>
</form>
```

Small JS updates `feedback` and `strength` as the user types.

## Common mistakes

- Forgetting `type="button"` on JS-hooked buttons inside a form. They submit
  by default.
- Using `<button>` for navigation. Use `<a>` for links.
- Icon-only buttons without `aria-label`.
- Using `<meter>` for task progress. Use `<progress>`.
- Using `<progress>` for battery-like readings. Use `<meter>`.
- Relying on CSS to style `<progress>`/`<meter>` consistently across browsers.
- Putting the closing `</button>` after a nested `<button>` — invalid; buttons
  don't nest.

## The takeaway

- `<button>` — always the right choice for action buttons
- `type="submit"` (default) vs `type="button"` vs `type="reset"`
- `disabled` greys out and prevents clicks
- `<output>` — live-updated computed values
- `<progress>` — task progress (determinate or indeterminate)
- `<meter>` — scalar measurement in a range
- Always set `type` on buttons inside forms
- Add `aria-label` to icon-only buttons

Small set of elements, but each has a clear purpose in a form's feedback loop.