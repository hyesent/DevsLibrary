---
title: "Cross-Site Scripting: Reflected, Stored, DOM"
order: 22
book: "web-security"
---

## Mental model

XSS occurs when attacker-controlled data becomes executable in a victim's browser context. Reflected XSS returns unsafe request data, stored XSS persists it for later viewers, and DOM XSS arises when client code places untrusted data into dangerous sinks.

## Failure modes and design choices

Use safe DOM APIs, context-aware encoding, maintained sanitization for required rich HTML, careful framework escape hatches, and CSP as a secondary layer. XSS can often act through the user's active session even when session cookies are HttpOnly. Inspect SVG, Markdown, templates, and third-party scripts.

## Verification and engineering practice

Test every rendering context, not just the original input page. Fix the data flow and sink, then add regression tests; filtering a short list of suspicious strings is fragile.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
