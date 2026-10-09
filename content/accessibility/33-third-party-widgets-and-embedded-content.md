# Third-Party Widgets and Embedded Content

> DevsLibrary · Web Accessibility · Lesson 33

## A dependency can become your barrier
Maps, chat widgets, payment processors, video players, identity providers, and advertising tools can introduce inaccessible controls or unexpected focus behavior. A vendor's statement that a product is accessible is useful evidence, but it does not replace testing the integration and the exact configuration you deploy.

## Integration checks
Verify keyboard entry and exit, accessible names, focus order, iframe titles, loading and error states, contrast, responsive behavior, and screen-reader announcements. Confirm that consent controls and overlays do not obscure focused content.

## Ownership and fallback
Document vendor versions, known issues, escalation routes, and fallback options. Keep critical user tasks possible if a widget fails. When the third-party code cannot be changed, work with the vendor, provide a genuinely equivalent alternative, and record the remaining user impact. An alternative should not force users into a slower or less secure path without reason.

## Exercise
Choose a third-party widget in a product. Write an integration test plan and identify who owns remediation if a defect is found.
