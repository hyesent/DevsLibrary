# 006. JSON: Syntax, Data Modeling, and Interoperability

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 6 of 30

## Learning goals
- Produce valid JSON and design stable JSON shapes.
- Understand JSON's data model and edge cases.
- Handle parsing errors explicitly.

JSON supports objects, arrays, strings, numbers, booleans, and null. It does not natively represent dates, binary blobs, undefined values, or arbitrary precision decimal numbers. APIs must document how such values are encoded. For example, timestamps may use a defined ISO 8601 profile; money may use integer minor units or a documented decimal-string format.

Keep object keys stable and define whether unknown fields are ignored or rejected. Distinguish a missing property from a property explicitly set to null when the contract needs that distinction. Do not depend on object key order. Numbers beyond interoperable precision ranges can be problematic in JavaScript clients, so identifiers are often safer as strings if they can exceed safe integer ranges.

Validate the parsed value against a schema or explicit rules. Syntax validity is not semantic validity. Set body size limits before parsing and handle malformed input without exposing parser internals.

## Example
```json
{
  "id": "ord_01HXYZ",
  "status": "pending",
  "totalMinor": 2599,
  "currency": "NGN"
}
```

## Practice
Design JSON representations for a user profile, a paginated list, a monetary amount, and a validation error. State which fields are nullable and which may be omitted.
