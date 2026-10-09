---
title: "Modules, Imports, and Module Identity"
order: 23
book: "python"
---

# Modules, Imports, and Module Identity

## Core model

A module is an execution and namespace unit. Importing a module normally executes its top-level code once per interpreter process and stores the resulting module object in `sys.modules`. Imports bind names to objects; they do not textually paste another file into the current one.

## How it behaves in real code

Top-level side effects make imports unpredictable: importing a module should usually define functions, classes, and constants rather than start servers, delete files, or run expensive jobs. Circular imports expose partially initialized modules and often indicate tangled dependency direction.

## Reasoning exercise

Separate definitions from application startup. Keep entry-point behavior behind `if __name__ == '__main__':` when a file is intended to work both as an importable module and a script.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
