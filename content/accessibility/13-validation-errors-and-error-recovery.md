# Validation, Errors, and Recovery

> DevsLibrary · Web Accessibility · Lesson 13

## Make errors perceivable and actionable
When a form fails, identify the field, explain the problem in text, and describe how to correct it. Do not merely highlight a border. Preserve valid values and avoid clearing the entire form after one mistake.

A field-level error can be associated through `aria-describedby` and the field can use `aria-invalid="true"` when invalid. The error message should be present in the DOM and connected to the control. Do not set `aria-invalid` preemptively before a value has been evaluated unless the interaction genuinely warrants it.

## Error summaries
For longer forms, provide an error summary near the beginning, with links to invalid fields. Give the summary a clear heading and move focus to it after submission when appropriate. Ensure the links and inline messages agree.

## Timing and dynamic validation
Avoid announcing an error on every keystroke if that makes input frustrating. Validate at a suitable point, such as blur or submit, depending on the task. For dynamic status updates, use a restrained live region where needed and do not flood screen readers with repeated announcements.

## Security and privacy
Error messages should help users without exposing secrets or internal system details. Do not reveal whether a particular account exists in sensitive authentication flows if that would enable account enumeration.

## Exercise
Implement a form that has an error summary, inline messages, and preserved values. Test keyboard focus after invalid submission and verify that each message is associated with its field.
