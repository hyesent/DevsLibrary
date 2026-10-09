---
title: "Functions as Contracts"
order: 16
book: "python"
---

# Functions as Contracts

## Core model

A function names a unit of behavior with inputs, outputs, and possible effects. Its parameters define how callers supply information; its return value defines what callers can use. A function can also mutate objects, perform I/O, log, or raise exceptions, so the true contract includes more than its return type.

## How it behaves in real code

Small functions help when they give a coherent operation a stable name. Splitting every two lines into a helper can create navigation overhead without improving meaning. A good boundary lets a reader reason about one responsibility without needing to simulate the entire application.

## Reasoning exercise

Describe a function's preconditions, postconditions, side effects, and failure modes. If the description contains several unrelated verbs, the function may own too many responsibilities.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
