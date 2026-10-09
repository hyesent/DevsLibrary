---
title: CSS Syntax and Rules
order: 3
book: css
---

# CSS Syntax and Rules

A CSS stylesheet is made of rules. A selector identifies targets; declarations describe properties and values for those targets.

## The mental model

The basic unit is a qualified rule: selector followed by a declaration block. A declaration is a property-value pair. The semicolon separates declarations, and braces define the block.

## In practice

```css
.card {
  padding: 1rem;
  border-radius: 12px;
  background: white;
}
```

`.card` is the selector. `padding`, `border-radius`, and `background` are properties. Their values are `1rem`, `12px`, and `white`.

CSS is forgiving in places, but invalid declarations are ignored. That means a tiny syntax error can make a rule appear to “do nothing.”

## Common mistakes

- Forgetting the colon between property and value
- Putting JavaScript-style commas between declarations
- Assuming an unknown property will be interpreted intelligently
- Using malformed values and then debugging the wrong problem

## Practice

Write three rules for a profile card: one for the card itself, one for its heading, and one for its description. Intentionally break one declaration and use DevTools to discover what was ignored.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
