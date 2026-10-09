# The Accessibility Tree and Accessibility APIs

> DevsLibrary · Browser Internals · Lesson 17

## From DOM to accessibility representation
Browsers derive an accessibility tree or equivalent representation from the DOM, computed semantics, and state. Platform accessibility APIs expose information to assistive technologies. The accessibility tree is related to but not identical to the DOM: some nodes are ignored, names are computed, and roles and states may be transformed.

## Name, role, value, and state
Controls need programmatic names and roles, and interactive state must stay synchronized. Native HTML usually supplies expected semantics. ARIA can add or modify semantics but should not be used to patch every issue without understanding the accessible-name computation and role constraints.

## Hidden content
CSS visibility, `display: none`, the `hidden` attribute, `aria-hidden`, and off-screen positioning can affect rendering and accessibility exposure differently. Never place focusable descendants inside a subtree hidden from assistive technology. Test actual behavior rather than inferring it from a single attribute.

## Debugging
Inspect the browser's accessibility panel, then verify with representative assistive technology. A tree can reveal a missing name or incorrect state, but it cannot prove that a full workflow is understandable or pleasant to use.

## Exercise
Inspect a custom disclosure and a native button. Compare their roles, names, states, and keyboard behavior. Fix the custom component so its semantics and interaction are consistent.
