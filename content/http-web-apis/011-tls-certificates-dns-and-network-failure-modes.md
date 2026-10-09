# 011. TLS, Certificates, DNS, and Network Failure Modes

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 11 of 30

## Learning goals
- Understand the purpose of HTTPS.
- Diagnose common connection failures.
- Avoid weakening transport security to “fix” a problem.

TLS protects data in transit and authenticates the server through certificate validation. Clients should verify certificate chains and hostnames. Certificate expiry, wrong hostnames, missing intermediates, trust-store problems, clock skew, DNS misconfiguration, and network policy can all cause failures. Disabling certificate verification removes an important security guarantee and is not a production fix.

DNS resolves names to addresses and may be cached. A hostname can resolve to multiple addresses, and network paths can fail independently. Connection timeout, TLS handshake timeout, and response timeout describe different failure stages. Record enough diagnostics to distinguish them without logging credentials or full sensitive payloads.

Use modern TLS configurations managed by the platform or trusted infrastructure. Plan certificate renewal, monitor expiration, and ensure internal service identities are authenticated as well as encrypted.

## Practice
Write a diagnostic checklist for a client that gets DNS failures, certificate errors, connection refusal, and gateway timeouts.
