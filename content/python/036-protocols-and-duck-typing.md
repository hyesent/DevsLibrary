---
title: "Protocols and Duck Typing"
order: 36
book: "python"
---

# Protocols and Duck Typing

## Core model

Python often cares about supported behavior rather than an object's declared ancestry. Duck typing means code depends on operations an object provides. A `Protocol` makes such expectations expressible to static type checkers without requiring classes to inherit from the protocol explicitly.

## How it behaves in real code

Protocols support flexible architecture: a function can accept any object with a `read()` method or a repository with specified operations. But an overly broad protocol is not a useful contract, and static conformance does not prove runtime correctness. Tests still need to verify semantics, not just method names.

## Reasoning exercise

Define the smallest behavior a consumer needs. This reduces coupling and makes fakes or alternative implementations possible without building a large inheritance tree.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
