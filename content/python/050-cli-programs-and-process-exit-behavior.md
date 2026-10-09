---
title: "CLI Programs and Process Exit Behavior"
order: 50
book: "python"
---

# CLI Programs and Process Exit Behavior

## Core model

A command-line program has inputs, outputs, side effects, and an exit status. `argparse` can define options and usage errors; standard output is suitable for normal output, while standard error is commonly used for diagnostics. Exit code zero conventionally signals success, and nonzero codes let scripts detect failure.

## How it behaves in real code

Importable logic should be separate from argument parsing and process termination. Calling `sys.exit()` deep inside a reusable function makes it harder to test and reuse; returning a result or raising an exception lets the outer entry point decide the process outcome.

## Reasoning exercise

Treat the CLI as an adapter around application functions. Test parsing, success output, error output, and exit codes independently from the core logic.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
