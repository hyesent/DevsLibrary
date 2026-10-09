---
title: "Statements, Expressions, and Evaluation Order"
order: 3
book: "python"
---

# Statements, Expressions, and Evaluation Order

## Core model

An expression produces a value; a statement performs an action in the program's control structure. `price * quantity` is an expression, while `total = price * quantity` is an assignment statement containing an expression. Evaluation order matters because expressions can call functions, mutate objects, or raise exceptions.

## How it behaves in real code

Python evaluates expressions according to its precedence and evaluation rules; parentheses should communicate intended grouping when precedence is easy to misread. Short-circuit operators are especially important: `a and check()` does not call `check()` when `a` is falsy. This is control flow hidden inside an expression.

## Reasoning exercise

Trace an expression from its innermost operands outward. For each function call, record its return value and any side effect. Avoid expressions with many side effects: code that is technically valid can be difficult to reason about when evaluation order is not obvious.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
