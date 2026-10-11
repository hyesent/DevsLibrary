---
title: "Assumptions, Constraints, and Unknowns"
order: 3
book: "problem-solving"
---

Every solution depends on facts. Some facts are verified, some are assumed, and some are unknown. Treating all three as equally certain is a common source of brittle systems.

A **constraint** is a condition the solution must obey: “must run in the browser,” “must preserve existing URLs,” or “must not expose another user's records.” An **assumption** is something temporarily believed: “the list usually contains fewer than 100 items.” An **unknown** is something not yet established: “we do not know the largest real list.” A **risk** is an uncertain event that could materially harm the outcome.

Write assumptions down when changing them would alter the design. Then test the assumptions with the cheapest credible evidence. A quick measurement may reveal that the supposed bottleneck is not the bottleneck. A short interview may reveal that “offline support” means reading cached content, not editing it.

Constraints can conflict. A system cannot always maximize consistency, availability, latency, cost, and simplicity simultaneously. When requirements conflict, make the trade-off explicit instead of promising all properties without qualification.

Use sensitivity analysis: ask which assumptions matter most. If the solution works whether a list has 50 or 500 items, the exact typical size may not matter. If memory usage grows quadratically, the upper bound matters enormously. Spend investigation effort on uncertainties that can change the decision.

A helpful risk register is small:
- assumption or unknown;
- consequence if wrong;
- likelihood or confidence;
- cheapest useful experiment;
- decision deadline.

Avoid fake precision. “There is a 73% chance this will fail” is not useful if it is unsupported. A qualitative ranking such as high, medium, and low can be sufficient when accompanied by a reason.

**Practice:** You are asked to import a CSV file. List assumptions about file size, encoding, malformed rows, duplicate records, and privacy. Which should be validated before implementation, and which can be handled by explicit limits?

**Connection:** This approach supports architecture decisions, estimation, incident prevention, and technical discovery.
