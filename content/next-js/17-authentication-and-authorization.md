# Authentication and Authorization

Authentication asks who the user is; authorization asks what that user may do. A logged-in user is not allowed to read every record by default. Prefer a maintained authentication library or identity provider rather than inventing a production session protocol.

Check permissions close to each sensitive data read or mutation. Protect Server Actions, Route Handlers, server-rendered pages, and database operations. Hiding links or redirecting from a page is useful UX, not a complete access-control policy.

Use secure cookie settings appropriate to deployment, including `HttpOnly`, `Secure` on HTTPS, and a considered `SameSite` policy. Plan session expiry, revocation, logout, and role changes. For multi-tenant apps, derive membership from verified session/authorization data, not a freely editable form field, and include tenant scope in queries.

**Practice:** Test direct URL access, guessed record IDs, action calls without the UI, expired sessions, and users from different tenants.
