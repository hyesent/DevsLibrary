# 8. First, Second, and Third Normal Forms

Normal forms provide a disciplined way to diagnose redundancy. The definitions assume a relation and its functional dependencies; real-world schema reviews should not substitute slogans for those definitions.

## First Normal Form (1NF)

A relation is commonly described as being in 1NF when each attribute holds a value from its domain rather than a repeating group or nested list treated as a single scalar. A column containing `"red,blue,green"` as an improvised list is hard to validate and query reliably. If each color is an independent fact, use a related table.

Modern databases support arrays and JSON, but their existence does not make every embedded collection a good relational design. An embedded structure can be appropriate when it is naturally a document, is usually read and written as a unit, and has clear validation and query requirements. The choice should follow access patterns and domain semantics.

## Second Normal Form (2NF)

A relation is in 2NF when it is in 1NF and every non-prime attribute is fully functionally dependent on every candidate key; informally, no non-key attribute depends on only part of a candidate key. This issue most often appears with composite keys.

Suppose `enrollment(student_id, course_id, student_name, course_title, grade)` uses `(student_id, course_id)` as a key. `student_name` depends only on `student_id`, and `course_title` depends only on `course_id`. These facts belong with student and course respectively. The grade, however, may depend on the full enrollment key.

## Third Normal Form (3NF)

A relation is in 3NF if, for every nontrivial functional dependency `X → A`, either X is a superkey or A is a prime attribute (part of some candidate key). A common teaching shorthand is to remove transitive dependencies of non-key attributes, but the formal definition is more precise.

For example, if `employee_id → department_id` and `department_id → department_name`, then `department_name` is determined transitively by `employee_id`. Storing it in every employee row can create update anomalies. A department relation can own the department name, while employees reference departments.

## Decomposition quality matters

Splitting a table is not automatically a good normalization result. A decomposition should be lossless: joining the decomposed relations should reconstruct the original facts without spurious rows. It should ideally preserve dependencies so that important rules can still be enforced without expensive joins. In some designs, a decomposition that satisfies a higher normal form can make dependency enforcement more complicated; trade-offs should be reasoned about, not hidden.

## A diagnostic example

Given `line(order_id, product_id, product_name, quantity, unit_price)`, ask:
- Is `(order_id, product_id)` truly unique, or can a product appear on multiple lines?
- Does `product_id` determine the current product name?
- Should `unit_price` mean the current catalog price or the price agreed for this line?
- Is `quantity` determined by the line identity?

These questions often matter more than simply labeling a table “3NF.”

## Practice

Take a table with composite key `(student_id, subject_id)` and columns `student_name`, `subject_name`, `teacher_name`, `score`. State the assumed dependencies, then decompose the table. If a subject can be taught by different teachers in different terms, revise the model to represent that fact.

**Key idea:** normal forms are tests based on keys and dependencies, not formatting rules.
