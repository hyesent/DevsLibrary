---
title: "Scope, LEGB, and Name Resolution"
order: 19
book: "python"
---

# Scope, LEGB, and Name Resolution

## Core model

When Python resolves a name, it searches local, enclosing-function, global-module, and built-in scopes—the LEGB model. Scope is about where a name is bound, not where an object physically lives. A function can access an outer binding, but assigning to a name inside a function normally makes it local to that function.

## How it behaves in real code

An assignment can therefore cause `UnboundLocalError` if the function tries to read the name before assigning it locally. `global` and `nonlocal` alter which binding assignment targets, but excessive use usually signals state that deserves a clearer owner.

## Reasoning exercise

For a name-resolution bug, mark each binding and each read. Determine whether the function is reading an outer name or creating a local one. Explicit parameters and return values are usually easier to reason about than hidden global state.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
