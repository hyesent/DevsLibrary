---
title: "Request Smuggling and Parser Differentials"
order: 49
book: "web-security"
---

## Mental model

Request smuggling can occur when HTTP intermediaries disagree about message boundaries. Similar parser differentials appear with duplicate headers, encoded paths, repeated decoding, and ambiguous structured input.

## Failure modes and design choices

Keep proxies and servers patched and configured consistently, avoid ambiguous framing, and ensure malformed requests are handled safely. Security checks must use the same canonical interpretation that determines routing and execution.

## Verification and engineering practice

Test only in authorized, controlled environments and inspect the full CDN-to-application path.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
