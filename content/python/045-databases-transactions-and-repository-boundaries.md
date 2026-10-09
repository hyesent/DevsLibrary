---
title: "Databases, Transactions, and Repository Boundaries"
order: 45
book: "python"
---

# Databases, Transactions, and Repository Boundaries

## Core model

Database code crosses a boundary between in-memory state and durable shared state. A transaction groups operations into a unit with database-defined atomicity and isolation guarantees. A Python exception after a database write does not by itself guarantee rollback unless the transaction/context-manager contract ensures it.

## How it behaves in real code

Parameterized queries separate SQL structure from values and protect against injection. Connection pools manage a finite resource, so each checked-out connection needs a clear lifetime. Repository abstractions can isolate persistence details, but a generic abstraction that hides transactions or query shape may make correctness harder to see.

## Reasoning exercise

Make transaction boundaries match business invariants. Ask what must succeed or fail together, what concurrent requests can observe, and whether retries are safe after an uncertain connection failure.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
