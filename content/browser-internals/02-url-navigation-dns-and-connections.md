# URLs, Navigation, DNS, and Connections

> DevsLibrary · Browser Internals · Lesson 02

## A URL is structured data
A URL can contain a scheme, authority, host, optional port, path, query, and fragment. The fragment is generally handled client-side and is not sent as part of the HTTP request. Relative URLs are resolved against a base URL, which can be affected by the document's `<base>` element.

## Navigation lifecycle
When navigating, the browser determines whether the destination is allowed, reuses or establishes connections, performs name resolution as needed, sends an HTTP request, processes redirects, and receives a response. Some work can be reused from caches or existing connections.

DNS maps hostnames to network records. Real-world resolution can involve browser caches, operating-system caches, recursive resolvers, and authoritative servers. DNS is not the same as establishing a transport connection or authenticating the server.

## TCP, TLS, and QUIC
HTTP/1.1 and HTTP/2 commonly use TCP; HTTPS adds TLS for confidentiality, integrity, and server authentication. HTTP/3 uses QUIC over UDP and integrates transport security. Connection setup costs can affect latency, so browsers reuse connections and may warm them through mechanisms such as preconnect when justified.

## Redirects and canonical destinations
Redirects can add round trips and may change method behavior depending on status code and client rules. Avoid unnecessary redirect chains. Do not treat a redirect as authorization; the destination server must enforce access control.

## Exercise
Use the Network panel to trace a navigation with redirects. Identify the initial URL, each response status, DNS/connect/TLS timing if exposed, and the final document URL.
