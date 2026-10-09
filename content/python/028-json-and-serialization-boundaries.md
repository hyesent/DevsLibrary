---
title: "JSON and Serialization Boundaries"
order: 28
book: "python"
---

# JSON and Serialization Boundaries

## Core model

Serialization converts in-memory data into a representation that can cross a process or storage boundary. JSON supports objects, arrays, strings, numbers, booleans, and null, but not arbitrary Python classes, sets, file handles, or cyclic object graphs. Serialization is a contract with another system, not a transparent snapshot of every Python object.

## How it behaves in real code

Parsing JSON gives you data, not validated domain objects. A payload with the right JSON syntax can still omit required fields, use the wrong types, or contain hostile values. Validate after parsing and decide how to represent dates, decimals, and identifiers because JSON has no dedicated types for them.

## Reasoning exercise

Treat deserialized data as untrusted input. Version schemas when stored or transmitted data will outlive one deployment, and avoid blindly deserializing formats such as pickle from untrusted sources because they can execute code during loading.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
