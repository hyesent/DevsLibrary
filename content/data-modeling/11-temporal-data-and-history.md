# 11. Temporal Data and History

Many modeling mistakes come from treating every fact as timeless. Names change, prices become effective on certain dates, employees move between departments, and subscriptions change state. Before choosing columns, determine whether the system needs only current truth, an audit trail of changes, or the ability to reconstruct what was valid at a past time.

## Three different needs

1. **Current state:** what is true now? A customer record may hold the current preferred name.
2. **Event history:** what changes happened, in what order, and who initiated them?
3. **Effective-dated history:** what value was considered valid for a given business time?

These are related but not interchangeable. An audit event saying “price changed at 14:05” does not necessarily answer which price applied to an order placed at 14:04 if the update was backdated or imported late.

## Valid time and transaction time

A bitemporal model distinguishes:
- **Valid time:** when a fact is true in the modeled world.
- **Transaction time:** when the database recorded that fact.

For example, an employment change may be effective on the first day of the month but entered by HR three days later. A valid-time query asks who was employed in a department on that first day. A transaction-time query asks what the system believed on that day, before the late entry arrived.

Not every application needs full bitemporal modeling. Use it when legal, financial, analytical, or operational requirements genuinely depend on both timelines.

## Effective-dated rows

A common pattern uses `valid_from` and `valid_to`, with a defined convention such as half-open intervals `[valid_from, valid_to)`. Under that convention, the start is included and the end is excluded, avoiding ambiguity at boundaries. Use a clear representation for an open-ended current period, and enforce that intervals do not overlap where the domain forbids overlap. In PostgreSQL, range types and exclusion constraints may help; other engines require different techniques.

## Snapshots versus references

An invoice usually should not display today's product price or today's customer address if those differ from the values used when the invoice was issued. Store the historical facts required by the business record, even if the current product and customer remain separately modeled. This is a semantic snapshot, not a license to duplicate every mutable field.

## Event sourcing is not synonymous with audit logs

Event sourcing makes the event stream the primary source from which current state is derived. An audit log merely records changes alongside a conventional state model. Event-sourced systems need event versioning, replay rules, idempotency, and handling for corrections; they are not automatically more reliable.

## Practice

Model subscription plan changes so you can answer: “What plan is active now?”, “What plan was effective on 1 May?”, and “What did the application know on 1 May?” State which of these questions the product actually requires before implementing temporal complexity.

**Key idea:** define which timeline matters, then choose a history model that can answer the required questions unambiguously.
