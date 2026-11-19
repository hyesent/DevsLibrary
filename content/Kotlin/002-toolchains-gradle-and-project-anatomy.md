# 002. Toolchains, Gradle, and project anatomy

## Learning objectives

By the end of this lesson, you should be able to:

- Set up a reproducible project and understand what the build system owns.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A reliable Kotlin project pins compatible versions of the JDK, Kotlin Gradle plugin, Gradle wrapper, and dependencies. Gradle is not Kotlin itself: it configures tasks such as compilation, testing, packaging, and linting. The Gradle Wrapper (`./gradlew`) selects the project’s Gradle version, avoiding reliance on a globally installed Gradle. Kotlin DSL build files use Kotlin-like syntax, but they execute during build configuration rather than as application code.

## Worked example

```kotlin
// Run from a project using the Gradle Wrapper
./gradlew tasks
./gradlew test
./gradlew build
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Understand `settings.gradle.kts` (project and module inclusion), `build.gradle.kts` (plugins, dependencies, tasks), source sets, and test source sets. Keep secrets out of build files and version control. Use dependency locking or version catalogs when a project needs repeatable dependency resolution. Check official compatibility tables when upgrading the JDK, Gradle, or Kotlin plugin; version compatibility is a matrix, not a guess.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Installing a random global Gradle and ignoring the wrapper; upgrading multiple build tools simultaneously; committing local paths or credentials.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Create a minimal JVM project with one production function and one unit test. Record the JDK, Gradle Wrapper, Kotlin plugin, and test framework versions.
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
