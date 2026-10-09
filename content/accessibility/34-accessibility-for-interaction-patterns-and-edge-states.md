# Interaction Patterns and Edge States

> DevsLibrary · Web Accessibility · Lesson 34

## Test beyond the default screen
Accessibility defects often appear in less common states: no results, expired sessions, permission denied, slow network, validation failure, empty data, loading skeletons, and destructive-action confirmation. Include these states in design and QA.

## Tables, filters, sorting, and pagination
Expose the current sort direction and selected filters in a way assistive technology can understand. Keep focus stable after updates, provide useful result counts, and ensure pagination controls have names that distinguish destinations. Do not rely on icon direction or color alone.

## Toasts and notifications
A toast should not disappear before a user can perceive and act on it. Critical information may need to persist in the page. A notification that contains an action must be keyboard accessible and not steal focus unexpectedly. Avoid announcing redundant updates.

## Dragging and gestures
Offer non-drag alternatives for drag-and-drop operations when applicable, such as move-up/down buttons or a menu of destinations. For gesture-based actions, provide simple controls and avoid making a complex gesture the sole path.

## Exercise
Create a state inventory for a file upload widget. Include idle, selecting, uploading, progress, success, failure, cancel, retry, and unsupported-file states. For each, define visual and assistive-technology feedback.
