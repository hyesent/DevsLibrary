---
title: "Architecture: Keep the Core Separate from Delivery"
order: 52
book: "python"
---

# Architecture: Keep the Core Separate from Delivery

## Core model

A maintainable application separates domain rules from delivery mechanisms such as HTTP endpoints, CLI commands, scheduled jobs, and message consumers. Multiple adapters can invoke the same core operation without duplicating its business rules. This is a dependency-direction principle, not a requirement to create dozens of layers.

## How it behaves in real code

The core should receive dependencies it needs rather than importing global clients at arbitrary points. At the same time, abstraction has a cost: interfaces are useful when they isolate a real change boundary or enable meaningful testing, not simply because architecture diagrams look cleaner.

## Reasoning exercise

Trace a request from input to domain decision to persistence/output. Identify where validation, authorization, transaction management, and external effects belong, then make the ownership visible in code.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
