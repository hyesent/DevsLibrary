# Browser Security: CSP, CORS, CSRF, and XSS

> DevsLibrary · Browser Internals · Lesson 24

## Multiple controls, different jobs
- **CSP** restricts sources and types of content the page may load or execute.
- **CORS** controls whether browser JavaScript can read cross-origin responses under server-provided policy.
- **CSRF defenses** help prevent unwanted authenticated actions triggered cross-site.
- **XSS defenses** prevent attacker-controlled script execution in a trusted origin.

These controls are related but not interchangeable.

## CSP
A restrictive Content Security Policy can reduce the impact of some injection vulnerabilities. Start with report-only deployment where appropriate, analyze violations, and migrate toward explicit policies. Avoid treating `unsafe-inline` or broad wildcards as a harmless default.

## CORS and credentials
CORS is not an authorization system. A server must authorize the requested operation independently. Credentialed cross-origin requests require careful origin and credential policy; wildcard origin behavior is restricted in credentialed cases.

## CSRF and XSS
Use suitable CSRF defenses for the application's authentication design, such as anti-CSRF tokens and SameSite cookies where appropriate. Prevent XSS through context-aware output encoding, safe DOM APIs, and carefully controlled sanitization of rich HTML. `HttpOnly` helps protect cookie confidentiality but does not stop injected scripts from performing actions as the user.

## Exercise
Review a sample security configuration. Identify which threat each control addresses, which it does not, and what server-side authorization remains necessary.
