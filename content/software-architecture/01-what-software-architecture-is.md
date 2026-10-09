# 1. What Software Architecture Is

Software architecture is the set of important structures and decisions that shape a software system: how responsibilities are divided, how components interact, where data lives, and how the system changes and operates. It is not limited to diagrams, frameworks, or the choice between a monolith and microservices.

Architecture matters when a decision has consequences beyond one small function: changing it may affect several teams, reliability, security, performance, cost, or the ability to deliver future features. Not every design choice is architectural. Choosing a local variable name is usually easy to reverse; choosing the identity model or the boundary between independently deployed services can be expensive to reverse.

## Architecture is about trade-offs

There is rarely one universally best architecture. A design that optimizes latency may increase infrastructure cost. Strong isolation may increase operational complexity. A highly flexible plugin system may make simple changes harder to understand. Architectural work identifies the qualities that matter, makes trade-offs explicit, and avoids optimizing a quality the product does not need.

## Architecture versus detailed design

Architecture establishes the major boundaries and constraints; detailed design determines how components fulfill their responsibilities. The distinction is contextual. A database transaction boundary may be architectural in a payment system but an implementation detail in a small static site.

## Start with the system's purpose

Before choosing patterns, clarify:
- Who uses the system and what outcomes they need.
- Which workflows are business-critical.
- What failures are tolerable.
- What data must remain correct and private.
- What scale and latency are expected.
- How many people will build and operate it.
- Which constraints already exist: budget, platform, regulations, skills, or deadlines.

A small application with one team and moderate traffic may benefit from a modular monolith. A large organization with independently evolving domains may need independently deployable components. Neither conclusion should be reached by fashion alone.

## Architecture evolves

Architecture is not a one-time drawing produced before coding. Teams learn from production behavior, changing requirements, incidents, and delivery friction. Good architecture makes likely changes affordable while keeping current complexity proportionate.

## Practice

Choose an application you know. Write its purpose, three critical workflows, two important quality attributes, and two constraints. List the decisions that would be expensive to reverse. Do this before naming any architectural pattern.

**Key idea:** architecture is the set of consequential structures and decisions that shape a system's qualities and evolution.
