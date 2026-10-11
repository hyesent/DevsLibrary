---
title: "Host Headers, Forwarded Headers, and DNS Rebinding"
order: 48
book: "web-security"
---

## Mental model

Host and forwarding headers influence redirects, absolute URL generation, origin checks, client-IP logs, and routing. Trusting arbitrary values can poison links or falsify audit context. DNS rebinding can defeat simple URL-to-address assumptions.

## Failure modes and design choices

Configure canonical hosts, accept forwarded headers only from known proxies, and have proxies strip and rewrite untrusted values. For server-side fetching, enforce destination policy at connection time and restrict egress. IPv4, IPv6, redirects, and DNS changes matter.

## Verification and engineering practice

Test host manipulation, multiple forwarding headers, unexpected ports, proxy chains, and HTTPS redirects.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
