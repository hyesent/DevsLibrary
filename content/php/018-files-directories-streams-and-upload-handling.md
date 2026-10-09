# 018. Files, Directories, Streams, and Upload Handling

> Book: PHP · Level: beginner to advanced · Part 18 of 45

# Learning goals
- Read and write files safely.
- Understand stream-oriented I/O.
- Validate uploads and avoid path traversal.

PHP offers file functions such as `file_get_contents`, `file_put_contents`, `fopen`, `fread`, and `stream_get_contents`. Handle failures explicitly; filesystem operations can fail because of permissions, missing paths, disk exhaustion, or concurrent changes. Use locking or atomic-write strategies when concurrent writers matter.

Never trust a client-provided filename or path. Normalize and constrain paths to an intended storage root, and prevent `../` traversal. For uploads, check upload error codes, enforce size limits, verify content using appropriate server-side inspection, generate a server-side filename, store outside the public web root when possible, and control retrieval through authorization. MIME type and extension alone are not proof of safe content.

Temporary files should be cleaned up. Avoid placing secrets or executable uploads in web-accessible directories. Consider streaming large files rather than loading them all into memory.

## Practice
Implement a bounded text-file import with clear error handling. Design an upload flow that prevents users from choosing arbitrary server paths.
