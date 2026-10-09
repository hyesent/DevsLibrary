---
title: How the Browser Applies CSS
order: 2
book: css
---

# How the Browser Applies CSS

Before learning individual properties, understand the pipeline: the browser parses HTML, creates a DOM, parses CSS, matches selectors, resolves the cascade and values, performs layout, then paints and composites the result.

## The mental model

When you write `color: red`, the browser does not simply “find the word and turn it red.” It has to determine which elements match the selector, which declaration wins, what the final computed value is, and how that value participates in rendering.

## In practice

```css
p { color: red; }
```

A useful mental model is:

1. HTML becomes a document tree.
2. CSS becomes a collection of rules.
3. Selectors match elements.
4. The cascade chooses winning declarations.
5. Values are computed and inherited where appropriate.
6. Layout calculates geometry.
7. Painting draws backgrounds, borders, text, and other visual pieces.
8. Compositing combines rendered layers.

## Common mistakes

- Thinking CSS is applied top-to-bottom like JavaScript
- Assuming the last rule always wins
- Confusing layout with painting
- Debugging only the final pixels instead of inspecting the winning rule

## Practice

Open browser DevTools on a styled element. Find its matched CSS rules, identify the winning declaration, and then inspect the computed value.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
