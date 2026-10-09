---
title: "Files and Context Managers"
order: 27
book: "python"
---

# Files and Context Managers

## Core model

Opening a file acquires an operating-system resource. A context manager makes the resource lifetime explicit and ensures cleanup even when the body raises an exception. `with open(...) as file:` is therefore a correctness pattern, not merely shorter syntax.

## How it behaves in real code

Text mode decodes bytes into strings; binary mode returns bytes. Specify an encoding such as UTF-8 for text files when interoperability matters. File paths are environment-dependent, so code should not assume the process working directory is the directory containing the source file.

## Reasoning exercise

Use context managers for files, locks, database transactions, and other resources with acquire/release lifecycles. Decide whether the file is trusted, how large it can be, and what should happen if reading or writing is interrupted.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
