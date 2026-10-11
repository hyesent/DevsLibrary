---
title: "The Real Shape of a Problem"
order: 1
book: "problem-solving"
---

A problem is not yet a solution waiting to be typed. It is a gap between a current state and a desired state, under constraints. The first task is to discover what that gap actually is.

Consider: “Make search faster.” This sounds actionable but hides several different problems. Is search slow because the database scans millions of rows, because the network is unreliable, because the UI blocks while rendering, or because users repeatedly search the same terms? Each cause suggests a different intervention. Optimizing the wrong layer can make code more complicated without improving the experience.

A useful problem statement names:
- **Actor:** who experiences the problem?
- **Goal:** what outcome do they need?
- **Current failure or cost:** what prevents that outcome?
- **Constraints:** what must remain true?
- **Evidence:** how will we recognize improvement?

For example: “For signed-in readers, opening a saved book should display the last-read page within 300 ms for 95% of opens, without losing progress when the network drops.” This is more useful than “improve the reader” because it gives the work a target and exposes reliability requirements.

Do not confuse a proposed solution with the problem. “Add Redis” is a solution hypothesis. “Repeated requests recalculate identical results and overload the database” is a causal description that can be tested. Treat proposed solutions as hypotheses until evidence supports them.

A practical first move is to rewrite a vague request as a testable outcome. Then list what is known, unknown, assumed, and forbidden. If a missing fact could change the design, investigate it rather than silently inventing an answer.

**Worked reasoning:** If users cannot submit a form, do not immediately rewrite validation. Reproduce the failure, inspect browser errors and network requests, determine whether the request is sent, and distinguish client validation, server validation, authorization, and persistence failures. The visible symptom is not necessarily the root cause.

**Practice:** Rewrite “make the app secure” as three testable problem statements for three different risks. State what evidence would show each risk is reduced.

**Connection:** This discipline feeds requirements engineering, system design, testing, and incident response. Better problem framing often saves more effort than faster implementation.
