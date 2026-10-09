# ARIA: Principles and Common Antipatterns

> DevsLibrary · Web Accessibility · Lesson 24

## The first rule of ARIA
When a suitable native HTML element exists, prefer it. Native elements already provide semantics and interaction behavior. ARIA can add accessible names, states, and relationships, but generally does not add keyboard behavior or visual styling.

## Common mistakes
- Assigning `role="button"` to a clickable `<div>` without keyboard support.
- Using `aria-label` that contradicts visible text.
- Adding `aria-live` to huge regions, causing excessive announcements.
- Applying `aria-hidden="true"` to an element that still contains focusable controls.
- Using a role on an element that prohibits or changes its native semantics.
- Using ARIA states without updating them when the UI changes.
- Marking decorative content hidden while also hiding useful instructions.

## Inspect the accessibility tree
Browser accessibility inspectors show how the browser exposes names, roles, states, and relationships. This is useful, but the tree alone cannot prove the interface is usable. Pair inspection with keyboard and assistive-technology testing.

## ARIA Authoring Practices
For custom widgets, consult the official WAI-ARIA Authoring Practices Guide for a pattern's roles, states, keyboard interactions, and examples. It is implementation guidance, not a substitute for understanding the user's task or testing real browsers.

## Exercise
Audit a component that uses ARIA. For every attribute, explain the user-facing purpose and how its value changes. Remove any attribute that does not solve a defined problem.
