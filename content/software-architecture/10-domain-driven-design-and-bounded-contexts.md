# 10. Domain-Driven Design and Bounded Contexts

Domain-Driven Design (DDD) helps teams model complex business domains through a shared language and explicit boundaries. A **bounded context** is a boundary within which a model and its terms have a consistent meaning. The same word can legitimately mean different things in different contexts.

For example, “customer” in sales may represent a relationship and contact preferences, while “customer” in billing may represent a legal payer with invoices and tax details. Forcing both contexts into one universal customer model can create a sprawling object that satisfies neither well.

## Ubiquitous language

Developers and domain experts should use terms consistently in conversations, code, tests, and documentation. If “reservation” means a temporary hold in one workflow and a confirmed booking in another, make the distinction explicit. Shared language reduces translation errors, but it must be validated with real domain experts rather than invented by engineers alone.

## Entities, value objects, and aggregates

Entities have identity; value objects are defined by their values. An **aggregate** is a consistency boundary containing an aggregate root through which changes are controlled. The root protects invariants that must hold for the aggregate's state.

Aggregates should not be made arbitrarily large. A single aggregate that contains every order, customer, and inventory record would create contention and unnecessary loading. Keep the aggregate boundary around rules that must be enforced together, and use explicit workflows for cross-aggregate coordination.

## Context maps

A context map records how bounded contexts relate. One context may expose a published language, another may translate through an anti-corruption layer, or two teams may coordinate a shared model. These are organizational and integration relationships, not just boxes on a diagram.

An anti-corruption layer translates an external model into concepts the local domain can safely use. It is especially useful when integrating a legacy system or vendor API whose vocabulary and assumptions differ from the product's own model.

## DDD is not a framework

DDD does not require every application to have repositories, factories, aggregates, and domain events for every concept. It is most valuable when domain rules are complex and terminology is contested. For simple data-entry workflows, a lightweight model may be clearer.

## Practice

Model a university system with admissions, teaching, and billing contexts. Explain what “student” means in each context, which identifiers cross boundaries, and how a billing correction should be communicated without sharing every internal database table.

**Key idea:** use bounded contexts to protect coherent domain models and make translation between them explicit.
