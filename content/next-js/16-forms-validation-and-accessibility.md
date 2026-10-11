# Form Validation, Accessibility, and Feedback

A form must collect valid data and help users recover when something goes wrong. Native HTML semantics matter: associate each input with a visible label, use suitable input types and autocomplete, explain requirements, and connect error text to the relevant field. Color alone is not an error message.

Client-side validation improves usability but can be bypassed. Validate on the server, impose length and range limits, normalize values where appropriate, and enforce business rules. Validation and authorization are different: a valid submission can still be forbidden for the current user.

Show pending and success states. On failure, explain what to fix and preserve valid input when safe. Consider focusing an error summary or first invalid field without disrupting screen-reader users. Where supported, Server Action forms can progressively enhance submissions.

**Practice:** Design an accessible sign-up form with server validation and safe error messaging. Avoid account-enumeration leaks where the security model requires generic responses.
