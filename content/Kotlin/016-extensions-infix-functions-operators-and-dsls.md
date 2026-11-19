# 016. Extensions, infix functions, operators, and DSLs

## Learning objectives

By the end of this lesson, you should be able to:

- Extend APIs carefully and build domain-specific syntax responsibly.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Extension functions are resolved statically from the declared receiver type; they do not actually add members to a class and cannot access private internals merely because the syntax looks attached. A member with the same signature generally takes precedence over an extension. Operator and infix functions can make domain operations concise, but overloading should preserve intuitive meaning. DSLs often combine lambdas with receivers and builder objects; they need clear scope, validation, and useful error messages.

## Worked example

```kotlin
fun String.isValidCode(): Boolean = length in 3..12 && all { it.isLetterOrDigit() }
val valid = "Kotlin42".isValidCode()
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Avoid defining extensions that imply security or validation guarantees they do not actually provide. A string-format helper is not an HTML sanitizer, and a “safe” URL parser needs a precise policy. DSL receiver scopes can become confusing; use `@DslMarker` when nested DSL receivers must not be mixed accidentally.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Believing extensions override virtual members; using operator overloads with surprising semantics; making a DSL that accepts invalid configurations until runtime.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Create a small configuration DSL for a notification. Validate required fields before building the final immutable configuration.
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
