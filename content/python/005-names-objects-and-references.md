---
title: "Names, Objects, and References"
order: 5
book: "python"
---

# Names, Objects, and References

## Core model

A Python name is a binding to an object; it is not a box that permanently contains a value. `a = [1, 2]` binds `a` to a list object. `b = a` creates another binding to the same list, not a second list. Mutating the list through either name is visible through the other.

## How it behaves in real code

Rebinding and mutation are different operations. `a = [3]` makes `a` refer to a new list while `b` still refers to the old list. `a.append(3)` mutates the object currently referenced by `a`. Many confusing bugs are really misunderstandings about whether code changes a binding or changes an object.

## Reasoning exercise

Draw names as arrows pointing to objects. After each assignment, decide whether an arrow moves, a new object appears, or an existing object changes. This model is essential for function arguments, default values, nested collections, and shared application state.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
