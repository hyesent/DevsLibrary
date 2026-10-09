---
title: "Dataclasses and Domain Models"
order: 35
book: "python"
---

# Dataclasses and Domain Models

## Core model

`dataclasses.dataclass` generates common methods such as initialization and representation based on annotated fields. It reduces repetitive code for data-carrying types, but it does not automatically validate types or make instances immutable. `frozen=True` prevents ordinary field reassignment but does not recursively freeze objects held in those fields.

## How it behaves in real code

A data model should represent a meaningful domain concept. Decide whether equality should compare all fields, whether ordering makes sense, and whether a field should participate in initialization or representation. Mutable defaults require `default_factory` so each instance gets its own collection.

## Reasoning exercise

Use dataclasses when the generated semantics match the domain. Add explicit validation or constructors when invalid states must be impossible, and avoid treating annotations as runtime enforcement.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
