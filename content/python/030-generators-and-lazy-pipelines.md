---
title: "Generators and Lazy Pipelines"
order: 30
book: "python"
---

# Generators and Lazy Pipelines

## Core model

A generator function uses `yield` to suspend execution and later resume from its saved state. It can produce a stream of values without storing the whole result in memory. Generator expressions provide a compact lazy form, making it possible to chain transformations over large inputs.

## How it behaves in real code

Laziness shifts when work happens: errors may arise during iteration rather than when the generator is created, and abandoning a generator can mean not all work occurs. Side effects inside a lazy pipeline are therefore especially easy to overlook. A generator is not automatically faster; it trades eager storage for incremental execution.

## Reasoning exercise

Separate data production from consumption. Check what happens when iteration stops early, when the source raises, and when the same iterable is consumed more than once.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
