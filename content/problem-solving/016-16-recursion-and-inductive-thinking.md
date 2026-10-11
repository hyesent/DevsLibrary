---
title: "Recursion and Inductive Thinking"
order: 16
book: "problem-solving"
---

Recursion solves a problem by reducing it to smaller instances of the same problem. Its correctness depends on a clear base case and a reduction that makes measurable progress.

For a recursive function, ask:
1. What is the smallest input I can solve directly?
2. How does a larger instance become a smaller one?
3. What does the recursive call guarantee?
4. How does that guarantee help solve the original instance?
5. Why must the process eventually reach a base case?

For example, summing a list can be defined as zero for an empty list, and otherwise the first element plus the sum of the remaining list. This is elegant mathematically, but a language's call-stack limit may make a recursive implementation unsuitable for a very long list. A mathematically valid definition does not automatically imply a safe implementation.

Recursion can be direct or mutual, and the recursive structure may follow a tree, graph, grammar, or divide-and-conquer decomposition. Graph traversal must track visited nodes when cycles are possible; otherwise recursion can continue indefinitely.

Memoization avoids recalculating identical subproblems, but only when the cache key captures all relevant state. If a function depends on both position and remaining capacity, caching by position alone can mix distinct subproblems and return incorrect results.

Induction is a proof technique closely related to recursion. Show the base case, then show that if the claim holds for smaller instances, it holds for the next instance. This explains why recursive algorithms can be reasoned about systematically rather than treated as mysterious self-calls.

**Practice:** Design recursive and iterative approaches to traversing a nested folder tree. Discuss maximum depth, cycles or symbolic links, and how errors should be reported.

**Connection:** Recursion supports tree algorithms, parsers, backtracking, dynamic programming, and inductive correctness proofs.
