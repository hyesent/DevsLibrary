# 22. Architecture Testing and Fitness Functions

Architectural rules are more reliable when they can be checked automatically. Architecture tests verify dependency boundaries, module access, API contracts, or other structural expectations. A **fitness function** is a repeatable evaluation of an architectural property, automated where practical.

## Test structural rules

Examples include:
- Domain modules may not import web-framework packages.
- Modules may access another module only through its public interface.
- Dependency graphs must not contain forbidden cycles.
- Public API schemas remain compatible with supported clients.
- Sensitive routes require authorization tests.
- Critical workflows meet defined latency or error-rate targets under a test workload.

The exact enforcement tool depends on language and platform. Some rules can be checked with static analysis; others require integration tests or runtime measurements.

## Test behavior at boundaries

Unit tests are good for domain rules. Integration tests verify real interactions with databases, brokers, and external contracts. End-to-end tests validate a small number of critical user journeys. No single test type proves the entire architecture works.

Test doubles can hide database-specific semantics or timing problems. Use them where they isolate a policy, but retain tests against the real infrastructure for constraints, transactions, migrations, and failure behavior.

## Fitness functions need thresholds and owners

A metric without a threshold is observation, not a decision rule. Define what is acceptable, who responds when the threshold is exceeded, and what action follows. A latency fitness function might run on representative load; a dependency-rule test might run on every pull request.

Avoid turning every subjective preference into a hard automated gate. A fitness function should protect an important quality or invariant, and its maintenance cost should be justified.

## Architecture can decay gradually

New features often introduce direct database access, circular dependencies, duplicated policy, or undocumented integrations. Automated checks catch some of these changes early. Periodic review is still necessary for concerns that cannot be reduced to a simple rule.

## Practice

For a modular monolith, define five fitness functions: dependency direction, module ownership, migration compatibility, tenant isolation, and a critical workflow's latency. Specify the measurement, threshold, test environment, and owner for each.

**Key idea:** turn important architectural intentions into observable, repeatable checks where possible.
