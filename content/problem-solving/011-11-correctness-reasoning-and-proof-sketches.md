---
title: "Correctness Reasoning and Proof Sketches"
order: 11
book: "problem-solving"
---

A program that works on a few examples is not necessarily correct. Correctness reasoning asks why the method works for every input allowed by its contract.

A useful proof sketch has three parts:
1. **Initialization:** the required property holds before the algorithm's main loop or recursion.
2. **Maintenance:** each step preserves the property.
3. **Termination:** the algorithm finishes, and the final property implies the required result.

For binary search, the invariant can be that if a target exists, it remains within the current search interval. Each comparison eliminates a portion that cannot contain the target, provided the input is sorted and the interval updates are correct. Termination occurs when the interval is empty or the target is found. This proof exposes why sorted input is not optional and why off-by-one errors matter.

For recursion, identify the base case, the progress toward it, and the relationship between the smaller result and the full result. A recursive function that does not make progress can recurse forever. A function that omits a base case for an allowed input is incomplete.

For greedy algorithms, local plausibility is not proof. An exchange argument shows that an optimal solution can be transformed to include the greedy choice without worsening the result. If no such argument is available, search for counterexamples or use a different method.

Correctness includes more than the normal return value. Consider errors, mutation, side effects, concurrency, and resource exhaustion if these are part of the contract. A method can calculate the right answer and still violate correctness by leaking another user's data.

Formal proof is not always required in day-to-day work. The habit of stating invariants and explaining why each step preserves them often catches defects early.

**Practice:** Explain why a loop that removes every matching item from a list remains correct when adjacent elements match. State the invariant before and after each iteration.

**Connection:** Proof sketches improve code review, testing, algorithm design, and confidence in security-critical rules.
