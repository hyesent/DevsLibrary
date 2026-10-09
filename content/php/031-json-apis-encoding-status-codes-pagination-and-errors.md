# 031. JSON APIs: Encoding, Status Codes, Pagination, and Errors

> Book: PHP · Level: beginner to advanced · Part 31 of 45

# Learning goals
- Build predictable JSON endpoints.
- Define response and error contracts.
- Handle pagination and content negotiation intentionally.

Set the response content type to `application/json; charset=utf-8`, choose an appropriate status code, and encode with `json_encode()`. Handle encoding failures explicitly, for example with `JSON_THROW_ON_ERROR` on supported versions. Do not concatenate strings to create JSON.

A useful API contract defines request schema, success shape, error shape, status codes, pagination, filtering, sorting, authentication, authorization, and versioning. Validate all client input and avoid returning internal exception details. Use cursor pagination for large or frequently changing datasets when offset pagination becomes unstable or expensive.

`PATCH` commonly expresses partial modification; `PUT` typically replaces a resource representation. Idempotency keys can help make retryable write operations safe, but require storage and replay semantics.

## Practice
Design a JSON endpoint for listing tasks and another for creating one. Include validation errors, missing resources, unauthorized access, and a stable pagination strategy.
