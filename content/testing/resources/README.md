# Testing — textbook guide

This is a standalone DevsLibrary book folder. It follows the existing `_meta.json` and numbered Markdown lesson conventions; it is not a full project archive.

## How to study

1. Read lessons in order, keeping a notebook of claims, test oracles, assumptions, and risks.
2. For every example, predict the outcome before running it.
3. Write at least one test and one intentionally failing mutation or defect for each practical lab.
4. Keep unit, integration, contract, browser, and operational evidence distinct.
5. At the capstone, deliver a strategy and runnable tests from a clean checkout.

## Book principles

- Tests are evidence, not proof of universal correctness.
- Test behavior and contracts, not incidental implementation details.
- Isolate data and control time, randomness, environment, and external dependencies.
- Use coverage to find questions, not as a substitute for test quality.
- Diagnose flaky tests instead of hiding them with retries.
- Use security and performance testing only in authorized, controlled environments.
- Choose test depth based on risk and failure cost.

## Contents

001. Testing as an engineering discipline
002. Requirements, oracles, and testability
003. Test levels and the test pyramid
004. The testing lifecycle and feedback loop
005. Arrange, Act, Assert and readable tests
006. Unit testing and pure functions
007. Boundary values, equivalence classes, and decision tables
008. Negative testing and error behavior
009. Mocks, stubs, fakes, and spies
010. Dependency injection and test seams
011. Integration testing and real boundaries
012. End-to-end and browser automation
013. Component and UI testing
014. API testing and HTTP contracts
015. Contract testing between services
016. Database testing, migrations, and transactions
017. Asynchronous systems, queues, and eventual consistency
018. Property-based testing
019. Fuzz testing and robustness
020. Mutation testing and test quality
021. Code coverage and what it does not prove
022. Regression testing and defect prevention
023. Exploratory testing and session-based charters
024. Test data design and isolation
025. Determinism, time, randomness, and environment
026. Flaky tests and failure diagnosis
027. Accessibility testing
028. Visual regression and screenshot testing
029. Performance and load testing
030. Security testing and abuse cases
031. API and UI test doubles: when to mock
032. Test architecture and maintainability
033. Test-driven development
034. Behavior-driven development and acceptance criteria
035. Test environments, containers, and service virtualization
036. CI pipelines and test selection
037. Test reporting, triage, and defect communication
038. Release confidence, risk, and test strategy
039. Testing distributed systems and resilience
040. Testing caches and performance-sensitive data paths
041. Testing file uploads, downloads, and parsers
042. Testing authentication, authorization, and multi-tenancy
043. Testing localization, internationalization, and time
044. Testing browser compatibility and responsive behavior
045. Testing build systems, configuration, and feature flags
046. Type-level, static, and compile-time testing
047. Testing legacy systems and incremental refactoring
048. Capstone: build a layered test strategy for a real feature
049. Final synthesis: reason from evidence, not test counts
050. JavaScript testing with Node.js
051. Python testing with pytest and unittest
052. Testing React applications with Testing Library
053. Testing HTTP clients and network failures
054. Testing command-line tools and background workers
