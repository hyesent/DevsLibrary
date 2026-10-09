# 020. File Uploads, Downloads, and Streaming APIs

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 20 of 30

## Learning goals
- Handle large payloads safely.
- Control content types and filenames.
- Enforce authorization and resource limits.

Uploads need maximum body and file sizes, timeouts, content inspection, malware scanning where appropriate, and a storage strategy. Do not trust client filenames, extensions, or MIME declarations. Use server-generated storage identifiers and keep uploaded content outside executable web roots. For large uploads, consider multipart or direct-to-object-storage flows with scoped, short-lived permissions.

Downloads must enforce authorization before revealing a file or signed URL. Set safe `Content-Type` and `Content-Disposition` values and prevent header injection in filenames. Range requests can support resumable downloads but require careful handling of partial content and validators.

Streaming reduces memory pressure but complicates error handling after headers are sent. Define what happens if the upstream source fails midstream. Do not buffer arbitrarily large responses in memory.

## Practice
Design an authenticated upload endpoint and a download endpoint with limits, scanning, storage isolation, and audit logging.
