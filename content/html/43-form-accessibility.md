---
title: Form Accessibility
order: 43
book: html
---

# Form Accessibility

Forms are the highest-stakes part of accessibility. A user who can't perceive
your navigation can still browse, but a user who can't fill out your form can't
sign up, buy, or contact you. Get forms right.

## The essentials checklist

Every form should have:

1. A `<label>` for every input
2. `<fieldset>` + `<legend>` for grouped inputs
3. `required` (not just asterisks) for mandatory fields
4. Error messages linked to their inputs
5. Logical tab order
6. Keyboard-accessible everything
7. Text alternatives for icon buttons
8. Reasonable contrast for text and borders

We've covered some of these. This lesson ties them together.

## Labels — the base of everything

Screen readers announce label text when an input is focused. No label, no
context.

```html
<label for="email">Email</label>
<input id="email" type="email">
```

For inputs without a visible label (like search), use a visually-hidden one:

```html
<label for="q" class="visually-hidden">Search</label>
<input id="q" type="search" placeholder="Search...">
```

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

Never use `display: none` — it removes the element from the accessibility tree.

## Grouping related inputs

Fieldsets and legends for radio groups, checkbox groups, and address blocks:

```html
<fieldset>
  <legend>Payment method</legend>

  <label>
    <input type="radio" name="payment" value="card">
    Credit card
  </label>
  <label>
    <input type="radio" name="payment" value="paypal">
    PayPal
  </label>
</fieldset>
```

Screen readers announce: "Payment method, group. Credit card, radio button."

## Required fields

The `required` attribute does the semantic work:

```html
<label for="email">Email <span aria-hidden="true">*</span></label>
<input id="email" type="email" required>
```

- `required` — screen readers announce "required"
- The asterisk is hidden from AT (`aria-hidden="true"`) since `required` already
  conveys it
- Add a note at the top: "Fields marked * are required"

Some prefer "optional" marking for forms where most fields are required:

```html
<label for="phone">Phone <span class="optional">(optional)</span></label>
```

## Error handling

When validation fails, users need to know:
1. Which field failed
2. What's wrong with it
3. How to fix it

### Link errors to inputs

```html
<label for="email">Email</label>
<input
  id="email"
  type="email"
  required
  aria-describedby="email-error"
  aria-invalid="true">
<p id="email-error" role="alert">
  Please enter a valid email address.
</p>
```

- `aria-describedby` — links the input to its error message
- `aria-invalid="true"` — tells AT the field is currently invalid
- `role="alert"` — announces the error when it appears

### Error summary at the top

For long forms, show a summary of all errors near the submit button:

```html
<form>
  <div role="alert" id="error-summary" hidden>
    <p>Please fix the following:</p>
    <ul>
      <li><a href="#email">Email — invalid format</a></li>
      <li><a href="#password">Password — too short</a></li>
    </ul>
  </div>
  <!-- fields -->
</form>
```

Links jump to the invalid field. Screen readers announce the summary
immediately.

### Focus management

On submit failure, focus should move to the first invalid input:

```js
const firstInvalid = form.querySelector(':invalid');
if (firstInvalid) firstInvalid.focus();
```

This is built into HTML5 validation for native submit — the browser focuses
the first invalid field automatically.

## Icons and buttons

Icon-only buttons need `aria-label`:

```html
<button type="submit" aria-label="Search">
  <svg>...</svg>
</button>
```

Screen readers announce "Search, button."

## Placeholder text

Placeholders are not labels. They're:
- Often low-contrast (bad for low vision)
- Disappear on input (user forgets what the field was for)
- Not always read by screen readers
- Can be mistaken for actual values

Use placeholders for **format hints**, not field labels:

```html
<label for="phone">Phone</label>
<input id="phone" type="tel" placeholder="+1 555 123 4567">
```

## Autocomplete

Standard autocomplete values help everyone, and are essential for users with
motor disabilities who struggle to type:

```html
<input type="email" autocomplete="email">
<input type="text" autocomplete="given-name">
<input type="text" autocomplete="postal-code">
```

Use the WHATWG standard values (MDN has the full list).

## Tab order

Inputs are focusable in DOM order. Keep the visual order and the DOM order the
same, or you'll confuse keyboard users.

Avoid `tabindex` values greater than 0. They break the natural order.

`tabindex="0"` — makes a non-focusable element focusable, in DOM order.
`tabindex="-1"` — makes an element focusable via JavaScript but not keyboard
tab. Use on error summary containers to focus them programmatically.

## Touch targets

Mobile users need large tap targets. WCAG minimum is 44×44 CSS pixels.

```css
input, button, select, textarea {
  min-height: 44px;
  padding: 10px 12px;
}
```

Radio buttons and checkboxes are small by default — expand the label to include
the whole row:

```css
label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  cursor: pointer;
}
```

## Contrast

Text on inputs needs to meet contrast requirements:
- Input text vs background: 4.5:1 minimum
- Placeholder text: same, ideally
- Focus ring: 3:1 against adjacent colors
- Error text: 4.5:1

Default browser focus rings sometimes fail. Style your own:

```css
input:focus-visible {
  outline: 2px solid #61dafb;
  outline-offset: 2px;
}
```

Use `:focus-visible` (not `:focus`) so the ring appears for keyboard users but
not mouse clicks.

## Timing

If a form times out (session expiry), warn the user and give them time to
extend. Don't lose their data.

## Multi-step forms

Progress indicators should be semantic:

```html
<nav aria-label="Form progress">
  <ol>
    <li aria-current="step">Step 1: Personal info</li>
    <li>Step 2: Address</li>
    <li>Step 3: Payment</li>
  </ol>
</nav>
```

Announce step changes to AT:

```html
<h2 id="step-title" role="heading" aria-level="2">
  Step 1: Personal info
</h2>
```

## Testing

1. **Keyboard only**: Can you complete the form without a mouse? Tab order
   logical? Focus visible?
2. **Screen reader**: Use VoiceOver, NVDA, or Orca. Are labels announced? Are
   errors?
3. **Zoom**: 200% zoom — is the form still usable?
4. **High contrast mode**: Windows high contrast — do inputs remain visible?
5. **Mobile**: On a phone, is everything reachable and tappable?

Automated tools (axe, WAVE) catch some issues, but manual testing is
irreplaceable.

## Common mistakes

- Placeholder-only fields with no label.
- Asterisks without `required` — visual only, invisible to AT.
- Error messages not linked via `aria-describedby`.
- Color-only error indication.
- Icon buttons without `aria-label`.
- Custom radios/checkboxes with `display: none` — remove from AT and keyboard.
  Use `opacity: 0` + `position: absolute` instead.
- `tabindex` values > 0, breaking tab order.
- Tiny touch targets.
- Focus rings removed entirely without a replacement.

## The takeaway

- Every input needs a `<label>`
- Group related inputs with `<fieldset>` + `<legend>`
- Mark required fields with `required`, not just asterisks
- Link error messages with `aria-describedby`, mark invalid with
  `aria-invalid`
- Use `role="alert"` for live error announcements
- Keep DOM order = visual order for tab order
- 44×44 minimum touch targets
- Test with keyboard, screen reader, zoom, and mobile

Form accessibility isn't an afterthought — it's the foundation. Build it in
from the start and every user wins.