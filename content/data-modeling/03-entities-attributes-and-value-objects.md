# 3. Entities, Attributes, and Value Objects

An **entity** is a concept whose identity matters across changes. A **value object** is described by its value rather than by a persistent identity. The distinction helps determine what deserves a separate identity, what should be embedded as attributes, and what may be safely copied.

A member remains the same member when their email address or display name changes. A money amount such as `NGN 2500.00` is usually a value: two equal amounts in the same currency represent equivalent values, not two individually tracked objects. A delivery address may be a value object in one system, but a reusable, independently managed address record in another.

## Ask about identity and lifecycle

For each candidate concept, ask:
- Does it need a stable identity even if its attributes change?
- Can several other records refer to it?
- Does it have its own lifecycle or permissions?
- Must changes be audited independently?
- Can two equal values still be meaningfully distinct?

A `Product` usually needs identity because orders refer to a particular product record. A product's `display_name` is an attribute. A `Price` may need its own identity if prices are versioned, effective-dated, approved, and referenced by contracts; otherwise it may be a simple amount attribute.

## Avoid both extremes

Making everything a table introduces needless joins, identifiers, and lifecycle complexity. Putting everything into one table duplicates facts and blurs responsibilities. The right boundary follows the domain.

Consider a person and their phone numbers. If the domain allows multiple numbers, labels such as “work” and “mobile,” verification status, and independent updates, phone numbers may be separate records. If the only requirement is one optional contact string, a separate table may be unnecessary.

## Attribute design

Attributes should have clear meaning and stable semantics. Prefer `created_at` over an ambiguous `date`; prefer `shipping_address_snapshot` when the value intentionally preserves the address used for an old order. Avoid names that encode a particular screen rather than a domain concept.

A useful attribute definition includes:
- Meaning and units.
- Whether it is required.
- Allowed values or range.
- Whether it is mutable.
- Whether it is user-entered, imported, or derived.
- Sensitivity and retention requirements.
- Whether its historical value matters.

## Derived attributes

A person's age can be calculated from date of birth and today's date. Storing age directly makes it stale. Sometimes a derived value is deliberately stored for performance or historical meaning, but that decision should be explicit. An invoice's total amount, for example, may be stored as a snapshot because later price changes must not rewrite the financial record. The key is not “never duplicate” but “know why the value is duplicated and how it remains trustworthy.”

## Practice

For a shopping system, classify `Customer`, `EmailAddress`, `Money`, `Order`, `OrderLine`, `ShippingAddress`, and `ProductImage` as likely entities or value concepts. Explain how the answer might change if the business needs verification, image moderation, address reuse, or historical snapshots.

**Key idea:** create identities where the domain needs stable reference and lifecycle; keep simple values simple.
