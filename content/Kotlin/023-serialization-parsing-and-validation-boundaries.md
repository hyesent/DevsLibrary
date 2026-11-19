# 023. Serialization, parsing, and validation boundaries

## Learning objectives

By the end of this lesson, you should be able to:

- Treat encoded data as untrusted and separate parsing from domain validation.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Serialization converts structured data into a representation such as JSON; parsing converts it back. Neither operation proves that the data is valid for the business domain. A field may be missing, malformed, out of range, or inconsistent with other fields. Use explicit serializers and schemas, define unknown-field policy, and validate before passing data into core logic. Keep wire models separate from domain models when their evolution rules differ.

## Worked example

```kotlin
data class WireUser(val id: String?, val age: Int?)
data class User(val id: String, val age: Int)
fun WireUser.toDomain(): User {
    val safeId = id?.takeIf { it.isNotBlank() } ?: error("Missing id")
    val safeAge = age?.takeIf { it >= 0 } ?: error("Invalid age")
    return User(safeId, safeAge)
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Real serialization libraries have configuration and compatibility trade-offs. Decide how to handle unknown fields, defaults, polymorphism, dates, and version migrations. Avoid deserializing arbitrary polymorphic types from untrusted input without an allowlist. Validation errors should be actionable without echoing secrets or large hostile payloads into logs.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Assuming deserialization equals validation; trusting client-supplied IDs and roles; changing field names without a migration plan.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Define a wire model and validated domain model for a profile. Test missing fields, unknown fields, malformed values, and a future-version payload.
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
