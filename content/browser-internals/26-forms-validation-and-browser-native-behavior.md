# Forms, Validation, and Native Browser Behavior

> DevsLibrary · Browser Internals · Lesson 26

## Native form behavior
HTML forms provide built-in submission, constraint validation, labels, autofill integration, and browser-specific input behavior. Native validation can be a useful baseline, but messages and focus behavior vary by browser and may not meet every product need.

## Constraint validation
Attributes such as `required`, `min`, `max`, `pattern`, and input types define constraints. Client-side validation improves feedback but is not a security boundary; the server must validate independently. Never trust browser-submitted values simply because native validation passed.

## Autofill and password managers
Correct `autocomplete` tokens and input semantics improve autofill. Do not disable autofill or paste by default. If a form uses custom controls, verify that labels, values, and keyboard operation remain correct.

## Submission and navigation
Submitting a form may navigate, update history, or trigger client-side handling. Prevent duplicate submissions, communicate progress, and handle server errors while preserving user input. A disabled submit button alone may not explain why submission is unavailable.

## Exercise
Create a form using native constraints, then add custom error handling. Compare the behavior and ensure server-side validation remains authoritative.
