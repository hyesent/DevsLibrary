---
title: Forms and State Styling
order: 49
book: css
---

# Forms and State Styling

Forms expose many browser states: focus, validity, checked, disabled, placeholder, required, and more. CSS can communicate those states clearly without changing the underlying HTML semantics.

## The mental model

Form styling should preserve affordances. Focus should be visible. Disabled controls should look unavailable but remain understandable. Validation styling should not rely only on color.

## In practice

```css
input:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 2px;
}

input:invalid:not(:placeholder-shown) {
  border-color: #b91c1c;
}
```

Selectors such as `:valid`, `:invalid`, `:required`, and `:checked` let CSS respond to browser state.

## Common mistakes

- Styling invalid fields before the user interacts with them
- Removing browser affordances without replacing them
- Using only red/green to communicate validity
- Making disabled controls visually identical to active controls

## Practice

Build a small accessible form with clear focus, invalid, valid, required, and disabled states. Test keyboard interaction.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
