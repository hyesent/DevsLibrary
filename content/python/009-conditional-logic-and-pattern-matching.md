---
title: "Conditional Logic and Pattern Matching"
order: 9
book: "python"
---

# Conditional Logic and Pattern Matching

## Core model

`if`, `elif`, and `else` choose a path based on conditions evaluated in order. The first true branch wins, so ordering matters when conditions overlap. Structural pattern matching with `match` can dispatch on shapes and values, but it is not merely a switch statement: patterns can bind names and express structural relationships.

## How it behaves in real code

Prefer branches that reflect mutually understandable cases. Deeply nested conditions often indicate that validation, transformation, and action have been mixed together. Pattern matching is useful for tagged data such as event dictionaries or dataclass variants, but ordinary `if` statements are often clearer for simple predicates.

## Reasoning exercise

List the possible cases before coding. Check whether every case is covered, whether two cases overlap, and what happens for unexpected input. Explicit handling of the unknown case is especially important when consuming data from outside the program.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
