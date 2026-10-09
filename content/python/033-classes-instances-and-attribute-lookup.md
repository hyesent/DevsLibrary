---
title: "Classes, Instances, and Attribute Lookup"
order: 33
book: "python"
---

# Classes, Instances, and Attribute Lookup

## Core model

A class defines behavior and a mechanism for constructing instances; an instance stores or exposes state. Attribute access follows Python's lookup rules, involving instance attributes, the class, and potentially descriptors and the method resolution order. A method is a function whose descriptor behavior binds the instance as `self` when accessed through it.

## How it behaves in real code

Classes are useful when data and behavior form a coherent concept with invariants. They are not required for every group of related functions. Public attributes are simple and Pythonic, while properties can preserve an interface if computed or validated access becomes necessary.

## Reasoning exercise

Ask what invariant the class protects and who is allowed to change its state. If the class merely renames a dictionary without clarifying behavior, it may add ceremony rather than design value.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
