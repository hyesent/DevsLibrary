---
title: "From Source Code to Execution"
order: 2
book: "python"
---

# From Source Code to Execution

## Core model

Execution has stages: source is decoded and parsed; syntax and some structural rules are checked; code is compiled; then runtime operations resolve names, call functions, access objects, and raise exceptions as needed. Compilation does not prove that a program is logically correct or that every branch will succeed.

## How it behaves in real code

For example, `print(1 / 0)` is syntactically valid and can compile, but division fails when that expression executes. A name typo may also survive parsing and raise `NameError` only when the relevant line runs. This is why syntax checks and tests catch different classes of defects.

## Reasoning exercise

Classify failures as parse-time, import/startup, or runtime failures. That classification narrows debugging: inspect punctuation and indentation for syntax errors, module paths for import failures, and values/control flow for runtime exceptions.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
