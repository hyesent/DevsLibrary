# 002. HTTP Message Anatomy: Methods, Targets, Headers, and Bodies

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 2 of 30

## Learning goals
- Identify the parts of an HTTP request and response.
- Understand header fields and message content.
- Recognize the distinction between representation metadata and transport framing.

HTTP/1.1 textual messages make the parts visible, while HTTP/2 and HTTP/3 use different wire encodings. Application semantics such as methods, status codes, and header meanings remain broadly consistent. Do not parse raw HTTP/1.1 text manually when a maintained server or client library already does it.

Headers communicate metadata such as content type, accepted formats, caching policy, authentication, and request correlation. Header names are case-insensitive. Repeated headers and comma-separated values have field-specific rules; do not assume every header can be safely concatenated.

The body carries content. `Content-Type` describes the media type of the representation; `Content-Encoding` describes a content coding such as compression. `Accept` expresses what formats a client can handle. A request body is not automatically valid merely because its media type is JSON: syntax, schema, size, and business constraints still require validation.

## Practice
For a JSON request, identify the method, target, media type, authentication mechanism, body schema, and response contract. Explain why a missing or incorrect `Content-Type` can matter.
