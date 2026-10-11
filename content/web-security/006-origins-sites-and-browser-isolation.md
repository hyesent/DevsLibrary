---
title: "Origins, Sites, and Browser Isolation"
order: 6
book: "web-security"
---

## Mental model

An origin is generally the scheme, host, and port tuple; a site is a broader browser concept. Same-origin policy restricts many cross-origin reads, but it does not mean cross-origin requests can never be sent. Forms, navigations, images, and other browser features can initiate requests under different rules.

## Failure modes and design choices

This distinction explains CSRF: a hostile site may be unable to read a response but still cause a victim's browser to send an authenticated request. Subdomains are not automatically equivalent trust zones, and browser process isolation is not a replacement for server authorization.

## Verification and engineering practice

Test actual deployed schemes, ports, subdomains, redirects, and embedded contexts. Define exact trusted origins instead of using loose hostname substring checks.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
