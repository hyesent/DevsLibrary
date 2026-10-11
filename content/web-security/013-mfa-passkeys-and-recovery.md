---
title: "MFA, Passkeys, and Recovery"
order: 13
book: "web-security"
---

## Mental model

MFA combines distinct factor categories; two passwords are not independent factors. Passkeys/WebAuthn can provide phishing-resistant authentication when implemented correctly. TOTP codes improve on password-only login but can be phished in real time; SMS is weaker because of telecom and number-takeover risks.

## Failure modes and design choices

Enrollment and recovery are security-sensitive. Require recent authentication or step-up verification before replacing factors, notify users of changes, protect recovery codes, and prevent a stolen session from silently replacing every factor. Recovery must not become a weaker bypass than the authentication method.

## Verification and engineering practice

Test lost devices, factor replacement, recovery attempts, session revocation, and high-risk actions. Reauthentication may be appropriate for sensitive changes even after login.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
