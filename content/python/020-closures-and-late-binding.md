---
title: "Closures and Late Binding"
order: 20
book: "python"
---

# Closures and Late Binding

## Core model

A closure is a function together with access to bindings from its enclosing lexical environment. It lets a function preserve access to context after the outer function has returned. The closure retains references to bindings, not necessarily frozen snapshots of the values they held at creation time.

## How it behaves in real code

This explains the loop/lambda trap: lambdas created in a loop can all observe the same final loop variable when invoked later. Binding the current value through a default argument or using a helper function creates a different binding strategy. The right choice depends on whether later changes should be visible.

## Reasoning exercise

Ask whether a callback needs the value now or the binding later. This matters in event handlers, deferred tasks, decorators, and asynchronous code where execution happens after the surrounding loop has moved on.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
