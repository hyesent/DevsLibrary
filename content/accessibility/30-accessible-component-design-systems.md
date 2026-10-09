# Accessible Component Libraries and Design Systems

> DevsLibrary · Web Accessibility · Lesson 30

## Make the accessible path the default
A component library can prevent repeated defects when it provides semantic markup, interaction behavior, focus styling, labels, state management, and documentation. But shared components do not guarantee an accessible product: teams can compose them incorrectly, override styles, or omit meaningful content.

## Component contracts
For each component, document:
- Intended use and when not to use it.
- Semantic structure and accessible name requirements.
- Keyboard interactions.
- States and state announcements.
- Focus behavior on open, close, error, and route change.
- Responsive and zoom expectations.
- Known limitations and supported environments.
- Automated and manual tests.

## Design tokens and theming
Include focus indicators, contrast-tested color pairs, motion preferences, typography scales, and target dimensions in the design system. Validate all themes, including high-contrast modes and user overrides. Avoid relying on color or animation alone to convey state.

## Governance
Require accessibility review for new patterns and breaking changes. Maintain a named owner, changelog, examples, and regression suite. If a component cannot be made accessible for a use case, document the limitation and offer a safer alternative.

## Exercise
Choose a button, dialog, or combobox from a component library. Write its contract and propose automated tests plus manual tests that verify its actual user experience.
