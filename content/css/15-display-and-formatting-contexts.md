---
title: Display and Formatting Contexts
order: 15
book: css
---

# Display and Formatting Contexts

The `display` property determines how an element participates in layout. Understanding block, inline, inline-block, and newer layout modes is more useful than memorizing isolated examples.

## The mental model

Block-level boxes generally establish vertical flow and can accept dimensions. Inline boxes participate inside a line of text. `inline-block` combines aspects of both. `display: flex` and `display: grid` establish specialized formatting contexts for their children.

## In practice

```css
nav { display: flex; }
article { display: block; }
a { display: inline; }
.badge { display: inline-block; }
```

The key question is: “What formatting context do I want this element to establish?” That question scales much better than asking which display value makes a screenshot look right.

## Common mistakes

- Using absolute positioning instead of learning normal flow
- Treating block and inline as purely visual labels
- Changing display values without considering child layout
- Expecting `display: none` to reserve space

## Practice

Take a navigation list and implement it first as normal block flow, then as flex. Explain what changed in the parent-child layout relationship.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
