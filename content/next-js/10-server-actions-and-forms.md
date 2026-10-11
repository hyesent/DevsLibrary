# Server Actions and Form Mutations

Server Actions are async server functions callable through supported React/Next.js mechanisms, often a form's `action`. They simplify mutations but do not remove the need for normal security checks. Use the current docs because APIs and constraints evolve.

A robust mutation usually follows this order: authenticate, parse and validate, authorize the specific resource, perform a safe transaction or write, handle conflicts/errors, revalidate affected data, then redirect or return a safe result. Treat `FormData` as untrusted: fields can be missing, unexpected types, too long, or malicious.

Browser validation improves usability but can be bypassed. Validate again on the server. A hidden button or protected page does not secure an action. Never trust a user ID supplied by the form when the verified session is authoritative. Do not report success or invalidate caches before the write succeeds.

Forms should expose pending, success, and error states. Where supported, Server Action forms can progressively enhance submission before client JavaScript loads.

**Practice:** Build a bookmark form with input validation, ownership checks, duplicate handling, and useful errors.
