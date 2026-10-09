# 010. Cookies, Sessions, CORS, and Browser Security Boundaries

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 10 of 30

## Learning goals
- Understand cookie-based authentication and browser cross-origin controls.
- Configure CORS without confusing it with authorization.
- Recognize CSRF and token storage trade-offs.

Cookies are automatically attached by browsers according to their scope and policy. For session cookies, use HTTPS and suitable `Secure`, `HttpOnly`, and `SameSite` settings. Session-based browser apps need a CSRF strategy for state-changing requests because browsers can attach cookies automatically.

CORS is a browser-enforced policy that controls whether frontend JavaScript from one origin can read a response from another. A preflight request may ask the server which methods and headers are allowed. CORS does not authenticate users, does not authorize actions, and does not prevent direct calls by command-line clients or other servers.

Do not reflect arbitrary `Origin` values into `Access-Control-Allow-Origin`. Allow only intended origins. Credentialed CORS requires deliberate configuration and cannot use a wildcard origin. Token storage in browser applications involves trade-offs; protect against XSS, avoid exposing long-lived credentials, and follow current framework guidance.

## Practice
Configure a frontend origin that may call an API with credentials. Explain preflight, allowed headers, and why the API still needs authorization checks.
