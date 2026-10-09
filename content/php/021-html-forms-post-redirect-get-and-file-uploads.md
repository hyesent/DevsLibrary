# 021. HTML Forms, POST/Redirect/GET, and File Uploads

> Book: PHP · Level: beginner to advanced · Part 21 of 45

# Learning goals
- Process forms with server-side validation.
- Prevent accidental resubmission.
- Keep user feedback separate from trusted data.

For a form, render labels and appropriate input types, preserve safe values after validation failures, and display field-specific errors. Always validate server-side; browser validation improves usability but can be bypassed. Use POST for state-changing operations and consider the Post/Redirect/Get pattern after successful submissions.

A CSRF token helps bind a state-changing request to an expected user session. SameSite cookies are useful defense-in-depth, not a universal substitute for CSRF design. Rotate or invalidate tokens according to the framework or application threat model. Do not perform destructive actions through a simple GET link.

Uploads need explicit size limits, error handling, server-side filename generation, safe storage, content inspection, and authorization checks for later access.

## Practice
Implement a form that validates a title and body, redisplays errors safely, and redirects after success. Explain which checks belong in the browser and which must remain on the server.
