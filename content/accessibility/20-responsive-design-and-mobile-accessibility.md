# Responsive and Mobile Accessibility

> DevsLibrary · Web Accessibility · Lesson 20

## Small screens reveal structural problems
A responsive page must remain usable at enlarged text, narrow viewport widths, landscape orientation, and different input modes. Avoid requiring a particular orientation unless essential. Ensure content order remains meaningful when columns collapse and that sticky controls do not obscure focused elements.

## Touch, gestures, and alternatives
Do not make a complex path gesture the only way to perform an action. Provide a simple alternative such as a button. Dragging operations may need a non-drag alternative under WCAG 2.2. Touch target size and spacing matter, especially for controls used on the move.

## Device capabilities
Mobile users may use screen readers, switch access, voice control, external keyboards, zoom, or system text scaling. Test more than a simulated desktop viewport. Native HTML controls often adapt better to varied input modes than custom controls.

## Exercise
Complete a core task on a narrow screen with touch, then with an external keyboard or screen reader if available. Record any control that is obscured, too small, gesture-dependent, or difficult to identify.
