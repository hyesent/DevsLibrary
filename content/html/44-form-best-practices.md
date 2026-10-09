---
title: Form Best Practices and Patterns
order: 44
book: html
---

# Form Best Practices and Patterns

Form markup is one thing. Making forms that people actually complete is
another. This lesson is the practical layer — patterns, layouts, and habits
that separate usable forms from frustrating ones.

## Structure

### One column beats two

Multi-column forms feel efficient but perform worse. Eye tracking studies show
users miss fields in side-by-side layouts. Stack inputs vertically.

```html
<div class="field">
  <label for="first">First name</label>
  <input id="first" name="first">
</div>

<div class="field">
  <label for="last">Last name</label>
  <input id="last" name="last">
</div>
```

CSS:

```css
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
}
```

Exception: very short fields that are logically paired (like city and ZIP)
can share a row on wide screens.

### Group with fieldsets

Logical groups with `<fieldset>` + `<legend>`:

```html
<fieldset>
  <legend>Contact details</legend>
  <!-- phone, email, etc. -->
</fieldset>

<fieldset>
  <legend>Shipping address</legend>
  <!-- address fields -->
</fieldset>
```

Screen readers announce the group; sighted users get a visual section.

### Labels above inputs

Preferred for most forms:

```html
<label for="email">Email</label>
<input id="email" type="email">
```

```
Email
[________________]
```

Labels **above** are:
- Easier to scan
- Better for mobile (no cramped side-by-side)
- Work with variable-width labels
- Survive translation to longer languages

Labels on the left are common in enterprise apps, but risk running out of
room. Above is safer.

### Inputs full width

By default, inputs size to their content attribute. For a stacked form,
full-width works better:

```css
input, select, textarea {
  width: 100%;
}
```

## Layout

### Grid for alignment

A grid keeps labels and inputs aligned across fields:

```css
form {
  display: grid;
  gap: 20px;
}

.field {
  display: grid;
  gap: 4px;
}
```

For a two-column layout (labels left, inputs right):

```css
form {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px 16px;
  align-items: center;
}
```

### Buttons at the bottom

Submit buttons should be at the bottom of the form, right-aligned or full-width
on mobile:

```html
<div class="form-actions">
  <button type="submit">Save</button>
</div>
```

```css
.form-actions {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
```

Primary action on the right (in LTR locales), secondary on the left.

## Field design

### Inputs sized to content

A "phone" field doesn't need to be as wide as an "address". Match sizes to what
users will type:

```css
input[name="zip"] { max-width: 8ch; }
input[name="phone"] { max-width: 16ch; }
input[name="year"] { max-width: 6ch; }
```

Prevents the "what do they want me to type here?" feeling of a huge empty box.

### Padding and height

Adequate padding for touch:

```css
input, textarea, select {
  padding: 10px 12px;
  font-size: 16px;   /* iOS Safari zooms on smaller fonts */
  border: 1px solid #ccc;
  border-radius: 6px;
}
```

`font-size: 16px` on inputs prevents iOS Safari from auto-zooming on focus.

### Focus states

Every input needs a visible focus indicator:

```css
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #61dafb;
  outline-offset: 2px;
  border-color: transparent;
}
```

Don't remove focus outlines without a replacement.

### Placeholders as hints

Use placeholders for format examples, not labels:

```html
<label for="date">Date</label>
<input id="date" type="date">
```

Not:

```html
<input placeholder="Date">   <!-- no label -->
```

## Validation patterns

### Inline vs on submit

Two philosophies:

**Inline validation** — validate on blur (when the user leaves the field),
show errors immediately.

Pros: fast feedback.
Cons: annoying on fields the user is still typing (or hasn't reached).

**Submit validation** — validate when the user clicks submit.

Pros: less intrusive.
Cons: user has to fix multiple errors at once.

**Recommended**: hybrid. Validate on blur (not on input), show errors inline,
and re-validate on submit.

### Error message placement

Directly under the field:

```html
<label for="email">Email</label>
<input id="email" type="email" aria-describedby="email-error" aria-invalid="true">
<p id="email-error" class="error">Please enter a valid email</p>
```

Style with a red border or icon — but not color alone:

```css
input[aria-invalid="true"] {
  border-color: #dc2626;
}

.error::before {
  content: "⚠ ";   /* or an SVG icon */
}
```

### Success states

Optional — a green checkmark for valid fields, only after the user has finished:

```js
input.addEventListener('blur', () => {
  if (input.validity.valid && input.value) {
    input.classList.add('valid');
  } else {
    input.classList.remove('valid');
  }
});
```

Don't show success on empty fields — that's confusing.

## UX patterns

### Autosave

For long forms, autosave to localStorage periodically:

```js
setInterval(() => {
  localStorage.setItem('draft-form', JSON.stringify(getFormData()));
}, 5000);
```

On page load, restore. Saves users from losing progress on accidental reloads.

### Confirm before leaving

If a form has unsaved changes:

```js
window.addEventListener('beforeunload', (e) => {
  if (hasUnsavedChanges()) {
    e.preventDefault();
    e.returnValue = '';
  }
});
```

Modern browsers show a generic message; you can't customize it.

### Submit button state

Disable during submission to prevent double-submits:

```js
form.addEventListener('submit', () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Saving...';
});
```

Show a spinner if submission takes time.

### Confirmation messages

After successful submission, tell the user:

```html
<div role="status">
  Your message has been sent. We'll reply within 2 business days.
</div>
```

`role="status"` announces it to screen readers without interrupting.

## Anti-patterns

### Don't disable the submit button

A disabled submit button gives no feedback about why. Users can't tell what's
wrong. Keep the button enabled, validate on click, and show errors.

### Don't ask for things you don't need

Every field you add drops completion rate. Ask: do I actually need this? Phone
number? Birthdate? Really?

### Don't use CAPTCHA when you don't need to

Modern spam filtering (honeypot fields, rate limiting, time-to-complete checks)
often works without CAPTCHAs, which are inaccessible to many users.

Simple honeypot:

```html
<input type="text" name="website" class="hp" tabindex="-1" autocomplete="off">
```

```css
.hp { position: absolute; left: -9999px; }
```

Bots fill it; humans don't. Reject submissions where it's filled.

### Don't force formats

Let users type phone numbers however they want. Validate loosely, normalize on
the server:

```html
<input type="tel" name="phone" pattern="[0-9\s\-\(\)\+]+">
```

Regex that accepts many formats is friendlier than forcing one.

### Don't reset on error

If validation fails, keep the user's input. Losing typed data is a cardinal sin.

## Mobile considerations

- `font-size: 16px` on inputs (prevents iOS zoom)
- `inputmode` for correct keyboard
- `autocomplete` for autofill
- Large touch targets
- Submit button full-width or large
- Sticky submit button for long forms

```html
<input type="tel" inputmode="tel" autocomplete="tel">
<input type="text" inputmode="numeric" autocomplete="postal-code">
```

## Testing checklist

- Fill the form on mobile
- Fill the form with keyboard only
- Fill with screen reader
- Submit with invalid data — are errors clear?
- Submit with valid data — is confirmation clear?
- Zoom to 200% — is it usable?
- Try in different browsers (Safari is often the outlier)

## Common mistakes

- Multi-column layouts that users can't follow
- Placeholders as labels
- Disabled submit buttons with no explanation
- Resetting the form on error
- Asking for unnecessary data
- CAPTCHAs without alternatives
- Font size below 16px on inputs (iOS zoom issue)
- Missing focus states
- No error summary for long forms
- Losing user data on session expiry

## The takeaway

- One column, labels above inputs, stacked vertically
- Group related fields with `<fieldset>` + `<legend>`
- Inputs full-width; font size ≥16px
- Validate on blur, not on every keystroke
- Errors under the field, linked via `aria-describedby`
- Don't disable the submit button
- Ask only for what you need
- Autosave long forms
- Test on mobile, keyboard, and screen reader

Good forms are boring. They don't surprise users. They ask for what's needed,
show errors clearly, and get out of the way.