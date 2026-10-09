---
title: What CSS Is and Why It Exists
order: 1
book: css
---

# What CSS Is and Why It Exists

CSS is the language that controls presentation. HTML gives the browser structure and meaning; CSS supplies the visual rules that turn that structure into a usable interface.

## The mental model

CSS is best understood as a rule system, not a pile of decoration commands. A stylesheet describes how selected elements should be presented. The browser combines those rules with the document tree, inherited values, defaults, and layout algorithms to produce the pixels you see.

## In practice

```html
<h1>Dashboard</h1>
<p>Welcome back.</p>
```

```css
h1 { font-size: 2rem; }
p { color: #555; }
```

The HTML answers “what are these things?” The CSS answers “how should these things be presented?” That separation is one of the most important architectural ideas in front-end development.

## Common mistakes

- Treating CSS as HTML with prettier syntax
- Using CSS to communicate meaning that belongs in HTML
- Expecting a single property to determine the entire layout
- Learning declarations without understanding the browser layout model

## Practice

Build a tiny page containing a heading, paragraph, and button. First write semantic HTML. Then make the page visually coherent using CSS without changing the HTML to achieve purely visual effects.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
