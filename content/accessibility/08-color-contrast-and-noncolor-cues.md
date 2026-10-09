# Color, Contrast, and Non-Color Cues

> DevsLibrary · Web Accessibility · Lesson 08

## Color must not carry meaning alone
If errors are shown only in red, users who cannot distinguish that color may miss them. Pair color with text, an icon that has a text alternative, shape, pattern, or another clear indicator. The same applies to required fields, chart series, selected states, and status labels.

## Contrast basics
Contrast is the relative luminance difference between foreground and background. WCAG contrast requirements distinguish normal text, large text, and non-text interface components. The familiar WCAG 2.x AA thresholds are 4.5:1 for normal text and 3:1 for large text; important graphical objects and visual states have separate non-text contrast requirements. Check the applicable criterion and definition rather than applying one number to every situation.

Logos and some other content have exceptions in the standard, but exceptions should not be used as a design shortcut.

## Real-world testing
Measure contrast for actual rendered colors, including hover, focus, disabled, placeholder, error, and dark-mode states. Gradients, transparency, images behind text, and dynamic themes can change effective contrast. Thin fonts and antialiasing can make text harder to read even when a calculator reports a passing ratio.

## Design tokens
Use tested color tokens rather than selecting arbitrary colors per component. A design system should document foreground/background pairings and state variants. Recheck all pairings when tokens change.

## Exercise
Audit a page's text, borders, icons, charts, and focus indicators. Record the foreground and background colors, ratio, relevant requirement, and a fix for each failure.
