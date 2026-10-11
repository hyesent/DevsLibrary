---
title: "Search, Pruning, and Constraint Solving"
order: 18
book: "problem-solving"
---

Search explores candidate solutions. Constraint solving narrows the search by using rules that candidates must satisfy. The key question is whether a partial candidate can still lead to a valid solution.

Backtracking builds a candidate one decision at a time. When a constraint is violated, it undoes the last decision and tries another. This is correct only if the pruning rule is safe: it must not discard a partial candidate that could lead to a valid answer.

Branch ordering can improve the time to find a solution without changing which solutions are possible. Choosing the most constrained variable first is often effective because contradictions appear earlier. This is a heuristic, not a universal guarantee.

Memoization can help when different search paths reach the same logical state. But state identity must be defined carefully: two partial paths are equivalent only if they leave the same relevant future choices. A poor key can either miss useful reuse or incorrectly merge distinct states.

For optimization, branch and bound maintains a current best solution and a bound on how good a branch could become. If the bound cannot beat the best known result, the branch can be discarded. The bound must be valid; an optimistic but invalid bound can cause the true optimum to be pruned.

Search complexity can grow exponentially. Before implementing it, estimate the candidate space, exploit symmetry, establish constraints early, and identify whether an approximation or a different formulation is acceptable. Adversarial inputs may intentionally trigger worst-case behavior.

**Practice:** Solve a small scheduling puzzle where tasks have dependencies and limited resources. Write the constraints, define a search state, choose a branching rule, and justify every pruning condition.

**Connection:** These techniques appear in DSA, compilers, configuration systems, scheduling, SAT/SMT solvers, and test generation.
