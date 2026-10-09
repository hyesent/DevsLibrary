---
title: Debugging CSS with DevTools
order: 46
book: css
---

# Debugging CSS with DevTools

CSS debugging is an investigation process: inspect the element, identify matched rules, find overridden declarations, inspect computed values, and test changes live.

## The mental model

When something looks wrong, do not immediately add another declaration. First ask: Is the correct element being selected? Is the declaration winning? Is the computed value what I expect? Is the layout algorithm producing the geometry I expect?

## In practice

A practical sequence:

1. Inspect the element.
2. Check the box model.
3. Check matched selectors.
4. Find crossed-out declarations.
5. Inspect computed values.
6. Inspect Flex/Grid overlays when relevant.
7. Test the smallest change that can confirm your hypothesis.

This turns CSS debugging from guessing into diagnosis.

## Common mistakes

- Changing five things at once
- Ignoring crossed-out rules
- Only looking at the Styles panel and never Computed
- Blaming CSS when the HTML structure is the actual problem

## Practice

Create three intentional CSS bugs: a specificity conflict, an incorrect box size, and a flex alignment mistake. Diagnose each using DevTools without rewriting the stylesheet blindly.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
