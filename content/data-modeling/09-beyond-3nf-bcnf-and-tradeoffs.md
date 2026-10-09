# 9. BCNF and Further Normalization

Third Normal Form is sufficient for many practical schemas, but some relations still contain redundancy under more complex dependencies. Boyce–Codd Normal Form (BCNF) strengthens 3NF: for every nontrivial functional dependency `X → Y`, X must be a superkey.

A relation can satisfy 3NF while failing BCNF when a determinant is not a superkey but the dependent attribute is prime. This distinction matters in carefully analyzed schemas, although many application designs do not need a formal BCNF proof for every table.

## A teaching example

Suppose a university records `(student, course, instructor)` and assumes:
- Each student takes a course with one instructor.
- Each instructor teaches only one course.

The dependencies and candidate keys need to be examined precisely. If the business rules change—perhaps instructors can teach several courses, or team teaching is allowed—the candidate keys change too. Normal-form claims are only as valid as their stated dependencies. Do not copy a textbook decomposition without confirming that its assumptions match your domain.

## Decomposition and dependency preservation

A BCNF decomposition can be lossless yet fail to preserve every functional dependency in an easily enforceable local form. That means validating a rule may require joining tables or using additional mechanisms. 3NF synthesis can sometimes preserve dependencies at the cost of retaining a relation that BCNF would split. This is a legitimate design trade-off.

The design goals include:
- Lossless reconstruction.
- Dependency preservation where practical.
- Minimal accidental redundancy.
- Understandable constraints.
- Acceptable read/write performance.
- Operational simplicity.

No single normal form automatically optimizes all these goals.

## Multivalued dependencies and 4NF

A multivalued dependency represents independent sets of values associated with the same key. Suppose a person can have several independent skills and several independent languages, and the combinations are not meaningful. Storing every skill-language combination creates a cross-product of redundant rows. Separate person-skill and person-language relations can represent the independent facts. Fourth Normal Form (4NF) formalizes this concern by requiring that nontrivial multivalued dependencies have a superkey determinant.

Fifth Normal Form (5NF) addresses certain join dependencies where a relation can be decomposed into smaller relations without losing information. These cases are more specialized and depend on domain rules; do not decompose tables merely because the theory exists.

## Practical guidance

Most application schemas benefit first from clear entities, accurate keys, explicit constraints, and sensible normalization through 3NF. Consider BCNF or higher forms when a specific dependency pattern creates a demonstrated anomaly. Explain the dependency, prove the intended decomposition is lossless, and assess whether constraints remain enforceable.

## Practice

A person has independent certifications and spoken languages. Model them without creating every possible certification-language combination. Then explain what new requirement would make a certification-language relationship meaningful and change the model.

**Key idea:** advanced normal forms solve specific dependency problems; apply them with proofs and domain assumptions, not as automatic table-splitting rules.
