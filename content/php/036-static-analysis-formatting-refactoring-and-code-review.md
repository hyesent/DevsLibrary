# 036. Static Analysis, Formatting, Refactoring, and Code Review

> Book: PHP · Level: beginner to advanced · Part 36 of 45

# Learning goals
- Use tools to detect defects before runtime.
- Keep style consistent.
- Refactor with behavioral safety.

PHP_CodeSniffer or PHP-CS-Fixer can enforce style; PHPStan or Psalm can perform static analysis; Rector can assist with certain automated migrations. These tools complement tests and review rather than replacing them. Configure them for the project's PHP version and gradually tighten rules where legacy code makes immediate strictness impractical.

Use small refactoring steps with tests as a safety net. Improve naming, extract pure logic, reduce duplication, and clarify contracts without mixing unrelated behavior changes. Code review should ask about correctness, security, failure modes, observability, compatibility, and maintainability—not just formatting.

A useful CI pipeline installs locked dependencies, checks formatting, runs static analysis, runs tests, and builds any required artifacts. Keep warnings visible; do not silence them merely to get a green pipeline.

## Practice
Choose one function with ambiguous naming and implicit types. Refactor it, add tests, run a formatter and static analyzer, and explain each change.
