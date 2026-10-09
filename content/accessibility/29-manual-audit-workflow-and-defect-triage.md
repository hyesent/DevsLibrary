# Manual Audits, Evidence, and Defect Triage

> DevsLibrary · Web Accessibility · Lesson 29

## Make defects reproducible
A useful accessibility issue includes:
- Affected page, component, and state.
- User impact and barrier.
- Preconditions and exact reproduction steps.
- Expected behavior and actual behavior.
- Relevant standard criterion, if applicable.
- Browser, assistive technology, and input method tested.
- Evidence such as screenshots, recordings, or accessibility-tree details, handled with privacy care.
- Suggested remediation and regression test.

## Prioritize by impact
Consider how many users are blocked, how essential the task is, whether a workaround exists, and how widespread the defect is. A failure that prevents checkout or account recovery is usually more urgent than a minor inconsistency on a low-value page. Avoid ranking only by how easy a fix is.

## Verify the repair
Reproduce the original defect, apply the fix, rerun the same steps, and test nearby states. Confirm that the change did not introduce a keyboard, screen-reader, responsive, or visual regression. Close an issue only with evidence.

## Exercise
Write a high-quality bug report for a keyboard trap in a modal. Include steps, expected and actual behavior, user impact, environment, likely fix, and a regression test.
