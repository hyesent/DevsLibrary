---
title: "HTTP Trust Boundaries and Request Lifecycle"
order: 5
book: "web-security"
---

## Mental model

HTTP passes through browser, DNS, TLS termination, CDN, reverse proxy, framework, application, database driver, and downstream services. Layers may decode, normalize, cache, authenticate, or route differently. Host and forwarded-IP headers are client-controlled unless a trusted proxy strips and rewrites them.

## Failure modes and design choices

A content-type header is a claim, not proof of safe content. A method name does not guarantee harmless behavior. Parsing disagreements around duplicate headers, path normalization, encoded separators, and request framing can create security gaps between components.

## Verification and engineering practice

When diagnosing an HTTP issue, capture a sanitized request and response, map every intermediary, and establish how each layer parses and routes it.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
