---
title: "Recursion and the call stack"
order: 10
book: "dsa"
---

# Recursion and the call stack

Recursion solves a problem by calling the same procedure on smaller subproblems. Every recursive design needs a base case, progress toward that base case, and a combination step. The call stack stores frames such as local variables, parameters, and return locations.

## The core model

Trace recursive calls as a tree. Identify overlapping subproblems, independent subproblems, and the depth of the deepest path. A recurrence such as T(n)=T(n-1)+O(1) yields linear work and linear stack depth; branching recurrences can grow exponentially unless work is reused or partitioned efficiently.

## How to reason about it

Tail recursion makes the recursive call the final operation, but many language runtimes do not guarantee tail-call elimination. Deep recursion can overflow the stack. An iterative equivalent may use an explicit stack and offer clearer control over memory and traversal order.

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

Do not confuse recursion with backtracking: recursion is a control technique; backtracking explores choices and undoes them. A recursive function can also be a simple divide-and-conquer algorithm with no undo step.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: trace factorial and tree traversal, convert recursive depth-first search to an explicit stack, and identify the base case and progress measure in a recursive parser.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
