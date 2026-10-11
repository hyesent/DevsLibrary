# Testing and Debugging Next.js Applications

Use multiple test levels: unit tests for pure functions and rules; component tests for interactions; integration tests for data access, handlers, and actions; end-to-end tests for user journeys; and production smoke tests for deployed configuration. No single level catches everything.

For protected operations, test authorized and unauthorized users, missing records, malformed input, and dependency failure. For cached routes, test freshness and cross-user isolation. For forms, test keyboard operation and error recovery.

Debug systematically: reproduce, capture the exact error, identify the smallest failing path, and classify compile-time, render-time, browser, network, and data-layer failures. Inspect both terminal and browser console. Use deterministic fixtures and avoid production personal data in tests. Inspect `package.json` for actual scripts rather than assuming every starter has the same lint command.

**Practice:** Test book search, missing book, and bookmark mutation, including empty results, slow network, failed write, and invalid session.
