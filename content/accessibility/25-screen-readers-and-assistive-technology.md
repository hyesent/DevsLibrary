# Screen Readers and Assistive Technology

> DevsLibrary · Web Accessibility · Lesson 25

## Understand the access layer
A screen reader announces information exposed through the browser's accessibility APIs. It may offer navigation by headings, landmarks, links, form controls, tables, and other structures. Speech output varies by screen reader, browser, operating system, verbosity settings, and user preference.

Other tools include screen magnifiers, speech recognition, switch access, refreshable Braille displays, alternative keyboards, and reading overlays. A person may combine tools. Accessibility testing should not assume one standard configuration represents every user.

## Learn one workflow deeply
Start with a common task and navigate using headings, landmarks, links, form fields, and keyboard controls. Listen for names, roles, states, error messages, and unexpected focus changes. Do not try to memorize every key command at once; learn the essentials for your target platform and keep official vendor documentation nearby.

## Testing responsibly
Automated screen-reader scripts can be useful for repeatable checks but cannot represent the full range of human interaction. When possible, include disabled users in usability testing and compensate participants appropriately. Do not ask a disabled colleague to be the sole accessibility reviewer.

## Exercise
With a screen reader available, complete a search or checkout task. Record the sequence of announcements and identify any missing label, confusing structure, redundant announcement, or focus problem. If no screen reader is available, use the browser accessibility tree as a preliminary inspection, not as a substitute for future assistive-technology testing.
