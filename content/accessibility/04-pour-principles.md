# The POUR Principles

> DevsLibrary · Web Accessibility · Lesson 04

## Perceivable
Information and interface components must be presentable to users in ways they can perceive. Examples include text alternatives for meaningful images, captions for prerecorded video, sufficient text contrast, and content that survives zoom and reflow.

## Operable
Users must be able to operate controls and navigate the interface. Examples include keyboard access, visible focus, adequate time, ways to avoid seizures, and navigation that does not require a pointer gesture alone.

## Understandable
Information and operation should be understandable. Use clear language, predictable behavior, identifiable errors, and labels or instructions that help users complete tasks.

## Robust
Content should work reliably with browsers and assistive technologies. Prefer native HTML semantics, valid and coherent structure, and established accessibility APIs. Custom widgets must expose their name, role, state, and value correctly.

## A feature can fail more than one principle
A button that is invisible to a screen reader may be a robustness issue; if its purpose is unclear, it may also be an understandable issue. The principles are a mental model, not four isolated teams or phases.

## Review technique
For a feature, write one question under each principle:
- Perceivable: What information could be missing from a user's available senses?
- Operable: What input methods must work?
- Understandable: What could be ambiguous or surprising?
- Robust: What semantics and platform APIs communicate the feature?

## Exercise
Evaluate a video player, dropdown, or shopping cart through all four principles. Record one potential failure and one test for each principle.
