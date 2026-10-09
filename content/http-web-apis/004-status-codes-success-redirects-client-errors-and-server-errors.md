# 004. Status Codes: Success, Redirects, Client Errors, and Server Errors

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 4 of 30

## Learning goals
- Select meaningful status codes.
- Distinguish transport success from business success.
- Build consistent error responses.

Common 2xx codes include 200 OK, 201 Created, 202 Accepted, and 204 No Content. Use 201 when a resource has been created and consider a `Location` header identifying it. 202 means processing has been accepted but is not necessarily complete. 204 means the response has no content.

3xx responses control redirection or caching behavior. 304 Not Modified supports conditional requests. 4xx indicates a problem with the request or the client's authority, including 400, 401, 403, 404, 405, 409, 410, 412, 413, 415, 422, 429, and 428 in relevant cases. 5xx indicates server-side inability or failure, such as 500, 502, 503, or 504.

401 means valid authentication credentials are missing or invalid; 403 means the server understood the request but refuses it. Avoid leaking resource existence where the threat model calls for a consistent 404. Status code selection is part of the API contract and should be documented and tested.

## Practice
Define status and error-body behavior for invalid JSON, failed validation, unauthenticated access, forbidden access, a conflict, rate limiting, and a dependency outage.
