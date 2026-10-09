---
title: "HTTP Clients and API Boundaries"
order: 44
book: "python"
---

# HTTP Clients and API Boundaries

## Core model

An HTTP client translates application intent into requests and translates responses into application-level results. Status codes, headers, timeouts, redirects, and body formats are all part of the protocol. A successful network connection does not imply a successful application operation, and a JSON response does not imply valid domain data.

## How it behaves in real code

Set connection/read timeouts, handle non-success statuses deliberately, and avoid retrying non-idempotent requests without a safe protocol. Validate response schemas and treat external text as untrusted. Keep transport concerns—URLs, status codes, serialization—separate from business decisions where practical.

## Reasoning exercise

Design API clients around explicit outcomes: success, expected absence, rate limit, transient failure, and permanent failure. Log enough context to diagnose the request without exposing authorization headers or personal data.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
