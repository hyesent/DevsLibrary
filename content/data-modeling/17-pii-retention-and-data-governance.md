# 17. Personal Data, Retention, and Governance

Data modeling includes deciding which data should be collected, who can access it, how long it should be kept, and how it can be corrected or deleted. Collecting a field because it might be useful later creates security and compliance costs without necessarily creating value.

## Classify data

For each attribute or table, identify whether it is public, internal, confidential, personal, sensitive, financial, or otherwise regulated in the applicable context. Classification depends on law, contract, and use; labels are not universal. Record the business purpose, authorized roles, retention period, and whether the value may appear in logs or analytics.

## Minimize collection

Prefer the minimum information needed for a defined purpose. If a service only needs to know whether a user is over a threshold age, it may not need to retain a full date of birth, depending on the legal and product requirements. If a third-party provider returns a large payload, do not automatically persist every field.

## Deletion is a data-lifecycle problem

Deleting a user from the primary table may leave personal data in order snapshots, logs, search indexes, analytics exports, backups, and downstream providers. Some records may need retention for legal or financial reasons. Define deletion, anonymization, pseudonymization, and retention exceptions explicitly. A retention policy should include a way to prove that scheduled deletion actually runs.

Backups require special handling: deleting one row from a live database does not erase it from an immutable backup immediately. Document backup expiry, restore procedures, and how deletion requests are re-applied after a restore when required.

## Avoid unsafe identifiers

Do not use national identifiers, emails, or other sensitive values as public primary keys or expose them in URLs without a clear need. Hashing a low-entropy identifier does not automatically anonymize it; an attacker may guess candidate values. Use access controls, encryption where appropriate, key management, and carefully designed pseudonymous identifiers.

## Governance and quality

Data governance assigns ownership and defines semantics. A data dictionary should explain fields, units, allowed values, source systems, freshness, and known quality limitations. Establish rules for correction, duplicate resolution, imports, and retention. “The database accepts it” does not mean the value is accurate.

## Practice

For an education platform, inventory learner name, contact details, assessment results, login events, and support messages. For each, state purpose, access roles, retention rationale, and deletion/anonymization considerations. Validate obligations with qualified legal and compliance guidance for the relevant jurisdictions.

**Key idea:** a responsible schema records only justified data and includes its protection and lifecycle in the design.
