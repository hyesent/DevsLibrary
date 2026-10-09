---
title: CSS Architecture and Organization
order: 44
book: css
---

# CSS Architecture and Organization

CSS architecture is about making a stylesheet predictable as the project grows. Good organization reduces accidental coupling and makes changes local.

## The mental model

A useful architecture separates global foundations from component rules and utilities. Names should communicate roles. Components should own their internal presentation, while layout primitives should express larger relationships.

## In practice

```text
styles/
  reset.css
  tokens.css
  base.css
  components.css
  utilities.css
```

The exact folder structure is less important than the dependency direction: foundations should be easy to reason about, components should not secretly depend on unrelated page selectors, and overrides should have an intentional place.

## Common mistakes

- Creating one enormous stylesheet
- Organizing by file type without considering dependency
- Using page-specific selectors to style reusable components
- Naming classes by appearance instead of role

## Practice

Take a messy component stylesheet and separate tokens, base styles, component styles, and one or two utilities. Write down what each layer is allowed to do.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
