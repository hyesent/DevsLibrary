---
title: HTML5 Validation and the Constraint Validation API
order: 42
book: html
---

# HTML5 Validation and the Constraint Validation API

Browsers can validate form input **before** submission — no JavaScript
required. Combined with the Constraint Validation API, you can build rich
validation UX with minimal code.

## Built-in validation

Several attributes trigger validation:

| Attribute | Rule |
|---|---|
| `required` | Must be filled |
| `type="email"` | Must look like an email |
| `type="url"` | Must look like a URL |
| `min` / `max` | Numeric/date range |
| `minlength` / `maxlength` | Text length |
| `pattern` | Must match the regex |

Example:

```html
<form action="/submit" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="age">Age</label>
  <input id="age" name="age" type="number" min="18" max="120" required>

  <button type="submit">Submit</button>
</form>
```

Click submit:
- Browser checks each constraint
- If any fail, submission is blocked
- The first invalid field is focused
- A default message appears (varies per browser)

## What validation actually does

The browser runs validation on **submit**, and on **input blur** for some
checks. It never validates while the user is typing (that would be annoying).

You can also trigger validation manually via JavaScript.

## Built-in messages

Browsers show a default message per constraint type:

- "Please fill out this field."
- "Please include an '@' in the email address."
- "Value must be greater than or equal to 18."

Localized to the user's browser language. Usually clear and readable.

You can override with custom messages via JavaScript (see below).

## The `pattern` attribute

Regex that the value must match:

```html
<input
  type="text"
  name="zip"
  pattern="[0-9]{5}"
  title="5-digit ZIP code">
```

The regex is **anchored** — it must match the whole value. You don't need `^`
and `$`.

Use a `title` to explain the format. Browsers and screen readers surface it.

### Common patterns

| Format | Pattern |
|---|---|
| ZIP (US) | `[0-9]{5}` |
| ZIP+4 (US) | `[0-9]{5}(-[0-9]{4})?` |
| Phone (US) | `[0-9]{3}-[0-9]{3}-[0-9]{4}` |
| Username | `[a-zA-Z0-9_]{3,20}` |
| Hex color | `#[0-9a-fA-F]{6}` |
| Slug | `[a-z0-9-]+` |

Complex validation (dates, credit cards, etc.) is better left to JS.

## Turning off validation

### Per-field

Mark a field with `novalidate` on the `<form>` element to disable all
validation inside it:

```html
<form novalidate>
  ...
</form>
```

Or use `formnovalidate` on a submit button:

```html
<button type="submit" formnovalidate>Save draft</button>
```

That's useful for "Save draft" buttons — save what's there without requiring
required fields.

## The Constraint Validation API

Every input has validation properties:

```js
const input = document.querySelector('input');

input.validity;      // ValidityState object
input.validationMessage;   // string (browser's message)
input.willValidate;  // boolean
input.checkValidity();     // boolean, fires 'invalid' event if invalid
input.reportValidity();    // shows the browser popup, returns boolean
input.setCustomValidity('Custom error');  // custom message
```

### `validity` — the ValidityState object

```js
input.validity.valid           // true if everything is OK
input.validity.valueMissing    // required and empty
input.validity.typeMismatch    // email/url doesn't match
input.validity.patternMismatch // pattern failed
input.validity.tooShort        // minlength failed
input.validity.tooLong         // maxlength failed
input.validity.rangeUnderflow  // below min
input.validity.rangeOverflow   // above max
input.validity.stepMismatch    // doesn't match step
input.validity.badInput        // non-numeric input in numeric field
input.validity.customError     // setCustomValidity triggered
```

Inspect it to know exactly what failed.

## Custom messages

Override the browser's message with `setCustomValidity`:

```js
const input = document.getElementById('username');

input.addEventListener('input', () => {
  if (input.value.includes('@')) {
    input.setCustomValidity('Usernames cannot contain @');
  } else {
    input.setCustomValidity('');  // clear = valid
  }
});
```

Empty string means "no custom error." Any non-empty string marks the input as
invalid, regardless of other constraints.

**Always clear the custom message** when the value becomes valid again.
Otherwise the field stays invalid forever.

## Real-time validation

Trigger validation on input, not just on submit:

```js
const form = document.querySelector('form');

form.querySelectorAll('input').forEach((input) => {
  input.addEventListener('blur', () => {
    input.reportValidity();
  });
});
```

Or custom-styled validation:

```js
const input = document.getElementById('email');
const error = document.getElementById('email-error');

input.addEventListener('blur', () => {
  if (!input.validity.valid) {
    error.textContent = input.validationMessage;
    error.hidden = false;
  } else {
    error.hidden = true;
  }
});
```

Then in HTML:

```html
<label for="email">Email</label>
<input id="email" name="email" type="email" required
       aria-describedby="email-error">
<p id="email-error" hidden class="error"></p>
```

`aria-describedby` links the error message to the input for screen readers.

## `<form>` validation methods

The form element also has API:

```js
form.checkValidity();      // are all fields valid?
form.reportValidity();     // show the browser UI for all invalid fields
form.noValidate = true;    // disable validation on this form
```

## The `invalid` event

Fires on inputs that fail validation:

```js
input.addEventListener('invalid', (e) => {
  e.preventDefault();   // stop the default browser popup
  // your own UI
});
```

Useful for replacing the browser's default popup with custom inline messages.

## Custom validation with `setCustomValidity`

Beyond regex, you can validate any rule in JS:

```js
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

function validate() {
  if (confirm.value !== password.value) {
    confirm.setCustomValidity('Passwords do not match');
  } else {
    confirm.setCustomValidity('');
  }
}

password.addEventListener('input', validate);
confirm.addEventListener('input', validate);
```

The message shows up as the browser popup if `reportValidity` is called, or you
can read it via `validationMessage`.

## Accessibility notes

- Always pair inputs with a `<label>`
- Use `aria-describedby` to link error messages to inputs
- Set `aria-invalid="true"` on invalid inputs for screen readers
- Use `role="alert"` on error containers so messages are announced
- Don't rely on color alone to indicate errors — use icons or text too

```html
<label for="email">Email</label>
<input
  id="email"
  type="email"
  required
  aria-describedby="email-error"
  aria-invalid="false">
<p id="email-error" role="alert" hidden></p>
```

## Server-side validation is still required

HTML validation runs in the browser. Users can:
- Disable JavaScript
- Edit the DOM to remove validation attributes
- Submit via curl or Postman

**Always validate on the server too.** HTML validation is a UX convenience,
not a security measure.

## Common mistakes

- Relying on client-side validation for security. Always validate on the
  server.
- Forgetting to clear `setCustomValidity` when the value becomes valid.
- Using `pattern` without a `title`. Users have no way to know the format.
- Missing `novalidate` on forms that handle validation entirely in JavaScript.
- Not providing inline error messages for accessibility.
- Using `type="email"` and thinking it catches every invalid email — it's a
  loose check.
- Assuming all browsers show the same validation messages. They don't.

## The takeaway

- HTML5 validation is free — just add attributes
- `required`, `type`, `pattern`, `min`, `max`, `minlength`, `maxlength` do the
  work
- `novalidate` disables validation per-form or per-button
- The Constraint Validation API gives you access to validity state and messages
- `setCustomValidity` for custom rules
- `invalid` event to intercept the default UI
- Style errors, mark with `aria-invalid`, use `role="alert"` for announcements
- **Always validate server-side too**

Native validation is a fast win. Use it as the first layer, then enhance with
JS, then always validate on the server.