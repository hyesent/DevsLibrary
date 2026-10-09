# Keyboard Access and Focus Management

> DevsLibrary · Web Accessibility · Lesson 10

## Keyboard is a baseline
Every interactive feature should be usable without a mouse or touch gesture. Test with Tab, Shift+Tab, Enter, Space, arrow keys where the widget convention requires them, Escape, and relevant shortcut keys. Native controls already implement many expected interactions.

A visible focus indicator is essential. Never remove `outline` without providing a clearly visible replacement. Focus must not be hidden behind sticky headers, cookie banners, or modal overlays.

## Logical order
Keyboard focus should follow a sensible sequence that reflects the content and task. Avoid positive `tabindex` values, which create a separate and brittle tab order. `tabindex="0"` can make a custom component reachable; `tabindex="-1"` can allow programmatic focus without adding it to normal tab order. Prefer native elements where possible.

## Focus versus selection
Focus indicates where keyboard input will go. Selection indicates a chosen item or text. Some composite widgets keep one tab stop and use arrow keys to move internally; this pattern must be implemented consistently with the widget's expected keyboard model.

## Test checklist
1. Start at the browser address bar or page start and tab through the interface.
2. Verify every interactive element can be reached and activated.
3. Verify focus is visible and not obscured.
4. Verify order is predictable.
5. Open and close overlays and inspect focus behavior.
6. Confirm there is no keyboard trap.

## Exercise
Complete a page's primary task using keyboard only. Record the exact keystrokes and any point where you cannot discover, activate, or escape a control.
