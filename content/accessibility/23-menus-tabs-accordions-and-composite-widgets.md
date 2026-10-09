# Menus, Tabs, Accordions, and Composite Widgets

> DevsLibrary · Web Accessibility · Lesson 23

## Prefer simple disclosure when possible
A group of ordinary navigation links usually works best as links in a navigation region, not as an ARIA application menu. Menus, tabs, tree views, and listboxes are specialized widgets with established keyboard conventions. Use them only when their interaction model genuinely fits.

## Accordions
A disclosure button should expose whether its panel is expanded, commonly with `aria-expanded`, and identify the panel when helpful. The button must work with keyboard input and preserve a logical reading order. Hidden content should not remain accidentally focusable.

## Tabs
Tabs typically expose tablist, tab, and tabpanel relationships. The implementation must decide whether arrow keys move focus, whether activation is automatic or manual, and how inactive panels are hidden. Follow a documented pattern consistently.

## Composite widget complexity
Some widgets use roving `tabindex` or `aria-activedescendant` so Tab enters the widget once and arrow keys navigate inside. State must be synchronized with the DOM and announced correctly. Avoid adding ARIA roles to native elements when the resulting behavior contradicts platform expectations.

## Exercise
Choose a tab or accordion pattern from the WAI-ARIA Authoring Practices Guide. Implement its keyboard model and compare your behavior with the pattern's documented expected interactions.
