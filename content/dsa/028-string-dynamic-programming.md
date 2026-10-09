---
title: "String dynamic programming"
order: 28
book: "dsa"
---

# String dynamic programming

String DP commonly uses states over prefixes or suffixes of strings. Longest common subsequence (LCS), edit distance, palindrome subsequences, and wildcard matching all compare choices at positions i and j.

## The core model

For LCS, dp[i][j] can mean the LCS length of prefixes of lengths i and j. If final characters match, extend the diagonal state; otherwise take the maximum of dropping one character from either prefix. Edit distance adds insertion, deletion, and substitution costs, with initialization representing edits against an empty string.

## How to reason about it

Table direction follows dependencies. To reconstruct an actual subsequence or edit script, store decisions or walk backward through the table. Rolling rows reduces memory when only the length is needed, but reconstruction may require more storage or a divide-and-conquer technique.

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

Index confusion is common when arrays are zero-based but DP lengths are one-based. Use a zero row and column to represent empty prefixes and write down the exact meaning of dp[i][j].

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: compute LCS, edit distance, longest palindromic subsequence, and explain the difference between subsequence and substring.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
