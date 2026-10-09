# 025. Security I: XSS, CSRF, SQL Injection, and Output Contexts

> Book: PHP · Level: beginner to advanced · Part 25 of 45

# Learning goals
- Identify common web vulnerabilities in PHP applications.
- Apply context-specific defenses.
- Understand defense in depth.

**SQL injection:** use parameterized queries for values, allowlist dynamic identifiers, and keep database permissions limited.

**Cross-site scripting (XSS):** encode output for its exact context. For HTML text and quoted attributes, `htmlspecialchars()` with appropriate flags and UTF-8 is a common baseline. JavaScript, CSS, URL, and HTML contexts are not interchangeable. Prefer safe DOM APIs on the client.

**Cross-site request forgery (CSRF):** protect state-changing requests with tokens or a well-designed framework mechanism, appropriate cookie policy, and origin checks where suitable. Never rely only on obscurity or a hidden button.

**Authorization failures:** enforce ownership and permissions on the server for every resource and operation. Random IDs do not replace access checks.

**File and command injection:** avoid shelling out when a library can do the job. If a subprocess is required, use argument-array APIs where available, strict allowlists, controlled environment, and least privilege.

## Practice
For each vulnerability, create a safe and unsafe example and explain which security boundary the defense protects.
