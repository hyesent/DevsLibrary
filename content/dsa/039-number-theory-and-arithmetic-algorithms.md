---
title: "Number theory and arithmetic algorithms"
order: 39
book: "dsa"
---

# Number theory and arithmetic algorithms

Algorithmic number theory includes divisibility, primes, gcd, modular arithmetic, and integer overflow reasoning. Euclid’s algorithm computes gcd(a,b) by repeatedly replacing (a,b) with (b,a mod b), taking logarithmic time in the magnitudes under the standard model.

## The core model

The sieve of Eratosthenes finds all primes up to n in O(n log log n) time and O(n) memory. Modular arithmetic keeps values bounded, but division modulo m is only valid when an inverse exists—typically when the divisor is coprime to m.

## How to reason about it

Exponentiation by squaring computes a^k in O(log k) multiplications. Use it for modular powers, but choose integer types that can safely hold intermediate products or use a safe multiplication strategy. For negative inputs, normalize remainders according to the language’s semantics.

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

Do not use floating-point math for exact integer boundaries without correction. Check overflow in a*b, handle gcd(0,0) according to the required contract, and remember that primality testing up to sqrt(n) is not practical for very large n.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement gcd, lcm with overflow-aware ordering, sieve, modular exponentiation, and a modular inverse using the extended Euclidean algorithm.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
