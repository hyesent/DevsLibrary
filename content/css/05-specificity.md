---
title: Specificity
order: 5
book: css
---

# Specificity

When multiple selectors target the same element and property, specificity helps determine which declaration wins. Understanding specificity prevents a huge amount of “why is my CSS not working?” frustration.

## The mental model

Specificity can be thought of as a comparison weight. IDs carry more weight than classes, attributes, and pseudo-classes; classes/attributes/pseudo-classes outweigh element selectors. Inline styles are another higher-priority mechanism. Specificity is compared rather than simply added across unrelated rules.

## In practice

```css
.button { color: black; }
.panel .button { color: blue; }
```

A button inside `.panel` matches both rules, but `.panel .button` is more specific. The important lesson is not to memorize a giant scoring trick; it is to keep specificity intentionally low so your styles remain overrideable.

## Common mistakes

- Solving every conflict with `!important`
- Adding more selectors until a rule wins
- Using IDs as styling hooks everywhere
- Ignoring source order after specificity has tied

## Practice

Create two competing rules for the same element. Predict the winner before opening DevTools. Then lower the winning selector’s specificity without changing the visual result.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
