---
title: "Environment Configuration and Secrets"
order: 40
book: "python"
---

# Environment Configuration and Secrets

## Core model

Configuration separates environment-specific choices from application logic. Development, testing, and production may use different database endpoints, log levels, and feature settings while running the same code. Environment variables are a common transport, but they still require parsing, validation, and clear defaults.

## How it behaves in real code

Secrets should not be committed to source control or printed in logs. Missing critical configuration should usually fail early with a useful error rather than allow a process to start in a misleading partially functional state. Validate numeric ports, URLs, booleans, and required keys instead of treating every environment value as a trustworthy string.

## Reasoning exercise

Define configuration once at startup, validate it, and pass the resulting settings to components. This makes dependencies visible and prevents scattered calls to `os.environ` from turning configuration into hidden global state.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
