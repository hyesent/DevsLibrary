# 043. Advanced language features: contracts, inline, and reification

## Learning objectives

By the end of this lesson, you should be able to:

- Use advanced compiler features only when they make an API safer or clearer.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin contracts can communicate facts about function behavior to the compiler, but contract declarations have restrictions and should state only facts the implementation guarantees. Inline functions substitute function bodies at call sites and enable reified type parameters, but can increase code size and affect binary/API behavior. Reification can check a type parameter at runtime in an inline function, subject to type erasure limits. These are advanced tools, not prerequisites for ordinary clean code.

## Worked example

```kotlin
inline fun <reified T> Any?.asOrNull(): T? = this as? T
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Contracts should not be used to persuade the compiler to trust an untrue promise. Reified checks do not validate nested generic element types such as every element in `List<String>`. Public inline functions have compatibility considerations because their bodies may be copied into consumers. Verify current compiler requirements before adopting experimental features.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Declaring contracts that are stronger than actual behavior; assuming reified generics remove all erasure; inlining large functions without measuring consequences.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Write a small reified helper and explain its exact guarantee. Then describe why it cannot validate a deserialized list’s element types without iterating over them.
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
