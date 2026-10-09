# Cookies, Storage, and Browser Data

> DevsLibrary · Browser Internals · Lesson 15

## Different storage mechanisms
Cookies are attached to matching requests according to domain, path, security, and SameSite rules. `localStorage` and `sessionStorage` expose string key-value storage to scripts for an origin. IndexedDB supports structured data and asynchronous transactions. Cache Storage is commonly used by service workers to store request/response pairs.

## Security and privacy
Do not store sensitive credentials or secrets in script-accessible storage without carefully considering the threat model. An XSS vulnerability can often read script-accessible data. `HttpOnly` cookies cannot be read by page JavaScript, while `Secure` limits transmission to secure contexts and `SameSite` helps control cross-site cookie sending. These attributes do not replace CSRF defenses in every design.

## Partitioning and browser policies
Browsers increasingly partition some storage and network state to reduce cross-site tracking. Third-party cookie behavior and storage access can vary across browsers and change over time. Test the actual deployment context rather than assuming a single global storage model.

## Lifecycle
Clear obsolete data, version application caches, handle quota failures, and do not assume storage writes always succeed. Users may clear site data or use private browsing modes with different persistence behavior.

## Exercise
Build a small storage comparison table for cookies, localStorage, sessionStorage, IndexedDB, and Cache Storage. Include access model, typical use, limits, and security considerations.
