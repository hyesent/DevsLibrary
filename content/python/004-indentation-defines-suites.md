---
title: "Indentation Defines Suites"
order: 4
book: "python"
---

# Indentation Defines Suites

## Core model

Indentation is syntax in Python. A colon introduces a suite, and the indented statements form its body: functions, conditionals, loops, classes, and exception handlers all use this structure. Indentation is therefore not visual decoration; it determines which statements belong to which branch or definition.

## How it behaves in real code

A line accidentally dedented after an `if` runs regardless of that condition. Conversely, a line indented too far may become part of a branch or trigger an indentation error. Use consistent spaces, normally four per level, and let formatters keep structure consistent.

## Reasoning exercise

When code behaves unexpectedly, draw the block tree before examining individual expressions. Ask which statements are children of which control statement. This often reveals bugs faster than reading each line as if it stood alone.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
