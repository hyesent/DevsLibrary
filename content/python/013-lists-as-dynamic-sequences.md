---
title: "Lists as Dynamic Sequences"
order: 13
book: "python"
---

# Lists as Dynamic Sequences

## Core model

A list stores an ordered sequence of references and supports indexed access, slicing, and in-place mutation. Appending is amortized constant time, while inserting or removing near the front usually shifts many references. The convenience of a list does not make every operation equally cheap.

## How it behaves in real code

Assignment aliases a list; slicing creates a shallow new list. Nested mutable objects remain shared after a shallow copy. Removing elements while iterating can skip items because later elements shift positions; a comprehension or a separate filtered list is often safer.

## Reasoning exercise

Choose lists when order and repeated values matter. If membership checks dominate, compare a set or dictionary-based design. Let the operations your program performs—not merely the shape of the example—drive the data structure choice.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
