# Build an Accessibility Testing Strategy

> DevsLibrary · Web Accessibility · Lesson 27

## Use multiple layers
A reliable testing program combines:
1. **Automated checks** for detectable issues such as many missing names, some contrast failures, and invalid ARIA patterns.
2. **Manual code and design review** for semantics, content, responsive behavior, and interaction logic.
3. **Keyboard testing** for reachability, order, activation, and focus.
4. **Assistive-technology testing** for real announcements and workflows.
5. **User testing** with people who have relevant disabilities and access needs.

No single layer can replace the others.

## Test tasks, not just pages
A page may appear correct while a multi-step task fails. Test critical journeys such as search, registration, checkout, account recovery, file upload, and cancellation. Include success, empty, error, loading, and expired-session states.

## Define coverage
Choose representative browsers, operating systems, screen readers, viewport sizes, zoom levels, and input modes based on the audience and risk. Document the tested combinations and limitations. Do not claim universal compatibility from one environment.

## Regression tests
Automate stable, repeatable behavior such as accessible names, focus return, and error associations. Keep manual test cases for things automation cannot judge reliably. Add accessibility acceptance criteria to feature definition and release checks.

## Exercise
Create a test matrix for a checkout flow with at least two browsers, keyboard-only use, one screen reader, 200% zoom, and error recovery. Explain why each test adds distinct evidence.
