# 044. Reflection, annotations, and metaprogramming boundaries

## Learning objectives

By the end of this lesson, you should be able to:

- Know when runtime metadata helps and when generated code is safer.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Reflection inspects classes, properties, and functions at runtime. It is useful for frameworks, serializers, dependency injection, and diagnostics, but can introduce runtime errors, performance costs, and complications for code shrinking or native targets. Annotations provide metadata for compilers, tools, or frameworks; an annotation alone does nothing unless some tool interprets it. Prefer compile-time generation or explicit code when it improves safety and startup behavior.

## Worked example

```kotlin
// Annotation declaration example
@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
annotation class DomainEvent
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Reflection behavior varies by platform and may require the Kotlin reflection library on JVM. Android shrinking/obfuscation can affect reflective access unless configured correctly. Do not treat reflective discovery as a security boundary. On multiplatform targets, use only the metadata and reflection capabilities actually supported.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Assuming annotations execute automatically; using reflection for ordinary direct calls; relying on class names that may change during obfuscation.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Design a small annotation and explain which tool or runtime component reads it. Compare reflection with explicit registration for reliability and startup costs.
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
