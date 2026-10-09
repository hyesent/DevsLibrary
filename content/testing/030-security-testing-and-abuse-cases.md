---
title: "Security testing and abuse cases"
order: 30
book: "testing"
---

# Security testing and abuse cases

Security testing checks whether controls resist adversarial use, not just expected use.

## The mental model

Test authentication, authorization, session handling, input validation, injection, cross-site scripting, CSRF where relevant, SSRF, insecure direct object references, rate limits, secret exposure, dependency risk, and unsafe file handling. Threat modeling helps choose meaningful abuse cases.

## How to apply it

Test authorization at every object boundary, including cross-tenant access. Use safe test environments and non-destructive payloads. Validate that secrets and personal data do not appear in logs or error messages. Combine static analysis, dependency scanning, dynamic tests, and manual review.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Passing a scanner does not prove security. Do not run intrusive tests on systems without authorization. Tests should avoid using real credentials or destructive payloads against live data.

## Practice lab

Create a threat-based test plan for a document-sharing API, including guessed IDs, expired sessions, malicious filenames, oversized uploads, and excessive request rates.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
