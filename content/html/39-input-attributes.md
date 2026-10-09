---
title: Input Attributes — The Full List
order: 39
book: html
---

# Input Attributes — The Full List

Beyond `type` and `name`, inputs have a rich set of attributes. Some are
required, some are hints, some control validation. Here's the practical tour.

## Required for submission

### `name`

The key in the submitted data. Every input you want to receive needs one.

```html
<input type="email" name="email">
```

### `value`

The current value. For text inputs, usually left empty (the user fills it in).
For checkboxes/radios, it's the value submitted when selected:

```html
<input type="radio" name="plan" value="pro">
```

For buttons, `value` is the button's label (though `<button>` is preferred):

```html
<input type="submit" value="Send">
```

## Validation attributes

### `required`

Field must be filled before submission:

```html
<input type="email" name="email" required>
```

Screen readers announce this. Browsers block submission and show a message.

### `pattern`

A regex the value must match:

```html
<input
  type="text"
  name="zip"
  pattern="[0-9]{5}"
  title="5 digits">
```

Always include a `title` explaining the format — screen readers and the
browser's tooltip use it.

### `min` and `max`

Numeric/date range limits:

```html
<input type="number" min="0" max="100">
<input type="date" min="2024-01-01" max="2024-12-31">
```

### `step`

Increment for numeric/date inputs:

```html
<input type="number" step="0.01">   <!-- two decimal places -->
<input type="date" step="7">        <!-- weekly -->
<input type="time" step="1800">     <!-- every 30 minutes -->
```

### `minlength` and `maxlength`

Text length limits:

```html
<input type="text" minlength="3" maxlength="20">
```

`maxlength` blocks typing beyond the limit. `minlength` only triggers
validation on submit.

### `multiple`

For `email` and `file`:

```html
<input type="email" multiple>
<input type="file" multiple>
```

Allows comma-separated emails, or selecting multiple files.

## State attributes

### `disabled`

Input is uneditable and not submitted:

```html
<input type="text" name="user" disabled value="locked">
```

Grey out visually. Screen readers skip them. Value isn't sent.

### `readonly`

Input is uneditable but IS submitted:

```html
<input type="text" name="id" value="abc123" readonly>
```

Focusable, selectable, not editable. Different from `disabled` — `readonly`
preserves the value in the submission.

### `checked`

Pre-checks a checkbox or radio:

```html
<input type="checkbox" name="terms" checked>
```

### `selected` (on `<option>`)

Pre-selects an option in a `<select>`:

```html
<option value="us" selected>United States</option>
```

### `placeholder`

Hint text shown when empty:

```html
<input type="email" placeholder="you@example.com">
```

Disappears on input. Not a label. Use sparingly.

## UX and behavior attributes

### `autocomplete`

Browser autofill hints:

```html
<input type="email" autocomplete="email">
<input type="password" autocomplete="new-password">
```

Full list at MDN. Use for login, signup, checkout forms.

### `autofocus`

Focuses the input on page load:

```html
<input type="text" autofocus>
```

Only **one** autofocus per page. Use for the first field of a single-purpose
page (search, login).

### `inputmode`

Controls the mobile keyboard:

```html
<input type="text" inputmode="numeric">
```

Values: `text`, `numeric`, `decimal`, `tel`, `email`, `url`, `search`, `none`.

### `enterkeyhint`

Hint for the mobile Enter key:

```html
<input type="search" enterkeyhint="search">
```

Values: `enter`, `done`, `go`, `next`, `previous`, `search`, `send`.

### `list`

Points to a `<datalist>` for autocomplete suggestions:

```html
<input list="cities" name="city">
<datalist id="cities">
  <option value="Lagos">
  <option value="Abuja">
  <option value="Port Harcourt">
</datalist>
```

Users can pick from the list or type anything.

### `size`

Visual width in characters:

```html
<input type="text" size="30">
```

Rarely used — CSS width is better.

### `form`

Associates the input with a form by id, even if it's outside the `<form>` tag:

```html
<form id="search-form" method="get"></form>
<input type="search" name="q" form="search-form">
```

Useful when the form layout requires inputs to be elsewhere in the DOM.

### `formaction`, `formmethod`, `formenctype`, `formtarget`, `formnovalidate`

Override the parent form's attributes on a per-button basis:

```html
<form action="/default" method="post">
  <button type="submit">Save</button>
  <button type="submit" formaction="/preview" formmethod="get">
    Preview
  </button>
</form>
```

Very useful for "Save draft" vs "Publish" buttons.

## The `aria-*` and `role` attributes

For advanced accessibility:

```html
<input
  type="text"
  name="search"
  role="combobox"
  aria-autocomplete="list"
  aria-expanded="false">
```

Beyond scope here — covered in the accessibility lessons.

## A fully-loaded example

```html
<form action="/signup" method="post" autocomplete="on">
  <label for="email">Email</label>
  <input
    id="email"
    type="email"
    name="email"
    autocomplete="email"
    required
    placeholder="you@example.com"
    minlength="5"
    maxlength="254"
    enterkeyhint="next">

  <label for="password">Password</label>
  <input
    id="password"
    type="password"
    name="password"
    autocomplete="new-password"
    required
    minlength="8">

  <label for="username">Username</label>
  <input
    id="username"
    type="text"
    name="username"
    autocomplete="username"
    pattern="[a-zA-Z0-9_]{3,20}"
    title="3-20 letters, numbers, or underscores"
    required>

  <button type="submit">Create account</button>
</form>
```

Every attribute is doing work — autofill, validation, mobile keyboard hints.

## Common mistakes

- Using `disabled` when you meant `readonly`. `disabled` fields aren't
  submitted.
- Skipping `name` on inputs — they aren't sent.
- Using `maxlength` for password security. Users can edit the DOM and remove
  it. Validate on the server.
- Multiple `autofocus` on a page. Only the first is honored.
- Patterns without a `title`. Users can't figure out the format when
  validation fails.
- `placeholder` instead of `label`. Always have a real label.

## The takeaway

- `name` and `value` are the core submission attributes
- `required`, `pattern`, `min`, `max`, `step` handle validation
- `disabled` vs `readonly` — one submits, one doesn't
- `autocomplete` improves autofill — use the standard values
- `inputmode` for mobile keyboards
- `list` + `<datalist>` for suggested values
- `form*` attributes override parent form settings
- Always pair with `<label>` and `name`

The attribute list is long, but most forms use the same 10 or 15. Learn those
and reach for the rest when you need them.