---
title: "Dynamic Programming: State Design"
order: 17
book: "problem-solving"
---

Dynamic programming is useful when a problem has overlapping subproblems and a solution can be assembled from smaller results. The hardest part is often not writing the recurrence; it is choosing a state that preserves exactly the information future decisions need.

Suppose you want the maximum value obtainable from items with a weight limit. A state such as `best(i, capacity)` can mean the best value achievable using the first `i` items with the given remaining capacity. The state includes both how many items are available and the capacity because either can change the answer. Leaving out a relevant dimension merges problems that are not equivalent.

A disciplined derivation:
1. Define the subproblem in one precise sentence.
2. Identify the decision at the current step.
3. Express the result using smaller states.
4. Establish base cases.
5. Determine an evaluation order that ensures dependencies are already known.
6. Analyze state count and transitions per state.
7. Reconstruct a solution if the task asks for the actual choices, not just the optimum value.

Memoization evaluates states on demand; tabulation evaluates them in a planned order. Both rely on the same recurrence, but differ in memory and execution behavior. Space optimization is possible only when discarded states will never be needed again. In-place updates can accidentally reuse a state from the current iteration when the recurrence expects the previous iteration.

Dynamic programming does not mean “use a two-dimensional array.” It is a reasoning method. States can be tuples, bitmasks, intervals, subsets, or states in a graph. The complexity is roughly the number of reachable states multiplied by the work per state, which can still be exponential.

**Practice:** Define a state for counting ways to climb stairs when one may take 1, 2, or 3 steps but certain steps are blocked. Explain why the state must account for blocked positions and how you avoid counting the same path twice.

**Connection:** State design is relevant to scheduling, resource allocation, parsing, caching, and optimization problems.
