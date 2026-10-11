---
title: "Algorithmic Strategies and When They Fit"
order: 10
book: "problem-solving"
---

An algorithmic strategy is a reusable way to search the solution space. Strategies are not magic recipes: each depends on structural properties that must be established before use.

- **Brute force:** enumerate possibilities; excellent as a baseline or when the search space is small.
- **Divide and conquer:** split a problem into independent smaller problems, solve them, and combine results. Merge sort works because sorted halves can be merged efficiently.
- **Greedy:** choose a locally attractive option and continue. Correctness usually requires a property such as an exchange argument or a matroid structure; intuition alone is insufficient.
- **Dynamic programming:** solve overlapping subproblems while preserving enough state to make future decisions. The state must capture all information relevant to the remaining problem.
- **Backtracking:** construct candidates incrementally, abandoning partial candidates that cannot lead to valid solutions.
- **Branch and bound:** prune candidates using bounds on the best result they could achieve.
- **Binary search:** repeatedly eliminate half a search interval when a monotonic predicate or ordering supports that elimination.
- **Hash-based methods:** trade memory and hashing assumptions for fast membership or lookup.
- **Graph traversal:** explore relationships using BFS, DFS, or weighted-path algorithms chosen to match edge semantics.

Before selecting a strategy, identify the problem's structure. Are decisions independent? Do subproblems overlap? Is there an ordering? Can a partial solution be rejected safely? Is the objective monotonic? Are edge weights nonnegative? These questions determine whether a strategy's assumptions hold.

Two strategies may solve the same problem with different costs or guarantees. For shortest paths, BFS is appropriate when every edge has equal cost; Dijkstra handles nonnegative weights; negative edges require other reasoning. Choosing by familiar name instead of assumptions creates subtle wrong answers.

**Practice:** For scheduling tasks with deadlines and profits, propose a greedy strategy, then search for a counterexample. Determine what additional structural conditions would make the strategy valid.

**Connection:** Strategy selection is the bridge to DSA. The important skill is recognizing and verifying structure, not memorizing a pattern name.
