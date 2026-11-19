# 003. Syntax, declarations, and mutability

## Learning objectives

By the end of this lesson, you should be able to:

- Use declarations intentionally and reason about initialization and scope.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

`val` means a reference cannot be reassigned; it does not make the referenced object deeply immutable. `var` allows reassignment. Prefer `val` because it narrows the ways state can change. Kotlin uses type inference when the compiler can determine a type, but explicit types are useful at public APIs and when inference hides important intent. Declarations have scope: local variables exist within a block, while properties belong to objects or classes.

## Worked example

```kotlin
val title = "Kotlin"
var attempts = 0
attempts += 1
val names: List<String> = listOf("Ada", "Linus")
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

A `val` pointing to a mutable collection can still expose mutation if the underlying object supports it. Kotlin’s `List<T>` interface is read-only through that reference, not a universal deep-immutability guarantee. Initialize state as close as possible to its first valid value. Avoid clever implicit types when a reader cannot tell what a value represents.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Assuming `val` freezes an object; using `var` by default; allowing nullable or invalid placeholder state to spread through a program.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Refactor a small program to replace unnecessary `var` declarations with `val`. Identify which values represent immutable facts and which represent evolving state.
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
