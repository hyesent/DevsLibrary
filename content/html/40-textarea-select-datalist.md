---
title: textarea, select, option, optgroup, datalist
order: 40
book: html
---

# `textarea`, `select`, `option`, `optgroup`, `datalist`

Five elements for multi-line text, dropdowns, and autocomplete suggestions.
Each has a specific job.

## `<textarea>` — multi-line text

For longer text — messages, comments, bios, descriptions.

```html
<label for="message">Message</label>
<textarea id="message" name="message" rows="5" cols="40"></textarea>
```

Note: `<textarea>` has an **opening and closing tag**. Content between them is
the initial value:

```html
<textarea name="bio">Hello, I'm learning HTML.</textarea>
```

Unlike `<input>`, there's no `value` attribute.

### `rows` and `cols`

Visual size in rows of text and characters:

```html
<textarea rows="5" cols="40"></textarea>
```

Rarely used — CSS sizing is preferred:

```css
textarea {
  width: 100%;
  min-height: 120px;
  resize: vertical;
}
```

The `resize` CSS property controls whether users can drag the textarea's corner.
Values: `none`, `both`, `horizontal`, `vertical`.

### Textarea attributes

Same as text inputs:
- `name`
- `required`
- `placeholder`
- `maxlength` (character limit)
- `minlength`
- `autocomplete`
- `readonly`
- `disabled`
- `wrap` — controls how text wraps on submit (`soft` or `hard`)

```html
<textarea
  name="comment"
  rows="4"
  maxlength="500"
  placeholder="Write your comment..."
  required></textarea>
```

### Whitespace matters

Newlines and indentation inside `<textarea>` are preserved:

```html
<textarea name="code">
  function hello() {
    return "world";
  }
</textarea>
```

The leading newline and indentation are included. To avoid unwanted whitespace:

```html
<textarea name="code">function hello() {
  return "world";
}</textarea>
```

Or set the value with JavaScript.

## `<select>` — a dropdown

A list of options where the user picks one (or, with `multiple`, several).

```html
<label for="country">Country</label>
<select id="country" name="country">
  <option value="">Choose one</option>
  <option value="us">United States</option>
  <option value="ng">Nigeria</option>
  <option value="uk">United Kingdom</option>
</select>
```

The first option (empty value) acts as a placeholder.

### The `<option>` element

Each item:

```html
<option value="us">United States</option>
```

- `value` — what's submitted (falls back to text content if omitted)
- Text content — what the user sees

```html
<option>United States</option>
```

Submits `United States` as the value.

### `selected` and `disabled`

```html
<option value="" disabled selected>Choose one</option>
```

The placeholder can't be re-selected once the user picks something.

### Pre-selecting an option

```html
<select name="country">
  <option value="us">United States</option>
  <option value="ng" selected>Nigeria</option>
  <option value="uk">United Kingdom</option>
</select>
```

### Multiple selection

```html
<select name="colors" multiple size="4">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

Renders as a scrolling list, not a dropdown. Users Ctrl/Cmd-click to select
multiple. Awkward on mobile — use checkboxes instead.

## `<optgroup>` — group options

Groups related options in a dropdown:

```html
<select name="city">
  <optgroup label="Africa">
    <option value="lagos">Lagos</option>
    <option value="cairo">Cairo</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="london">London</option>
    <option value="paris">Paris</option>
  </optgroup>
</select>
```

The `label` is the group heading. Options inside can't be selected as a group
— they're just visually grouped.

You can disable a whole group:

```html
<optgroup label="Sold out" disabled>
  <option value="x">Item X</option>
</optgroup>
```

## `<datalist>` — suggested values

Autocomplete suggestions, without restricting input:

```html
<label for="browser">Browser</label>
<input id="browser" list="browsers" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>
```

The input's `list` attribute points to the `<datalist>` id.

Users can:
- Type freely
- Pick from the suggestions

Different from `<select>` — datalist is suggestions, not a fixed list.

### Datalist on other inputs

Works with `<input type="color">`, `type="range"`, `type="date"`, etc.:

```html
<input type="range" min="0" max="100" list="ticks" name="volume">
<datalist id="ticks">
  <option value="0" label="Off"></option>
  <option value="50" label="Half"></option>
  <option value="100" label="Max"></option>
</datalist>
```

For range inputs, `label` shows in a bubble next to the slider value.

### Browser support caveats

Datalist support varies. Chrome, Firefox, Safari support it. Styling is
limited — it's browser UI, not stylable HTML.

For richer autocomplete, use a JavaScript solution (Downshift, Tom Select).

## Combining

A complete address form:

```html
<fieldset>
  <legend>Address</legend>

  <label for="street">Street</label>
  <textarea id="street" name="street" rows="2" required></textarea>

  <label for="city">City</label>
  <input id="city" name="city" list="cities" required>
  <datalist id="cities">
    <option value="Lagos">
    <option value="Abuja">
    <option value="Port Harcourt">
  </datalist>

  <label for="country">Country</label>
  <select id="country" name="country" required>
    <option value="" disabled selected>Choose one</option>
    <optgroup label="Africa">
      <option value="ng">Nigeria</option>
      <option value="ke">Kenya</option>
    </optgroup>
    <optgroup label="Europe">
      <option value="uk">United Kingdom</option>
    </optgroup>
  </select>
</fieldset>
```

## Common mistakes

- Forgetting the closing `</textarea>` tag — everything after it becomes the
  value.
- Whitespace inside `<textarea>` becoming part of the value. Trim or use
  JavaScript.
- Using `<select multiple>` on mobile — terrible UX, use checkboxes.
- No placeholder in a `<select>` — user can't tell they need to choose.
- Missing `<label>` on `<select>` — screen readers announce "combobox" with no
  context.
- Using `<datalist>` and expecting full styling control — it's browser UI.
- Nesting `<optgroup>` inside another `<optgroup>` — not allowed.

## The takeaway

- `<textarea>` — multi-line text, content is initial value
- `<select>` + `<option>` — dropdown, `selected` for pre-selection
- `<optgroup>` — group options in a select
- `<datalist>` — autocomplete suggestions for a text input
- All need `<label>` and `name`
- Match the element to the data: multi-line → textarea, one-of-many → select,
  suggested-values → datalist

These four elements cover most form controls beyond `<input>`.