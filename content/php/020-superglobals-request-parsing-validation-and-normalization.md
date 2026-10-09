# 020. Superglobals, Request Parsing, Validation, and Normalization

> Book: PHP · Level: beginner to advanced · Part 20 of 45

# Learning goals
- Treat incoming request data as untrusted.
- Separate parsing, validation, normalization, and business rules.
- Handle missing and malformed input explicitly.

`$_GET`, `$_POST`, `$_COOKIE`, `$_FILES`, `$_SERVER`, and `$_SESSION` expose request or runtime state. Their contents can be missing, malformed, attacker-controlled, or shaped differently than expected. Never assume a field exists just because the UI normally sends it.

A reliable boundary pipeline is: parse → validate type/shape → normalize representation → apply domain rules → authorize action → perform operation. Validation asks whether input is acceptable; normalization creates a canonical representation; authorization asks whether this actor may perform this action.

Avoid using `filter_input()` or a validation library as a magical universal security layer. Understand the accepted formats and failure values. Reject invalid IDs and quantities early, enforce maximum lengths and request sizes, and use allowlists for finite choices.

## Practice
Build a function that parses a page number from a query parameter. Handle missing, negative, array-shaped, nonnumeric, and excessively large values.
