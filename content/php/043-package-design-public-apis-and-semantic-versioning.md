# 043. Package Design, Public APIs, and Semantic Versioning

> Book: PHP · Level: beginner to advanced · Part 43 of 45

# Learning goals
- Design reusable PHP libraries.
- Manage public API stability.
- Version packages responsibly.

A reusable package should have a narrow purpose, explicit dependencies, namespaced public symbols, documentation, tests, and a clear supported PHP range. Separate public API from internal implementation. Changing a public method signature, removing a class, or changing documented behavior may be a breaking change.

Semantic Versioning communicates compatibility expectations, but only if maintainers consistently follow it and accurately identify the public API. Deprecate before removing when practical, document migration paths, and test supported PHP versions. Avoid exposing internal database schemas or framework details as library contracts without a reason.

Use Composer metadata accurately, define autoloading, and keep examples executable. Review license compatibility and supply-chain risk before publishing.

## Practice
Design a small date-formatting or validation package. Define its public API, supported versions, failure behavior, tests, and a release plan.
