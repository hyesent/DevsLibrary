# Accessible Forms: Labels, Instructions, and Input Types

> DevsLibrary · Web Accessibility · Lesson 12

## Every control needs a clear identity
Associate visible labels with controls using `for` and `id`, or place the control inside its label. A placeholder is a hint, not a substitute for a persistent label. Use instructions before the user needs them, especially for formats, required values, and constraints.

```html
<label for="phone">Phone number</label>
<p id="phone-help">Include your country code, for example +234...</p>
<input id="phone" name="phone" type="tel"
       autocomplete="tel" aria-describedby="phone-help">
```

Choose input types and autocomplete tokens that match the data. They can enable suitable mobile keyboards and help users with password managers or autofill. Do not use a type simply because its appearance is convenient.

## Group related fields
Use `fieldset` and `legend` for related controls, such as a set of radio buttons. Make required status clear in text or other accessible form, not just through color or an unexplained asterisk.

## Input assistance
Where possible, tell users the required format and constraints before submission. Avoid asking for the same information repeatedly. Preserve entered data when validation fails. Do not impose unnecessary cognitive tests, such as memory-only verification, when safer accessible alternatives exist.

## Exercise
Build a registration form with name, email, telephone, password, and a group of radio buttons. Add labels, relevant autocomplete values, clear required instructions, and group semantics.
