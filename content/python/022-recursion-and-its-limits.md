---
title: "Recursion and Its Limits"
order: 22
book: "python"
---

# Recursion and Its Limits

## Core model

A recursive function solves a problem by handling a base case and reducing other cases to smaller subproblems. Correct recursion needs both a valid stopping condition and progress toward it. Tree traversal is a natural use because the data itself has recursive structure.

## How it behaves in real code

Python does not generally optimize tail recursion, and deeply recursive calls can hit the recursion limit. For a large or untrusted input depth, an explicit stack may be safer. Memoization can avoid repeated subproblems, but it adds storage and depends on suitable keys and stable results.

## Reasoning exercise

Trace a small input by hand, listing each call and return. Then test the deepest realistic input and consider whether an iterative formulation gives better control over memory and failure behavior.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
