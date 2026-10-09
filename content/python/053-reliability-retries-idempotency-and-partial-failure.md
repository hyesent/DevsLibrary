---
title: "Reliability: Retries, Idempotency, and Partial Failure"
order: 53
book: "python"
---

# Reliability: Retries, Idempotency, and Partial Failure

## Core model

A timeout means the caller does not know whether the remote operation completed. Networks can fail after the server commits work but before the response reaches the client. Therefore, retrying is a semantic decision, not merely a loop around an exception.

## How it behaves in real code

Idempotent operations can be repeated without changing the final intended effect after the first success. Idempotency keys, unique constraints, and deduplication records can support safe retries. Exponential backoff with jitter reduces synchronized retry storms, but retries should be bounded by a deadline and limited to transient failure classes.

## Reasoning exercise

For every external side effect, ask what happens if the response is lost after success. Define a deduplication strategy, timeout policy, and recovery path before deploying automatic retries.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
