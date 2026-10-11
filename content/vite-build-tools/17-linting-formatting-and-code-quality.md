# Linting, Formatting, and Code Quality Tools

## Different tools, different jobs
A formatter enforces consistent layout. A linter detects suspicious or prohibited code patterns. A type checker validates static type relationships. Tests validate behavior. None of these fully replaces the others.

## Avoid overlapping configuration
Choose a formatter and linter setup that fits the repository. Avoid contradictory rules that repeatedly rewrite the same code. If using a framework plugin, follow its current recommended configuration and ensure the editor and CI use the same rules.

## Automatic fixes
Autofix is useful, but review changes that affect imports, accessibility, or logic. Formatters should generally not be expected to correct architecture or business rules. Run checks on changed files during development and the full suite in CI.

## Code quality gates
Quality gates should protect meaningful outcomes: no type errors, no broken tests, no known severe lint failures, and a successful build. Do not add arbitrary complexity metrics without understanding their false positives and how the team will act on them.

## Practice
Add formatting and lint commands to a sample project. Intentionally introduce a formatting issue, a lint issue, and a type error; verify that each is caught by the right tool.
