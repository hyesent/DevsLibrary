# Application Servers, Reverse Proxies, and Load Balancers

## Learning goals
Explain the role of a reverse proxy or load balancer and design health checks and request handling that fail safely.

## Request path
A client may connect to a CDN or edge proxy, then a load balancer, then one of several application instances. The proxy can terminate TLS, route by hostname/path, balance traffic, enforce limits and emit access logs. These functions may be combined in one managed service or spread across several layers.

Each additional layer adds configuration and another potential failure point. Draw the real request path and identify which component owns redirects, TLS, client IP interpretation, request-size limits and timeouts. Duplicate settings at multiple layers can create conflicting behavior.

## Forwarded headers and trust
Proxies may add headers such as `Forwarded` or `X-Forwarded-For` to communicate the original client address. These headers are not trustworthy merely because they exist: a direct client can forge them unless the application accepts them only from known proxy hops and the proxy overwrites or sanitizes untrusted input. Incorrect trust configuration can break IP-based security controls and audit logs.

## Health checks
A liveness check should answer whether the process needs restarting; a readiness check should answer whether it can serve requests. A readiness check may include essential dependencies, but deep checks on every probe can create load or cascade during an outage. Use suitable timeouts and avoid treating a slow but recovering database as a reason to restart every application instance simultaneously.

## Timeouts and limits
Set explicit timeouts at each hop. If the proxy times out after 30 seconds but the application keeps doing work for several minutes, resources may be wasted after the client has gone. Align request, upstream and database timeouts with the work’s real needs. Long-running jobs usually belong in a queue or background worker rather than a synchronous web request.

## Draining and graceful shutdown
During deploys or scale-in, stop sending new requests to an instance, allow in-flight requests a bounded time to finish, and then terminate it. Handle termination signals and close database connections. If a service exits immediately, requests can be cut off; if it refuses to exit forever, deployments can stall.

## Practice
Trace a request through every hop and assign a timeout, request-size limit, health check and log source. Test an instance becoming unhealthy while requests are active. Confirm that traffic moves away without routing users to an instance that is technically running but unable to serve.
