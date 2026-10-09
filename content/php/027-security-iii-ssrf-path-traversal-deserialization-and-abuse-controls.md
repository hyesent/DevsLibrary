# 027. Security III: SSRF, Path Traversal, Deserialization, and Abuse Controls

> Book: PHP · Level: beginner to advanced · Part 27 of 45

# Learning goals
- Recognize less obvious trust-boundary failures.
- Validate outbound destinations and file paths.
- Limit resource abuse.

Server-side request forgery (SSRF) occurs when an attacker influences server-side network requests. Avoid accepting arbitrary URLs for server fetches. If remote fetches are required, use strict host allowlists, validate resolved IP addresses, block loopback/private/link-local and metadata destinations as appropriate, revalidate redirects, and enforce egress controls. DNS rebinding and proxy behavior complicate simplistic checks.

Path traversal can expose files outside an intended directory. Use server-generated names or map logical IDs to storage records rather than accepting raw paths. Deserializing untrusted PHP serialized data can trigger dangerous object behavior; avoid `unserialize()` on untrusted input and use constrained formats such as JSON with validation.

Rate limits, request-size caps, timeouts, pagination limits, and bounded concurrency protect availability. Log abuse signals without recording passwords, session IDs, tokens, or unnecessary personal data.

## Practice
Threat-model an image-import feature that fetches a user-provided URL. Identify redirect, DNS, private-network, and oversized-response risks.
