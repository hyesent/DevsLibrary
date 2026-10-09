---
title: Input Types — Part 2 (date, time, color, range, file, checkbox, radio)
order: 38
book: html
---

# Input Types — Part 2

The remaining `<input>` types cover dates, times, color pickers, sliders, file
uploads, and the two controls that make up most forms: checkboxes and radio
buttons.

## `type="checkbox"` — multiple selections

A checkbox represents a boolean state, or lets users select multiple options
from a set.

```html
<label>
  <input type="checkbox" name="newsletter">
  Subscribe to newsletter
</label>
```

If checked, the form submits `newsletter=on`. If unchecked, the input is not
submitted at all — the key is missing from the request.

To submit a specific value:

```html
<input type="checkbox" name="color" value="red">
<input type="checkbox" name="color" value="blue">
<input type="checkbox" name="color" value="green">
```

Submitting with red and blue checked sends `color=red&color=blue`.

### The `checked` attribute

Pre-checks a box:

```html
<input type="checkbox" name="terms" checked>
```

### Pre-checked state and form submission

An unchecked checkbox is not submitted. This is a common gotcha — servers
often need to distinguish "unchecked" from "missing." Fix: include a hidden
input with the same name first:

```html
<input type="hidden" name="newsletter" value="off">
<input type="checkbox" name="newsletter" value="on">
```

If the checkbox is checked, the second wins and `newsletter=on` is sent. If
unchecked, only the hidden field is sent: `newsletter=off`.

## `type="radio"` — single selection

Radio buttons let users pick one option from a group.

```html
<fieldset>
  <legend>Preferred contact method</legend>

  <label>
    <input type="radio" name="contact" value="email" checked>
    Email
  </label>

  <label>
    <input type="radio" name="contact" value="phone">
    Phone
  </label>

  <label>
    <input type="radio" name="contact" value="sms">
    SMS
  </label>
</fieldset>
```

Key rule: **radios in the same group share the same `name`**. The browser
enforces that only one in the group is checked.

Every radio in the group needs:
- The same `name`
- A unique `value`
- A `<label>`

Without a `<fieldset>` and `<legend>`, screen readers can't tell what the
group is for. Always wrap radio groups.

## `type="date"`

A date picker:

```html
<label for="birthday">Birthday</label>
<input id="birthday" type="date" name="birthday">
```

Value format is `yyyy-mm-dd` (ISO 8601). The visual picker varies by browser.

Attributes:
- `min` — earliest date
- `max` — latest date
- `step` — interval (usually days)

```html
<input type="date" min="1900-01-01" max="2024-12-31">
```

Browsers that don't support `date` fall back to `text`. Always include a
label with the expected format for those cases.

## `type="time"`

Time picker:

```html
<label for="appt">Appointment time</label>
<input id="appt" type="time" name="appt">
```

Value format: `HH:MM` in 24-hour format. Browsers display in the user's locale
format.

Add `step` for seconds:

```html
<input type="time" step="1">
```

## `type="datetime-local"`

Date + time without timezone:

```html
<label for="meeting">Meeting</label>
<input id="meeting" type="datetime-local" name="meeting">
```

Value: `yyyy-mm-ddThh:mm` (the `T` separates date and time).

For timezone-aware picks, you need JavaScript — HTML has no built-in
timezone-aware input.

## `type="month"` and `type="week"`

```html
<input type="month" name="billing-month">
<input type="week" name="schedule-week">
```

Pick a month or a week. Support varies — some browsers show a fallback text
field. Use with a note about format if fallback is likely.

## `type="color"`

A color picker:

```html
<label for="theme">Favorite color</label>
<input id="theme" type="color" name="theme" value="#61dafb">
```

Opens the OS color picker. Value is always a hex color (`#rrggbb`).

You can't limit to a palette — the browser shows whatever picker it uses.
Set an initial value with `value`.

## `type="range"`

A slider:

```html
<label for="volume">Volume</label>
<input id="volume" type="range" name="volume" min="0" max="100" value="50" step="1">
```

Attributes:
- `min`, `max` — range
- `step` — increment
- `value` — starting value

Ranges are less precise than number inputs — fine for "ballpark" settings
(volume, brightness, satisfaction).

For fine control, pair with a `<datalist>` for tick marks:

```html
<input type="range" min="0" max="100" list="ticks">
<datalist id="ticks">
  <option value="0" label="Off"></option>
  <option value="50" label="Medium"></option>
  <option value="100" label="Max"></option>
</datalist>
```

## `type="file"`

A file upload picker:

```html
<label for="avatar">Profile picture</label>
<input id="avatar" type="file" name="avatar">
```

Requires the parent form to have `enctype="multipart/form-data"`:

```html
<form method="post" enctype="multipart/form-data">
```

### Accepting specific types

```html
<input type="file" accept="image/*">
<input type="file" accept=".pdf,.doc,.docx">
<input type="file" accept="image/png,image/jpeg">
```

`accept` is a **hint** — the browser filters the picker but users can still
pick any file by choosing "All files." Validate on the server.

### Multiple files

```html
<input type="file" multiple>
```

Value becomes a `FileList` — accessible via JS, not as form data directly.

### Capture on mobile

```html
<input type="file" accept="image/*" capture="environment">
```

Opens the camera directly on mobile. `user` = front camera, `environment` =
rear.

### Styling file inputs

Notoriously hard to style. Common pattern: hide the input and use a label or
button that triggers it:

```html
<label for="avatar" class="file-btn">Choose file</label>
<input id="avatar" type="file" name="avatar" style="display: none;">
```

## Combining date and time inputs

Real-world booking form:

```html
<fieldset>
  <legend>Appointment</legend>

  <label for="date">Date</label>
  <input id="date" type="date" name="date" min="2024-01-01" required>

  <label for="time">Time</label>
  <input id="time" type="time" name="time" min="09:00" max="17:00" required>

  <label for="duration">Duration (minutes)</label>
  <input id="duration" type="number" name="duration" min="15" max="120"
         step="15" value="30">
</fieldset>
```

## Common mistakes

- Radio buttons without a shared `name` — they don't group, and every option
  is selectable at once.
- Checkbox groups without a `<fieldset>` — screen readers lack context.
- Using `type="date"` and expecting all browsers to show a date picker. Some
  fall back to text input. Add a note about format.
- File input without `enctype="multipart/form-data"` on the form — file
  contents don't upload.
- Relying on `accept` for security. Always validate file type on the server.
- Range inputs without a live numeric display — users can't tell the exact
  value.
- Using color inputs and expecting a color name — value is always hex.

## The takeaway

- `checkbox` — multiple selections, or a boolean state
- `radio` — one of a group; same `name` groups them
- `date`, `time`, `datetime-local` — native pickers, ISO-format values
- `month`, `week` — less-supported, use with fallback
- `color` — native color picker, hex value
- `range` — slider, use for approximate values
- `file` — requires `multipart/form-data`, `accept` is a hint only
- Wrap radio/checkbox groups in `<fieldset>` + `<legend>`

Native pickers give you free accessibility and mobile keyboards. Use them
unless you have a specific reason not to.