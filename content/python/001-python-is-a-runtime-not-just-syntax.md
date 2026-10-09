---
title: "Python Is a Runtime, Not Just Syntax"
order: 1
book: "python"
---

# Python Is a Runtime, Not Just Syntax

## Core model

Python source is a description of operations, not the operations themselves. An implementation parses source, builds an internal representation, and executes it in a runtime that manages objects, calls, exceptions, and memory. CPython commonly compiles source to bytecode and interprets that bytecode; this is an implementation detail, not a promise that every Python implementation works identically.

## How it behaves in real code

This distinction explains why valid-looking code can fail before execution (syntax errors), during execution (exceptions), or behave differently across environments because imports, files, environment variables, and installed packages differ. A program is source plus the runtime and environment that give it meaning.

## Reasoning exercise

Compare `python script.py` with entering the same statements in the interactive interpreter. The language semantics are shared, but startup, module identity, and process lifetime differ. Ask which behavior belongs to the language and which belongs to the interpreter or operating system.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
