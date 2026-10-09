# Standards, Specifications, and Implementation Reality

> DevsLibrary · Browser Internals · Lesson 30

## Standards describe behavior, implementations ship it
HTML, CSS, ECMAScript, Fetch, HTTP, and other specifications define platform behavior. Browser engines implement those standards over time, sometimes with differences, bugs, flags, or incomplete support. Vendor documentation and compatibility databases can help, but test critical assumptions.

## Normative and informative material
A specification may contain normative requirements, examples, notes, and explanatory sections. Distinguish what the standard requires from a common implementation strategy. A tutorial may simplify details for teaching, so consult the primary specification when edge behavior matters.

## Standards evolve
Specifications can change through drafts, implementation feedback, and new releases. Avoid building product logic on a temporary browser quirk unless the workaround is isolated and documented.

## Practical source hierarchy
For a technical question, start with the relevant official specification or standards project, then consult browser documentation and compatibility data, then reproduce behavior in a minimal test. File a bug when a reproducible discrepancy appears to be an engine defect.

## Exercise
Find one browser behavior in the textbook and locate its official specification section. Write a short note distinguishing the specified behavior from any observed browser-specific variation.
