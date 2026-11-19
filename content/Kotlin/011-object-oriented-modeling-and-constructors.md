# 011. Object-oriented modeling and constructors

## Learning objectives

By the end of this lesson, you should be able to:

- Build objects whose invariants are established at construction.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin classes can have a primary constructor, secondary constructors, initializer blocks, properties, and member functions. A `data class` is appropriate for value-like data, but not every class should be a data class. Establish invariants early so an instance cannot exist in a nonsensical state. Prefer composition when an object needs another capability, rather than creating a deep inheritance tree.

## Worked example

```kotlin
class Account(val id: String, openingBalance: Long) {
    var balance: Long = openingBalance
        private set
    init { require(id.isNotBlank()); require(openingBalance >= 0) }
    fun deposit(amount: Long) { require(amount > 0); balance += amount }
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Property setters are part of the mutation surface. A `private set` permits controlled updates from within the class while preventing callers from arbitrarily changing the value. In real financial software, integer minor units or a decimal type with an explicit currency and rounding policy is safer than binary floating point. Constructor validation is not a substitute for transaction rules or persistence constraints.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Publicly mutable state; constructors that allow invalid objects; using inheritance only to reuse a few lines of code.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Model a `Temperature` or `Account` value. State its invariants and write tests proving invalid construction and invalid transitions are rejected.
2. **Boundary tests:** add at least three cases, including an empty, invalid, or extreme input where appropriate.
3. **Explain:** write a short note describing the API contract, failure behavior, and why you chose this approach over one alternative.
4. **Refactor:** identify one way the code could become harder to maintain and improve it without changing the behavior.

## Review questions

1. What does the language or API guarantee here?
2. Which edge case could invalidate a naive implementation?
3. What is the likely performance or lifecycle cost?
4. What would you test at the boundary, and what should remain a separate integration test?
5. Which parts depend on Kotlin/JVM, Android, Native, or a library version?

## Completion criteria

Consider this lesson mastered when you can explain the concept without relying on the example, implement a variant independently, test its failure modes, and identify when a different approach would be more appropriate.
