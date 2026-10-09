# 1. What Data Modeling Solves

Data modeling is the work of deciding what information a system must remember, how that information relates, which rules must always hold, and how applications will use it. It is not simply drawing boxes before creating database tables. A useful model is a compact description of the business facts a system is responsible for preserving.

Imagine a library application. It may need to know that a person has an account, that a physical copy belongs to a title, and that a loan records the period during which a member borrowed a copy. Those are different facts. If the model stores all three as a single large row, updates become awkward: a title can have many copies, a member can borrow many copies over time, and a copy can be borrowed repeatedly. A model makes those relationships explicit.

## The three common views

- **Conceptual model:** the major business concepts and their relationships, expressed in language stakeholders understand.
- **Logical model:** entities, attributes, identifiers, relationship cardinalities, and integrity rules without committing to a particular database engine.
- **Physical model:** concrete tables, column types, indexes, constraints, partitions, and engine-specific decisions.

These views are related, but they answer different questions. A conceptual model might say “a member places a loan.” A logical model clarifies that one member can have many loans and each loan belongs to one member. A physical model chooses `member_id` as a foreign key and specifies its data type and index strategy.

## Start with questions, not tables

Before modeling, ask:
1. What real-world or business facts must be stored?
2. Which events create, change, or retire those facts?
3. Which rules must remain true even when multiple users act at once?
4. What questions will users and reports need to answer?
5. Which values are authoritative, and which are derived?
6. How long must history be retained?

Do not let the first screen design dictate the schema. Screens often combine data from several concepts for convenience. A form showing a member name, book title, and due date does not mean those values belong in one table.

## Models are hypotheses

A model encodes assumptions about the domain. For example, “each book title has exactly one author” is an assumption that fails for co-authored books. Validate assumptions with examples, exceptions, and people who understand the process. Ask what happens when a member changes their name, a title is translated, or a physical copy is withdrawn.

A good model is not the most elaborate one. It is the simplest model that faithfully represents the required facts, protects important rules, and supports realistic access patterns. It should also be explainable to the people who depend on it.

## Practice

For an online course platform, list the main concepts before drawing tables. Consider learners, courses, course offerings, instructors, enrollments, and assessments. Decide which facts describe a course generally and which describe a particular run of that course. Write down three business rules in plain language before choosing column names.

**Key idea:** model the domain's facts and rules first; let the physical schema follow from those requirements.
