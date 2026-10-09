# Practical Accessibility Review Checklists

> DevsLibrary · Web Accessibility · Lesson 37

## Design review
- Content purpose and user task are clear.
- Heading structure and landmarks are planned.
- Color is not the only carrier of meaning.
- Contrast and focus appearance are considered for every state.
- Motion has a purpose and respects reduced-motion preferences.
- Text can grow and reflow without clipping.
- Targets and gestures support varied input methods.
- Error prevention and recovery are designed.

## Development review
- Native semantic HTML is used where possible.
- Every control has an accessible name and correct role/state.
- All actions work with keyboard input.
- Focus order, visibility, and return behavior are intentional.
- Forms have labels, instructions, and associated errors.
- Dynamic changes are communicated without excessive announcements.
- Hidden content and focusable descendants are handled correctly.
- ARIA is justified and states stay synchronized.

## QA review
- Automated audit findings have been reviewed.
- Keyboard-only task completion succeeds.
- Zoom and reflow have been tested.
- Images, media, tables, and charts have meaningful alternatives.
- Loading, empty, success, and error states have been checked.
- Representative screen-reader workflows have been tested.
- Third-party integrations and embedded content have been checked.
- Defects have owners, priorities, and regression coverage.

## Important limitation
A checklist helps teams remember recurring concerns. It cannot prove accessibility in isolation. A real user task, context, and assistive-technology behavior must still be considered.

## Exercise
Adapt these lists to your own product. For every checklist item, identify the person responsible and the evidence that would demonstrate it was checked.
