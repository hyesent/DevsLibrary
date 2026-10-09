# CSSOM, Cascade, and Computed Style

> DevsLibrary · Browser Internals · Lesson 05

## CSS becomes a style model
The browser parses stylesheets into a CSS Object Model (CSSOM) or equivalent internal representation. It combines author styles with user-agent styles and potentially user styles, then resolves the cascade to determine the computed values for each element.

The cascade considers origin, importance, cascade layers, specificity, scoping proximity where relevant, and source order. Specificity is only one part of the system. `!important` changes priority and can make design systems harder to maintain when overused.

## Computed style
Specified values are not always the final values. Inheritance, relative units, custom properties, font availability, viewport size, and layout context affect computed and used values. Browser devtools show matched rules, overridden declarations, and computed values.

## CSSOM and JavaScript
JavaScript can inspect computed styles with `getComputedStyle()` and modify style declarations or stylesheet rules where permitted. Reading layout-related values after writing styles can force synchronous style/layout work, sometimes called forced reflow.

## Exercise
Inspect an element with conflicting rules from a reset, component stylesheet, and inline style. Explain which declaration wins and why. Then remove unnecessary specificity and retest.
