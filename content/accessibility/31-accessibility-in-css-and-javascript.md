# Accessibility in CSS and JavaScript

> DevsLibrary · Web Accessibility · Lesson 31

## CSS can affect access
CSS can hide content, reorder it visually, remove focus indicators, clip zoomed text, or make state distinctions imperceptible. Use visual order that remains consistent with the DOM, support user text spacing, and avoid fixed-height containers around variable content.

`display: none` and the `hidden` attribute remove content from rendering and usually from the accessibility tree. Other hiding techniques behave differently. Use a well-tested visually-hidden utility when content should be available to assistive technology but not displayed, and ensure it does not hide focusable content accidentally.

## JavaScript must preserve interaction
When JavaScript creates controls, it must preserve semantic elements, accessible names, keyboard behavior, focus, and state. Update `aria-expanded`, `aria-selected`, and similar states when the UI changes. Avoid replacing a focused element in a way that unexpectedly sends focus to the document body.

## Progressive enhancement
Core information and key tasks should remain as resilient as practical when scripts fail, load slowly, or run in constrained environments. A no-JavaScript experience is not always feasible, but loading and failure states must be communicated and recoverable.

## Exercise
Inspect a component's CSS and JavaScript. Identify any hidden content, focus manipulation, dynamic state, event handling, and DOM replacement. Add tests for the accessibility behavior rather than only the visual output.
