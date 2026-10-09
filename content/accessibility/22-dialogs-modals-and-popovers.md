# Dialogs, Modals, and Popovers

> DevsLibrary · Web Accessibility · Lesson 22

## A dialog is an interaction contract
A modal dialog temporarily makes the rest of the page unavailable. It needs a clear accessible name, an intentional initial focus target, a contained focus sequence while modal, a reliable close mechanism, and a sensible focus return destination. Escape behavior should match the dialog's purpose and user expectations.

Native `<dialog>` with `showModal()` can provide useful built-in behavior in supported browsers, but it still needs correct naming, content structure, close controls, focus testing, and appropriate fallback decisions. A custom overlay must implement the entire interaction pattern.

## Focus sequence
When opened, move focus into the dialog. Keep keyboard focus within a true modal while it is open. When closed, return focus to the trigger unless that element no longer exists or another destination is more logical. Ensure the dialog is not visually covered or clipped at high zoom.

## Popovers and non-modal panels
A non-modal popover should not unnecessarily trap focus or make the rest of the page inert. Distinguish a disclosure, menu, listbox, tooltip, and dialog; each has different semantics and keyboard expectations.

## Exercise
Build a confirmation dialog. Test keyboard open, initial focus, Tab and Shift+Tab, Escape, the close button, clicking outside if supported, and focus return after both confirm and cancel.
