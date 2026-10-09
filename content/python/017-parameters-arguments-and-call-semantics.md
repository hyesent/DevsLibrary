---
title: "Parameters, Arguments, and Call Semantics"
order: 17
book: "python"
---

# Parameters, Arguments, and Call Semantics

## Core model

Parameters are names in a function definition; arguments are the values supplied by a call. Python's argument binding supports positional, keyword, default, variadic positional, and variadic keyword forms. Binding errors happen before the function body runs, which makes signatures an important API boundary.

## How it behaves in real code

Python passes object references by assignment: the local parameter refers to the passed object. Rebinding the parameter does not rebind the caller's variable, but mutating a shared mutable object can be visible to the caller. This is neither classic pass-by-reference nor copying every argument.

## Reasoning exercise

Use keyword-only parameters for options whose meaning would be unclear by position. Design defaults deliberately and avoid accepting `**kwargs` as a way to conceal an unstable or undocumented API.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
