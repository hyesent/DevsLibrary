# Capstone: Audit, Repair, and Verify a Real Interface

> DevsLibrary · Web Accessibility · Lesson 36

## Goal
Apply the textbook to a small but complete user journey, such as account creation, catalog search, booking, checkout, or file upload. The objective is not to generate the longest issue list; it is to find meaningful barriers, fix them, and show evidence that the repair works.

## Phase 1: Scope
Define the journey, user tasks, pages and states, browsers, viewport sizes, input methods, and assistive technologies. Identify the standard version and conformance target relevant to the project. State limitations honestly.

## Phase 2: Baseline
Run an automated audit, inspect semantics and accessible names, complete the task with keyboard only, test zoom/reflow, review contrast and text alternatives, and test with assistive technology where available. Include success, empty, loading, and error states.

## Phase 3: Findings
Write reproducible defects with impact, evidence, affected criteria where relevant, severity, and a proposed fix. Prioritize blockers and high-impact issues in essential journeys.

## Phase 4: Remediation
Repair semantic HTML first where possible. Then address naming, focus, keyboard behavior, visual presentation, content, and dynamic announcements. Avoid adding ARIA as a substitute for correct native structure.

## Phase 5: Verification
Repeat the exact baseline steps. Add regression tests. Test related states and nearby components. Ask another reviewer to validate the repair where possible.

## Deliverables
1. Scope and test matrix.
2. Baseline findings.
3. Prioritized defect log.
4. Changed code or design.
5. Verification evidence.
6. Remaining risks and next steps.
7. A short reflection describing which testing methods found which issues.

## Evaluation rubric
- User impact is explained accurately.
- Reproduction steps are repeatable.
- Fixes use appropriate semantics and interaction patterns.
- Keyboard and focus behavior are verified.
- Screen-reader and responsive states are considered.
- Automated tools are used appropriately, not treated as proof.
- Remaining limitations are transparent.

## Extension
Perform a second pass using a different browser or assistive technology. Compare findings and update the testing strategy based on the gaps revealed.
