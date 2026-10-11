---
title: "Working with Unfamiliar Tools and Documentation"
order: 19
book: "problem-solving"
---

Professional problem solving often means using a tool whose behavior you do not yet know. The goal is to build an accurate mental model quickly, not to memorize every option.

Start with the official overview, then locate the exact operation you need, its inputs, outputs, side effects, failure modes, and version constraints. Distinguish conceptual guides from API references and release notes. A tutorial may demonstrate a happy path while omitting authentication, limits, or migration concerns.

Build a minimal experiment. Change one thing, observe the result, and compare it with the documented contract. Keep the experiment small enough that a surprising result has few possible explanations. Then expand toward the real use case.

Read errors as evidence, not as complete diagnoses. A `401` and a `403` may indicate different authentication or authorization conditions; a connection timeout differs from an application-level rejection. Check the request, environment, credentials scope, network path, and server logs systematically.

Version matters. Documentation for the latest release may not describe the installed version. Record runtime, library, database, and API versions when investigating behavior. Be careful with copied snippets: environment variables, defaults, and security settings may be missing.

Use a source hierarchy: official documentation for contracts, source code or issue trackers for implementation-specific questions, and community posts as leads that must be verified. Never paste secrets into examples, public issue reports, or untrusted debugging services.

**Practice:** You must add a new authentication provider to an unfamiliar framework. Create a one-hour investigation plan that produces a verified minimal integration, a list of unknowns, and a safe rollback path.

**Connection:** This process applies to libraries, cloud services, operating systems, databases, and legacy codebases.
