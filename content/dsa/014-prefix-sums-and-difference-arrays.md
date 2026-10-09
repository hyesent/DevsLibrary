---
title: "Prefix sums and difference arrays"
order: 14
book: "dsa"
---

# Prefix sums and difference arrays

A prefix sum stores cumulative totals so a range sum can be answered by subtracting two prefixes. With prefix[0]=0 and prefix[i+1]=prefix[i]+a[i], the half-open range [l,r) sums to prefix[r]-prefix[l]. Building prefixes is O(n), and each range query is O(1).

## The core model

The empty-prefix convention avoids special cases at index zero. Use a sufficiently wide numeric type to avoid overflow. Prefix sums also help count subarrays: if prefix[j]-prefix[i]=k, then prefix[i]=prefix[j]-k, so a frequency map can count earlier prefixes.

## How to reason about it

A difference array represents changes between adjacent positions. To add x to each element in inclusive range [l,r], add x at l and subtract x at r+1, then take a prefix sum. This turns many range updates into O(1) updates plus O(n) reconstruction.

Treat the representation and its invariant as the center of the design. First state what each variable, node, index, or state means. Then identify the operation that preserves that meaning. If the algorithm has repeated steps, explain why each step makes progress and why no valid answer is lost. For complexity, count the dominant operations and include storage that the implementation actually allocates.

A useful review checklist is:

1. What exact input and output contract is promised?
2. Which assumptions make this technique valid?
3. What invariant must remain true after each step?
4. What happens for empty, minimal, duplicate, extreme, or malformed inputs?
5. What is the worst-case time and auxiliary space, and which assumptions support the bound?
6. Is there a simpler reference implementation that can act as a correctness oracle?

## Worked reasoning pattern

Consider a small example and trace the state after every meaningful operation. Do not skip the transition that seems obvious: that is often where off-by-one, duplicate-handling, or invariant bugs hide. After the trace, explain why the same transition works for an arbitrary valid input rather than only for the chosen example.

When implementing in a real language, check integer width, recursion limits, collection semantics, mutation behavior, and library guarantees. Pseudocode can express the idea, but production correctness depends on language-specific details as well.

## Failure modes and trade-offs

Prefix sums do not magically solve arbitrary updates: changing one element affects all later prefixes unless a tree structure is used. Choose between static prefix arrays and dynamic range-query structures based on the update/query workload.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: range sums, count subarrays with sum k (including negative values), range increment updates, and two-dimensional prefix sums for rectangle queries.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
