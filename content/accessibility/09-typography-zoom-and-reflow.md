# Typography, Zoom, Reflow, and Text Spacing

> DevsLibrary · Web Accessibility · Lesson 09

## Text must adapt
Users may zoom the page, enlarge default text, change fonts, increase line spacing, or apply custom styles. Layouts that depend on fixed heights, clipped overflow, or text baked into images can hide content or make controls unusable.

Use relative units where suitable, allow containers to grow, and avoid disabling browser zoom. Test at 200% text resize and at high browser zoom. For WCAG reflow testing, check narrow effective viewport widths—commonly equivalent to 320 CSS pixels for vertically scrolling content—without requiring two-dimensional scrolling except where the content genuinely requires it, such as some complex data tables or maps.

## Text spacing
A robust layout should tolerate user overrides for line height, paragraph spacing, letter spacing, and word spacing without loss of content or functionality. Do not use fixed line-height containers that cut off descenders or additional lines.

## Typography and comprehension
Choose readable font sizes, line lengths, and hierarchy. Avoid long blocks of uppercase text, excessive italics, and overly tight line spacing. Plain language helps many users, though the appropriate vocabulary depends on the audience.

## Exercise
Use browser zoom and a user stylesheet or devtools overrides to enlarge text and spacing. Capture every clipped label, overlapping component, lost button, and horizontal scroll area, then repair the layout.
