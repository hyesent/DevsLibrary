# 001. The Web's Request-Response Model

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 1 of 30

## Learning goals
- Explain how a client and server exchange HTTP messages.
- Separate HTTP from DNS, TCP, TLS, and application logic.
- Trace a request through a real deployment.

A web API is a contract exposed over a network. A client sends a request; a server returns a response. Before that exchange, the client may resolve a hostname through DNS, establish a transport connection, negotiate TLS for HTTPS, and pass through a proxy, load balancer, or gateway. HTTP describes the application-layer messages; it does not itself define every lower-layer detail.

A request includes a method, target, headers, and sometimes content. A response includes a status code, headers, and sometimes content. The body may be HTML, JSON, an image, an empty body, or another representation. Do not assume every response is JSON or every request has a body.

A reverse proxy may terminate TLS, add forwarding headers, route traffic, enforce size limits, or cache responses. The application must know which headers come from trusted infrastructure and which can be supplied by clients.

## Example
```http
GET /v1/products/42 HTTP/1.1
Host: api.example.test
Accept: application/json
```
A possible response:
```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: private, max-age=60

{"id":42,"name":"Notebook"}
```

## Common mistakes
- Treating HTTP status codes as application-specific strings.
- Assuming a network timeout proves the server did not perform the operation.
- Confusing a browser's same-origin policy with server-side authorization.

## Practice
Draw a request from a mobile app through DNS, TLS, a gateway, an API server, and a database. Mark which component is responsible for each concern.
