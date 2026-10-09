# Accessible Names, Labels, and Descriptions

> DevsLibrary · Web Accessibility · Lesson 06

## Name, role, state, and value
Assistive technologies need programmatic information about interface components. A control's accessible name tells the user what it is for; its role tells what kind of control it is; its state and value communicate information such as expanded, checked, selected, or current value.

Visible text often provides the best accessible name. An icon-only button needs another reliable name, commonly through visually hidden text or `aria-label`. Avoid using a tooltip or placeholder as the only label.

## Labels versus descriptions
A label identifies a control: “Email address.” A description adds supporting detail: “We will send the receipt to this address.” Use visible `<label for>` associations whenever possible. `aria-describedby` can connect extra help or error text to a control, while `aria-labelledby` can reference existing visible text that should form the name.

## Example
```html
<label for="email">Email address</label>
<input id="email" name="email" type="email"
       aria-describedby="email-help">
<p id="email-help">Use an address you can access.</p>
```

For an icon button:
```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" viewBox="0 0 16 16">...</svg>
</button>
```

## ARIA caution
Accessible name computation follows defined precedence rules. Adding ARIA can override useful native naming, hide text unexpectedly, or create duplicate announcements. Test the result in the accessibility tree and with assistive technology rather than assuming an attribute is correct.

## Exercise
Create a form with a text field, checkbox, and icon-only clear button. Verify each control has a useful accessible name, and ensure helper text is available without being repeated excessively.
