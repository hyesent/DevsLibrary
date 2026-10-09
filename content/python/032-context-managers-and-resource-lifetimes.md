---
title: "Context Managers and Resource Lifetimes"
order: 32
book: "python"
---

# Context Managers and Resource Lifetimes

## Core model

The context-manager protocol pairs `__enter__` with `__exit__`, making setup and cleanup a structured scope. A context manager can release a lock, roll back a transaction, restore a temporary setting, or close a resource when the block exits normally or exceptionally.

## How it behaves in real code

`__exit__` can suppress an exception by returning a truthy value, so suppression should be deliberate. The standard library's `contextlib` makes common patterns easier to express, including generator-based context managers. A context manager should make the resource invariant clearer, not hide arbitrary control flow.

## Reasoning exercise

Identify the resource being acquired, the state that must be restored, and whether exceptions should propagate. Test cleanup both on success and when the body raises.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
