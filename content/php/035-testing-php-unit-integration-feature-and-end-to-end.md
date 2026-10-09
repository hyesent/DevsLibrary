# 035. Testing PHP: Unit, Integration, Feature, and End-to-End

> Book: PHP · Level: beginner to advanced · Part 35 of 45

# Learning goals
- Choose the right test level.
- Isolate dependencies without mocking everything.
- Make tests deterministic and useful.

Unit tests focus on a small unit and run quickly. Integration tests verify collaboration with real boundaries such as a database. Feature tests exercise an application request and response. End-to-end tests verify critical user journeys across a deployed-like environment. The best test suite uses a balanced mix based on risk.

Use a test framework such as PHPUnit or Pest, and run tests automatically in CI. Test behavior, not private implementation details. Prefer real value objects and pure functions; fake external systems at boundaries. Use a temporary or isolated database for integration tests and clean up state predictably.

Test edge cases: missing values, invalid input, boundary numbers, permission failures, duplicate requests, timeouts, and concurrency assumptions. Avoid relying on the current time, random ordering, network availability, or shared mutable fixtures unless controlled.

## Practice
Test a domain service, repository integration, and HTTP endpoint separately. Add one regression test for a bug before fixing the implementation.
