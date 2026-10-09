---
title: "Identity, Equality, and Type"
order: 6
book: "python"
---

# Identity, Equality, and Type

## Core model

`==` asks whether two objects compare equal according to their type's equality behavior. `is` asks whether two references identify the very same object. Two separately created lists can be equal but not identical. Use `is None` to test the singleton `None`; do not use `is` as a general replacement for equality.

## How it behaves in real code

Type determines supported operations and often influences equality. `1 == True` is true because `bool` is a subclass of `int` and booleans compare numerically, a fact that can surprise code using values as keys. Type annotations do not automatically enforce runtime types.

## Reasoning exercise

For a bug involving a comparison, ask whether the requirement concerns same identity, equivalent value, or a permitted type. Those are three separate questions and should not be blurred together.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
