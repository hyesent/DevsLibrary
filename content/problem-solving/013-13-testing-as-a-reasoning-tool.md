---
title: "Testing as a Reasoning Tool"
order: 13
book: "problem-solving"
---

Tests are executable claims about behavior. Their greatest value is not merely reporting that code failed; it is making assumptions explicit and preserving them as the system changes.

A layered strategy includes:
- **Unit tests** for small behavior and edge cases.
- **Property-based tests** for general laws across generated inputs.
- **Integration tests** for boundaries such as database or network interactions.
- **End-to-end tests** for important user journeys.
- **Performance and load tests** for resource behavior.
- **Security tests** for authorization boundaries and hostile input.

Test behavior, not private implementation details. A test that asserts a function calls a helper exactly three times can break during a harmless refactor. A test that asserts the correct output and side effects protects the contract.

Properties are especially powerful. A sorting function should preserve the input elements and produce an ordered result. Sorting an already sorted list should produce the same result. Reversing twice should recover the original sequence if that is the defined operation. Property-based tools generate many cases that humans may not think to write.

Use differential testing when possible: compare an optimized algorithm with a simple trusted implementation. Use metamorphic testing when exact outputs are hard to know but relationships between outputs are known. For example, adding an irrelevant field should not change an authorization decision.

A good failure message points toward the violated claim. Include the relevant input, expected behavior, actual behavior, and context without leaking secrets. Keep tests deterministic where possible; for time, randomness, and external services, inject controllable dependencies or use explicit fixtures.

A passing test suite cannot prove the absence of bugs. Coverage measures which code ran, not whether the assertions were meaningful. Tests complement review, contracts, threat modeling, and monitoring.

**Practice:** Write properties for a function that normalizes email addresses. Be careful: case folding and provider-specific transformations are policy decisions, not universal truths.

**Connection:** Testing turns reasoning into repeatable feedback and supports refactoring, debugging, and release confidence.
