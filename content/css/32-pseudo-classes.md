---
title: Pseudo-classes
order: 32
book: css
---

# Pseudo-classes

Pseudo-classes describe states or relationships of elements, such as hover, focus, checked, disabled, first child, or a structurally selected item.

## The mental model

Pseudo-classes let you style states without adding extra classes for every condition. They are especially important for interaction and accessibility because browser and user-agent states already exist independently of your JavaScript.

## In practice

```css
.button:hover { ... }
.button:focus-visible { outline: 3px solid; }
input:disabled { opacity: 0.6; }
li:nth-child(odd) { ... }
```

`:focus-visible` is particularly useful because it lets you provide a strong keyboard focus indication without necessarily showing the same treatment for every pointer interaction.

## Common mistakes

- Removing focus outlines without replacement
- Using hover as the only way to reveal information
- Overusing structural selectors when classes communicate intent better
- Forgetting disabled and checked states

## Practice

Style a button for default, hover, keyboard focus, active, and disabled states. Navigate to it with the keyboard and verify that the focus state is obvious.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
