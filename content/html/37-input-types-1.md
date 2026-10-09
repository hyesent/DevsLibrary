---
title: Input Types — Part 1 (text, email, password, number, tel, url, search)
order: 37
book: html
---

# Input Types — Part 1

The `<input>` element is a shape-shifter. Its `type` attribute changes what it
does, how it looks, what keyboard it brings up on mobile, and what the browser
validates. This lesson covers the text-entry types.

## The `<input>` element

Void element. No closing tag. Needs a `type` and usually a `name`:

```html
<input type="text" name="username">
```

Without `type`, browsers default to `text`.

## `type="text"` — the default

Plain single-line text. No validation, no special keyboard.

```html
<label for="username">Username</label>
<input id="username" type="text" name="username">
```

Use for anything freeform that doesn't match a more specific type.

## `type="email"`

For email addresses.

```html
<label for="email">Email</label>
<input id="email" type="email" name="email">
```

What it does:
- Mobile keyboards show `@` and `.`
- Browser validates the format (must contain `@` and a domain)
- Enables autocomplete hints

To allow multiple addresses:

```html
<input type="email" name="recipients" multiple>
```

Then `a@x.com, b@y.com` is valid.

## `type="password"`

Masks typed characters.

```html
<label for="password">Password</label>
<input id="password" type="password" name="password">
```

Uses bullet or asterisk masking. That's it — the browser doesn't handle
encryption, hashing, or storage. Those are the server's job.

Never send a password over plain HTTP. Always HTTPS.

### Autocomplete hints

```html
<input type="password" autocomplete="current-password">
<input type="password" autocomplete="new-password">
```

`current-password` triggers password manager to fill an existing password.
`new-password` triggers it to suggest a strong password.

## `type="number"`

Numeric input with optional spinner arrows.

```html
<label for="qty">Quantity</label>
<input id="qty" type="number" name="quantity" min="1" max="10" step="1">
```

Attributes:
- `min` — minimum value
- `max` — maximum value
- `step` — increment for the spinner

On mobile, brings up the numeric keypad.

### When NOT to use `number`

Avoid `type="number"` for:
- **Phone numbers** — use `tel`
- **Credit cards** — use `text` with `inputmode="numeric"`
- **ZIP codes** — use `text` (leading zeros matter)
- **IDs, reference numbers** — use `text`

Reason: `number` inputs strip leading zeros, allow scientific notation
(`1e5`), and can be awkward with non-numeric characters. Only use it when
you're genuinely collecting a numeric *quantity*.

## `type="tel"`

Telephone numbers.

```html
<label for="phone">Phone</label>
<input id="phone" type="tel" name="phone">
```

Does NOT validate format — phone numbers vary wildly across countries. Just
triggers a phone-friendly keyboard on mobile.

For stricter format checking, use `pattern`:

```html
<input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
```

## `type="url"`

Website URLs.

```html
<label for="site">Website</label>
<input id="site" type="url" name="website">
```

Requires a scheme (usually `http://` or `https://`):

- `example.com` — invalid (no scheme)
- `https://example.com` — valid

Some browsers reject URLs without a protocol. Mention it in the label or
placeholder if it matters.

## `type="search"`

A search box.

```html
<label for="q">Search</label>
<input id="q" type="search" name="q">
```

Looks almost identical to `text`. Differences:
- On some browsers, shows a clear (×) button when there's content
- On macOS Safari, gets the platform's rounded search field styling
- Semantically indicates a search field
- Screen readers may announce it as "search"

Use it for anything that feels like a search — search boxes, filter boxes.

## `type="hidden"`

Not shown to the user, but submitted with the form.

```html
<input type="hidden" name="csrf_token" value="abc123">
```

Common uses:
- CSRF tokens
- Tracking IDs
- Pre-set values the server needs

Don't rely on hidden inputs for security — users can see and edit them in
DevTools. Use them for values the server should validate, not trust.

## The `inputmode` attribute

For finer control over mobile keyboards, use `inputmode` — separate from
`type`:

```html
<input type="text" inputmode="numeric">
```

Values:

| `inputmode` | Keyboard |
|---|---|
| `text` | Standard text |
| `numeric` | Numbers only |
| `decimal` | Numbers with decimal point |
| `tel` | Phone keypad |
| `email` | Email keyboard |
| `url` | URL keyboard |
| `search` | Search keyboard |
| `none` | No virtual keyboard |

The pattern: use `type` for the semantic meaning, `inputmode` for the keyboard.

Example — a credit card field:

```html
<label for="card">Card number</label>
<input id="card" type="text" inputmode="numeric" autocomplete="cc-number">
```

`type="text"` means no weird stripping. `inputmode="numeric"` brings up the
number keypad on mobile.

## `placeholder`

Short hint shown when the field is empty:

```html
<input type="email" placeholder="you@example.com">
```

Rules:
- It's not a label. Always have a `<label>` too.
- It disappears on input — never use it for essential info.
- Low-contrast by default. Accessibility concern.
- The text can be mistaken for actual value.

Useful for format examples. Not a replacement for labels.

## `autocomplete`

Tells the browser what kind of data is expected, enabling autofill:

```html
<input type="text" autocomplete="given-name">
<input type="text" autocomplete="family-name">
<input type="email" autocomplete="email">
<input type="tel" autocomplete="tel">
<input type="text" autocomplete="street-address">
<input type="text" autocomplete="postal-code">
<input type="password" autocomplete="current-password">
```

Full list at MDN. For forms where autofill matters — checkout, signup, login —
specifying these dramatically improves user experience.

Set `autocomplete="off"` to disable (browsers sometimes ignore for password
fields).

## Common mistakes

- Using `type="number"` for phone numbers, ZIP codes, or credit cards. Use
  `text` with `inputmode`.
- Using placeholder as a label. Add a real `<label>`.
- Using `type="email"` on a field that might contain multiple addresses
  without `multiple`.
- Expecting `type="tel"` to validate format — it doesn't.
- Assuming hidden inputs are private — they're not.
- Forgetting `name` — the field isn't submitted without it.

## The takeaway

- `text` — freeform text, the default
- `email` — email addresses, with format validation and mobile keyboard
- `password` — masked entry
- `number` — actual numbers with min/max/step
- `tel` — phone numbers, no format enforcement
- `url` — URLs with scheme
- `search` — search fields
- `hidden` — invisible, submitted with form
- `inputmode` — controls the mobile keyboard, separate from `type`
- Always pair with a `<label>` and a `name`

Pick the type that matches the data and you get validation, mobile keyboards,
and better autofill — for free.