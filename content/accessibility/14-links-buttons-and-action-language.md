# Links, Buttons, and Clear Action Language

> DevsLibrary · Web Accessibility · Lesson 14

## Navigation or action?
Use a link when activating it navigates to a resource or location. Use a button when it performs an action in the current interface, such as opening a dialog, submitting a form, or toggling a setting. This distinction informs browser behavior, keyboard activation, context menus, and assistive technology output.

## Link text
Link text should make sense in context. Repeated “click here” or “read more” links can be difficult when encountered in a list of links. If a visual design requires a generic visible phrase, accessible naming can include the relevant item title, but do not create hidden, contradictory names.

## Button behavior
Specify `type="button"` for non-submit buttons inside forms when accidental submission is not intended. Use `type="submit"` for the form's submit action. Native disabled controls are not keyboard-focusable; if an action must remain discoverable while unavailable, consider whether explanatory text or an alternate design is more useful than a disabled control alone.

## Target size
Touch and pointer targets should be large enough and sufficiently separated for users with limited dexterity. WCAG 2.2 includes a minimum target-size criterion with defined exceptions; check the actual standard and the target's context. Larger targets are generally more comfortable even when an exception applies.

## Exercise
Review every link and button on a page. For each, document purpose, expected behavior, accessible name, keyboard activation, and whether the target is comfortable to use on a touch screen.
