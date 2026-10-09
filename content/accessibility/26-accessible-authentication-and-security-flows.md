# Accessible Authentication and Security Flows

> DevsLibrary · Web Accessibility · Lesson 26

## Authentication can create disproportionate barriers
Login, multi-factor authentication, password reset, identity verification, and bot detection must be designed with access needs in mind. A visual puzzle, memory challenge, or timing constraint may exclude legitimate users.

Support password managers and paste where security policy permits; avoid disabling autofill or blocking password paste without a strong, tested reason. Provide clear labels, meaningful error messages, and a usable recovery route. Do not require users to solve a cognitive-function test as the only authentication method.

## Accessible MFA
Offer multiple secure methods where feasible, including options that do not depend on hearing, vision, a specific phone, or fine motor control. Explain expiration and retry behavior. Ensure one-time codes can be copied and pasted and that the user can request a new code without losing unrelated form data.

## Security and privacy together
Accessible errors should not leak sensitive account information. Balance actionable guidance with defenses against enumeration and abuse. Protect recovery flows from social engineering while ensuring that users who cannot complete one method have a secure alternative.

## Exercise
Map a password-reset journey. Test keyboard access, screen-reader labels, code entry, expiration, resend, incorrect-code handling, and recovery alternatives. Note both accessibility barriers and security trade-offs.
