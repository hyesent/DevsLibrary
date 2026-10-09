# 5. Relationships and Cardinality

Relationships describe how instances of one concept relate to instances of another. Cardinality specifies how many related instances are allowed. Common patterns are one-to-one, one-to-many, and many-to-many, but optionality is just as important as quantity.

- **One-to-one:** each record on one side relates to at most one record on the other.
- **One-to-many:** one parent may relate to many children; each child typically references one parent.
- **Many-to-many:** many records on either side may relate to many on the other.

A course can have many lessons, while each lesson belongs to one course: one-to-many. Students may enroll in many courses, and each course may have many students: many-to-many, usually implemented with an enrollment table.

## Optionality is a separate question

“Every order belongs to a customer” differs from “an order may belong to a customer.” A mandatory relationship can often be represented with a non-null foreign key. An optional relationship may use a nullable foreign key, though the application must define what null means.

A one-to-one relationship is usually implemented with a foreign key plus a uniqueness constraint. For example, if each user may have at most one profile, `profile.user_id` can be both a foreign key and unique. Without uniqueness, the database permits several profiles per user, so the schema does not enforce one-to-one cardinality.

## Implement many-to-many explicitly

A many-to-many relationship usually becomes a junction table:

```sql
CREATE TABLE enrollment (
  student_id BIGINT NOT NULL REFERENCES student(id),
  course_id  BIGINT NOT NULL REFERENCES course(id),
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (student_id, course_id)
);
```

The composite key prevents duplicate enrollments for the same student and course. If the domain permits multiple attempts or terms, this key is too restrictive; add the appropriate dimension or use a separate enrollment identifier with a matching unique rule.

Junction tables often acquire their own attributes: enrollment status, grade, role, quantity, or effective dates. Once the relationship has meaningful attributes or lifecycle, treating it as a first-class entity is often clearer.

## Self-referencing relationships

A category may have a parent category; an employee may report to a manager. These are self-referencing foreign keys. A simple foreign key does not prevent cycles such as A → B → C → A. If acyclicity matters, it needs additional validation, controlled write operations, or a database-specific strategy.

## Cardinality changes over time

A rule such as “one primary address per customer” may require a partial unique index or another database-specific constraint. Simply adding `is_primary` does not guarantee that only one row is marked primary. The correct design depends on engine support and whether the rule applies to all records or only active ones.

## Practice

Draw the relationships among a user, organization, membership, role, and permission. Decide whether a user can belong to several organizations, whether membership has a lifecycle, and whether a role belongs to a user globally or to a membership within one organization.

**Key idea:** model quantity and optionality explicitly, then enforce them with keys, constraints, and transaction logic.
