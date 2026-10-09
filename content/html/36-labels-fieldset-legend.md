---
title: Labels, fieldset, legend
order: 36
book: html
---

# Labels, `fieldset`, `legend`

Every form input needs a label. Not just for visual clarity — labels are how
screen readers announce what each field is for. Without them, users hear
"edit text" and have no idea what to type.

## `<label>` — the basics

Two ways to associate a label with an input:

### Wrap the input

```html
<label>
  Email
  <input type="email" name="email">
</label>
```

The input is inside the label. Clicking the label focuses the input.

### Use `for` and `id`

```html
<label for="email">Email</label>
<input id="email" type="email" name="email">
```

`for` matches the input's `id`. This is the more common pattern, and it lets
you place the label wherever you want in the layout.

Both work. The `for`/`id` approach is cleaner when the label and input need to
be styled separately.

## Why labels matter

- **Screen readers** announce the label text when the field is focused
- **Clicking the label** focuses the input (bigger hit target, easier on
  mobile)
- **Voice control software** lets users say "click Email" to focus the field
- **Autofill** often depends on labels for context

## `for` vs wrapping — which to use

| Pattern | Pros | Cons |
|---|---|---|
| Wrap | No IDs needed | Harder to style label separately |
| `for`/`id` | Full layout control | Requires unique IDs |

For forms with many fields, `for`/`id` is the standard. It also plays better
with grid layouts.

## The `id` must be unique

Every `id` in a document is unique. Two inputs with `id="email"` breaks the
label association — only the first one works.

Good:

```html
<label for="email">Email</label>
<input id="email" type="email">

<label for="phone">Phone</label>
<input id="phone" type="tel">
```

Bad:

```html
<label for="field">Email</label>
<input id="field" type="email">

<label for="field">Phone</label>
<input id="field" type="tel">  <!-- duplicate id -->
```

## `<fieldset>` and `<legend>` — grouping

When several inputs belong together — like a set of radio buttons, or a
shipping address — wrap them in `<fieldset>` and give the group a name with
`<legend>`:

```html
<fieldset>
  <legend>Shipping address</legend>

  <label for="street">Street</label>
  <input id="street" name="street">

  <label for="city">City</label>
  <input id="city" name="city">

  <label for="zip">ZIP code</label>
  <input id="zip" name="zip">
</fieldset>
```

The `<legend>` is the group's label. Screen readers announce it when a user
enters the group:

> "Shipping address, group. Street, edit text."

That context is essential — without it, the user hears "Street, edit text" and
has no idea whether it's a shipping address, billing address, or their own.

## Radio buttons need fieldsets

The classic case:

```html
<fieldset>
  <legend>Preferred contact method</legend>

  <label>
    <input type="radio" name="contact" value="email">
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

Without the `<fieldset>`/`<legend>`, a screen reader user hears "Email, radio
button" with no context for what question is being asked. With them, they hear
"Preferred contact method, group. Email, radio button."

## Nested fieldsets

Fieldsets can nest:

```html
<fieldset>
  <legend>Contact information</legend>

  <fieldset>
    <legend>Phone numbers</legend>
    <label for="home">Home</label>
    <input id="home" type="tel" name="home">
    <label for="work">Work</label>
    <input id="work" type="tel" name="work">
  </fieldset>

  <fieldset>
    <legend>Email addresses</legend>
    <label for="personal">Personal</label>
    <input id="personal" type="email" name="personal">
  </fieldset>
</fieldset>
```

Screen readers announce the full path: "Contact information group, Phone
numbers group, Home, edit text."

## Disabling a whole fieldset

The `disabled` attribute on `<fieldset>` disables every input inside:

```html
<fieldset disabled>
  <legend>Payment</legend>
  <label for="cc">Card number</label>
  <input id="cc" type="text">
</fieldset>
```

Every field inside becomes uneditable and is not submitted with the form. Useful
for progressive enhancement — enable the section once the user reaches it.

## Styling fieldsets

Browsers draw a border around fieldsets by default — often ugly. Remove it or
restyle:

```css
fieldset {
  border: none;
  padding: 0;
  margin: 0 0 24px;
}

legend {
  font-weight: 600;
  margin-bottom: 12px;
  padding: 0;
}
```

Common to use a `<fieldset>` purely for semantics and strip all default styling.

## Labels with required fields

Mark required fields both visually and programmatically:

```html
<label for="email">
  Email <span aria-hidden="true">*</span>
</label>
<input id="email" type="email" required>
```

- `required` tells the browser and screen reader the field is mandatory
- The asterisk is a visual cue, hidden from screen readers (`aria-hidden`) —
  the `required` attribute conveys it already
- Some forms add `<span class="required">required</span>` in text for even
  more clarity

## Common mistakes

- No `<label>` at all, relying on placeholder text. Placeholders disappear on
  input and aren't reliably announced by screen readers.
- Duplicate `id`s, breaking the label/input link.
- `for` value that doesn't match any `id`. The label does nothing.
- Radio buttons without a `<fieldset>`/`<legend>` — screen readers can't tell
  what the group is for.
- Using `<label>` around a whole form section that isn't a single input. Use
  `<fieldset>` for groups.
- Putting a `<legend>` outside a `<fieldset>` — it must be the first child of
  the fieldset.
- Placeholder-only forms. Always add labels.

## The takeaway

- Every input needs a `<label>`
- Two ways: wrap the input, or use `for` + `id`
- `id` must be unique across the document
- Group related inputs with `<fieldset>` + `<legend>`
- Radio and checkbox groups **must** have a fieldset
- Use `disabled` on a `<fieldset>` to disable the whole group
- Restyle fieldsets — the default border is rarely what you want

Labels are the single most important accessibility feature in a form. Get
them right and everything else follows.