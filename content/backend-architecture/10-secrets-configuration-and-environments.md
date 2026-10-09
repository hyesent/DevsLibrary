# Lesson 10: Secrets, Configuration, and Environment Design

**Track:** Security

## Learning objectives
- Separate configuration from code
- Rotate credentials safely
- Prevent secrets from leaking through logs and builds

## Lesson
### Configuration changes behavior; secrets grant authority

Configuration includes ports, feature flags, public origins, timeouts, and environment-specific URLs. Secrets include database passwords, signing keys, provider tokens, and privileged service credentials. Both should be supplied through controlled deployment configuration rather than hardcoded in source. A `.env` file can be convenient locally, but it is not a production secrets-management system by itself.

Use a schema to validate required configuration at startup. A service should fail early with a clear message when a required variable is missing or malformed, instead of failing halfway through a payment request. Avoid printing the secret value in the error.

### Separate development, test, staging, and production

Environments should have separate credentials and preferably separate data. A staging deployment with production service-role credentials creates an unnecessary blast radius. Production data copied into development can expose personal information and create accidental side effects. Use synthetic or properly sanitized data where possible.

Configuration drift is a risk: staging may silently have a different timeout, database extension, or feature flag than production. Treat infrastructure and configuration as reviewable artifacts, and record intentional differences.

### Rotation without downtime

Secret rotation often requires an overlap period. Create a new credential, configure the service to accept or use it, verify successful traffic, then revoke the old credential. Signing-key rotation may require key IDs or a verification window for tokens signed with the previous key. Database password changes may require coordinated pool restarts.

Document who can rotate each secret and how to recover if the new credential is invalid. Test the procedure before an emergency; a rotation plan that exists only as a vague sentence is not operationally useful.

### Prevent accidental exposure

Add secret files to ignore rules, but do not rely on ignore rules as a security boundary. Scan commits and build artifacts, restrict repository access, and use short-lived credentials when supported. If a secret is committed, deleting the line in a later commit does not erase it from history. Revoke or rotate it immediately and assess access logs.

Frontend build variables are not secret if they are embedded in downloadable JavaScript. Prefix conventions in build tools often intentionally expose selected variables. Never place a privileged database key in a browser bundle under the assumption that a variable name makes it private.

### Configuration as a typed contract

Parse booleans explicitly rather than treating every nonempty string as true. Validate numeric ranges for timeout and pool settings. Normalize URLs and reject unexpected schemes. Centralize configuration access so application modules do not each invent defaults. Document safe defaults and which values are mandatory.

A good startup report can list non-sensitive effective settings, such as runtime mode, enabled feature flags, and timeout values. It must never print credential contents.

## Worked example

A function deployment requires `DATABASE_URL`, `JWT_ISSUER`, and `PAYMENT_API_KEY`. Startup validates presence and format, but logs only variable names and safe metadata. Production and staging use distinct credentials, and the rotation runbook explains how to overlap old and new payment keys.

## Exercises

1. Classify five sample values as configuration or secret.
2. Explain why deleting a leaked key from Git does not make it safe again.
3. Design a safe credential rotation sequence.

## Solution notes

Timeouts and public origins are configuration; passwords and signing keys are secrets. History and clones may retain leaked credentials, so revoke/rotate them. Create new key, deploy, verify, monitor, then revoke old key after overlap.

## Review checklist

- Can I explain: separate configuration from code?
- Can I explain: rotate credentials safely?
- Can I explain: prevent secrets from leaking through logs and builds?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
