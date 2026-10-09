# Automated Audits and Their Limitations

> DevsLibrary · Web Accessibility · Lesson 28

## What automated tools can find
Automated tools can identify many technical issues, including missing form labels, some empty links, certain contrast problems, invalid attributes, and structural patterns that deserve review. Run them during development and in continuous integration when possible.

## What they cannot reliably judge
Tools generally cannot decide whether alt text conveys the right meaning, whether instructions are understandable, whether focus order makes sense for a task, whether a dialog is comfortable to use, or whether a screen-reader announcement is useful. A passing scan means only that the tool found no issue within its rules and current view.

## False positives and false negatives
Review findings rather than blindly fixing or suppressing them. A contrast tool may need the real background behind transparent content; a dynamic component may not be present in the scanned state; a missing label may be supplied through another valid naming mechanism. Record a reason and evidence when a finding is not applicable.

## CI integration
Automated checks work best on representative pages and component states. Keep tests fast enough to run frequently, report actionable locations, and treat severe known failures as release blockers according to team policy. Do not let a green dashboard become a substitute for manual testing.

## Exercise
Run an automated audit on a sample page. Sort findings into confirmed failures, false positives, and issues requiring human review. Then list at least five important barriers that the tool cannot prove absent.
