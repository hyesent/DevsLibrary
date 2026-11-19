# 046. Build quality, static analysis, and dependency hygiene

## Learning objectives

By the end of this lesson, you should be able to:

- Make correctness checks repeatable in local development and CI.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A production build should run compilation, unit tests, static analysis or lint, and packaging checks. Dependency versions should be reviewed and upgraded intentionally; transitive dependencies also affect the attack surface. Locking and dependency verification can improve repeatability and integrity. Keep the CI environment aligned with the project’s supported JDK and target platforms.

## Worked example

```kotlin
// Typical project checks; exact tasks depend on configured plugins
./gradlew clean test check
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

A green CI run proves only that configured checks passed on that environment. It does not prove every platform target, user path, or threat has been tested. Separate fast checks from expensive integration tests but make required checks mandatory before release. Review licenses, vulnerability reports, and upgrade notes; do not blindly auto-upgrade major versions without tests.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- CI that only compiles; ignored flaky tests; unpinned build tools; assuming dependency scanning replaces code review.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Define a CI quality gate for a Kotlin library and an Android app. Explain which checks run on every change, which run nightly, and what blocks release.
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
