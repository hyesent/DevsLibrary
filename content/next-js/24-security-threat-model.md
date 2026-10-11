# Security and Threat Modeling

Identify assets (accounts, private progress, service credentials, database records), attackers, and entry points (URLs, forms, cookies, uploads, Route Handlers, Server Actions, webhooks, and third-party APIs).

Authorize every sensitive read and mutation. Use parameterized queries. Safely render untrusted content and avoid injecting raw HTML unless it has been sanitized by a trusted approach. Understand CSRF protections for cookie-authenticated mutations and validate redirect targets. Keep secrets server-side, redact logs, and treat `NEXT_PUBLIC_` values as public.

For uploads, restrict size and allowed formats; filenames and MIME types alone are not trustworthy. Store private uploads outside public paths or enforce authorization when serving them. Keep dependencies updated and review security advisories. Content Security Policy can add defense in depth but does not fix unsafe rendering.

**Practice:** Threat-model book uploads and list a preventive control, detection mechanism, and test for each risk.
