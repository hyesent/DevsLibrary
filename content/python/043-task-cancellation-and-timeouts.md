---
title: "Task Cancellation and Timeouts"
order: 43
book: "python"
---

# Task Cancellation and Timeouts

## Core model

Cancellation is a control signal that asks work to stop; it is not proof that all underlying operations instantly cease. In asyncio, cancellation is delivered at suspension points and should generally be allowed to propagate after required cleanup. Timeouts bound how long a caller is willing to wait, but do not always undo a remote side effect.

## How it behaves in real code

A client can time out after a server has completed a payment or written a record. Retrying blindly may duplicate the operation. Reliable systems use idempotency keys, operation status checks, and clear retry policies where the remote protocol supports them.

## Reasoning exercise

For every long-running operation, define its deadline, cancellation cleanup, and retry safety. Distinguish “the caller stopped waiting” from “the work definitely did not happen.”

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
