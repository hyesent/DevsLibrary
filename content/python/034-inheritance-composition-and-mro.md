---
title: "Inheritance, Composition, and MRO"
order: 34
book: "python"
---

# Inheritance, Composition, and MRO

## Core model

Inheritance reuses and specializes behavior through an is-a relationship. Python's method resolution order (MRO) defines where attributes are found in multiple-inheritance hierarchies, using C3 linearization. `super()` follows that cooperative order; it does not simply mean “call my parent.”

## How it behaves in real code

Composition builds a type from collaborating objects and often creates less coupling than deep inheritance. Multiple inheritance can be appropriate for focused mixins, but constructors and methods need a consistent cooperative design. Overriding a method should preserve the expectations callers have of the base abstraction.

## Reasoning exercise

Prefer composition when the relationship is “has a” or when behavior should be replaceable independently. If using inheritance, inspect the MRO and test substitutability: can code using the base contract safely use the subtype?

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
