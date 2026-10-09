# 10. Associations, Junction Tables, and Relationship Attributes

A relationship can carry facts of its own. A student enrolling in a course has an enrollment date and status; a product included in an order has quantity and agreed unit price; an employee assigned to a project has a role and allocation percentage. These attributes describe the association, not just either endpoint.

## Why a junction table matters

A many-to-many relationship cannot generally be represented correctly with one foreign-key column on either endpoint. Storing comma-separated course IDs in a student row loses referential integrity. Adding `course_1`, `course_2`, and `course_3` creates a fixed limit and makes queries awkward. A junction table makes each association a row.

```sql
CREATE TABLE course_enrollment (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES student(id),
  course_id BIGINT NOT NULL REFERENCES course(id),
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'withdrawn')),
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, course_id)
);
```

This schema assumes a student may enroll in a given course only once. If re-enrollment is permitted, the unique rule needs to include the relevant term/attempt or be replaced with a domain-specific rule. The surrogate `id` does not eliminate the need for uniqueness constraints.

## Relationship lifecycle

When an association can be approved, suspended, completed, audited, or independently authorized, it behaves like an entity. A membership between a user and organization may own the user's role in that organization. Putting a global `role` column on the user would be wrong if the same user is an administrator in one organization and a viewer in another.

## Enforcing relationship rules

Simple uniqueness can often be enforced declaratively. More complicated conditions, such as no overlapping active assignments for the same resource, may need an exclusion constraint, serializable transaction, locking strategy, or other engine-specific mechanism. A pre-check in application code is not enough when two requests can pass the check simultaneously.

For example, checking “no active enrollment exists” and then inserting can race. A unique constraint is the most reliable guard for a uniqueness invariant. The application should catch the resulting constraint violation and return a useful response.

## Practice

Model users joining workspaces with roles and join dates. Decide whether roles are global, workspace-specific, or both. Add a uniqueness rule that prevents duplicate active memberships under the intended definition, and consider whether past membership periods must be retained.

**Key idea:** if the relationship has meaningful attributes or lifecycle, model the association explicitly.
