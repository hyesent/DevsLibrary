---
title: "The Mutable Default Argument Trap"
order: 18
book: "python"
---

# The Mutable Default Argument Trap

## Core model

Default argument expressions are evaluated once when the function is defined, not every time it is called. A default list or dictionary is therefore shared across calls. This is why appending to a default list can make a later call appear to remember an earlier call.

## How it behaves in real code

Use `None` as a sentinel when `None` is not itself a meaningful supplied value, then create the fresh list inside the function. For APIs where `None` is valid input, use a private sentinel object or another explicit design so omission and intentional `None` remain distinguishable.

## Reasoning exercise

When reviewing a function signature, inspect every default for mutability and for when it is evaluated. The same evaluation-time reasoning applies to decorators and class-body expressions.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
