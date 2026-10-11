---
title: "Output Encoding and Safe Rendering"
order: 21
book: "web-security"
---

## Mental model

Output encoding makes untrusted data safe for its exact context. HTML text, attributes, JavaScript, CSS, URLs, and SQL have different grammars; there is no universal escape function. Use framework-safe interpolation and avoid constructing executable source from data.

## Failure modes and design choices

Raw HTML insertion bypasses ordinary escaping. If rich HTML is required, use a maintained sanitizer with a restrictive policy. Sanitization allows a safe subset of markup; output encoding displays data as text. Avoid manual character replacement chains that ignore parser context.

## Verification and engineering practice

Test the final DOM and each place content appears: previews, admin views, notifications, exports, and email. A value safe in one context may be unsafe in another.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
