---
title: Selectors: Choosing What to Style
order: 4
book: css
---

# Selectors: Choosing What to Style

Selectors are the targeting language of CSS. They let you move from broad targets such as all paragraphs to precise relationships between elements.

## The mental model

Selectors do not change elements; they identify them. The most useful selectors are element selectors, class selectors, ID selectors, attribute selectors, combinators, and pseudo-classes/pseudo-elements. Prefer selectors that express stable structure or reusable roles.

## In practice

```css
p { line-height: 1.6; }
.card { padding: 1rem; }
#account { ... }
input[type="email"] { ... }
```

Classes are usually the workhorse because they are reusable and intentionally added for styling or component structure. IDs are unique document identifiers and can create unnecessary specificity when used as styling hooks.

## Common mistakes

- Using IDs for everything
- Writing extremely long selectors when a class would be clearer
- Styling based on fragile DOM depth
- Confusing a selector with the element it matches

## Practice

Create a small page with cards, buttons, and form controls. Practice selecting the same visual concept with an element selector, class selector, and attribute selector.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
