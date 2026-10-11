---
title: "TLS, HTTPS, and HSTS"
order: 10
book: "web-security"
---

## Mental model

TLS protects data in transit when certificate validation and protocol configuration are correct. It does not establish user authorization or protect plaintext inside application logs and databases. Use HTTPS throughout, redirect HTTP safely, and avoid mixed content.

## Failure modes and design choices

HSTS tells compatible browsers to use HTTPS for future connections. Roll out max-age, includeSubDomains, and preload carefully because every covered hostname must support HTTPS. Protect private keys, monitor certificate renewal, and validate certificates between internal services when that network is not trusted.

## Verification and engineering practice

Check hostnames, certificate chains, renewal, redirects, internal hops, and proxy forwarding behavior. Never disable certificate verification merely to silence an error.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
