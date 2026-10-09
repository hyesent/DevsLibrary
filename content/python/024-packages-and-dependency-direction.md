---
title: "Packages and Dependency Direction"
order: 24
book: "python"
---

# Packages and Dependency Direction

## Core model

A package groups modules under a namespace. Its structure should communicate responsibilities: domain rules should not need to import command-line presentation code, and reusable logic should not depend on a particular deployment script. Dependency direction determines how easily a subsystem can be tested and reused.

## How it behaves in real code

A package can use `__init__.py` to define package behavior and exports, while namespace packages have different discovery rules. Avoid building an elaborate package hierarchy for a tiny script, but do not let a growing application become one giant module whose internal dependencies are invisible.

## Reasoning exercise

Draw arrows for imports. Cycles and arrows from core logic toward delivery mechanisms are signals to revisit boundaries. Public exports should be intentional rather than accidental consequences of every module name.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
