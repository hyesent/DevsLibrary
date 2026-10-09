# DNS, Domains, TLS, and HTTPS

## Learning goals
Understand the request path from a domain name to an HTTPS application and troubleshoot common failures safely.

## DNS maps names to records
DNS records publish information about a domain. Common records include A/AAAA for IP addresses, CNAME for aliases, MX for mail routing and TXT for verification or policy. A CNAME generally cannot coexist with other data at the same owner name under traditional DNS rules; providers may offer special apex-alias features, but behavior varies. Follow the DNS host’s documentation.

DNS uses caching. A record change may not appear immediately because resolvers can retain old answers until their TTL expires. Lowering TTL before a planned migration can help, but lowering it at the last minute does not erase caches that already stored the old TTL. Keep the old endpoint available during the transition when feasible.

## HTTPS and certificates
TLS protects data in transit and authenticates the server for the requested hostname. A certificate must be valid for the hostname, within its validity period, and chain to a trusted certificate authority. Automated certificate issuance and renewal reduce manual errors, but renewal must be monitored and the domain validation method must continue to work.

A TLS termination point—load balancer, edge network, reverse proxy or application—decrypts traffic. If traffic continues to another service over a network, decide whether that internal hop also needs encryption. “HTTPS at the edge” does not automatically encrypt every downstream connection.

## Common failure modes
- **DNS resolves to the wrong target:** check authoritative records, resolver cache and provider-assigned target.
- **Certificate mismatch:** check the exact hostname, including `www` versus apex, and certificate coverage.
- **Renewal failure:** inspect validation records, challenge routing and expiration alerts.
- **Redirect loop:** inspect proxy headers and whether the application knows the original request used HTTPS.
- **Mixed content:** an HTTPS page tries to load insecure HTTP resources.
- **Old endpoint still receives traffic:** DNS caching or stale records may be responsible.

## Safe rollout
Verify domain ownership, create records with the provider-specified values, test the origin before moving production traffic, provision certificates, configure redirects and security headers, and monitor renewal. Do not assume an IP address is stable unless the provider says so.

## Practice
For `app.example.com`, draw the path: resolver → DNS answer → edge/load balancer → application → database. Mark where DNS is controlled, where TLS terminates, which hops are public, and which health checks prevent traffic from reaching an unhealthy instance. Keep private origin addresses and credentials out of public documentation.
