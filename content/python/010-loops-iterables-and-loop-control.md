---
title: "Loops, Iterables, and Loop Control"
order: 10
book: "python"
---

# Loops, Iterables, and Loop Control

## Core model

A `for` loop requests an iterator from an iterable and repeatedly obtains the next item until iteration ends. It does not inherently mean “increment an index.” A `while` loop repeats while a condition remains true and requires careful reasoning about how that condition changes.

## How it behaves in real code

`break` exits the nearest loop, `continue` skips to its next iteration, and a loop's `else` suite runs when the loop finishes without `break`. The `else` behavior is useful for search loops but can be surprising if a reader assumes it means the ordinary `if/else` relationship.

## Reasoning exercise

Use direct iteration when the index is not part of the problem. Use `enumerate()` when both index and item matter, and `zip()` when pairing sequences. For each loop, identify its progress condition and the condition that guarantees termination.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
