# WCAG: Structure, Levels, and Conformance

> DevsLibrary · Web Accessibility · Lesson 03

## What WCAG provides
The Web Content Accessibility Guidelines (WCAG) are a widely used technical standard for web content. They organize requirements under four principles: Perceivable, Operable, Understandable, and Robust—often abbreviated POUR. Success criteria are assigned levels A, AA, or AAA. Many policies and procurement requirements reference WCAG 2.1 or 2.2 Level AA, but applicable requirements depend on jurisdiction, contract, and product context.

Use the current official WCAG documents when making conformance claims. A version's success criteria and supporting techniques can change; never rely solely on an old checklist.

## Conformance is not a badge
A conformance claim applies to a defined page, process, or set of pages and requires all applicable criteria at the claimed level to be met, subject to the standard's conformance requirements. A few successful automated scans do not establish conformance. Third-party widgets, authentication steps, error states, and alternative views can also matter.

## How to use criteria in engineering
Translate a criterion into a user outcome, an observable test, and an implementation requirement. For example, keyboard operability becomes: “Every action can be reached and activated without a pointer; focus remains visible; no interaction traps the user.” Keep the source criterion linked in issue tracking so a future reviewer can verify interpretation.

## Levels
- **A** addresses fundamental barriers.
- **AA** adds important requirements commonly used as a practical target.
- **AAA** includes stricter requirements that may not be achievable for every kind of content or site-wide.

Do not interpret AAA as irrelevant, nor assume AA makes every user experience excellent.

## Exercise
Select three WCAG success criteria from the official standard. For each, write a plain-language user impact, a reproducible test, and a potential fix. Keep criteria wording and version references accurate by checking the official documentation.
