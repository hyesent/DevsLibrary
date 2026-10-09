# Backups, Disaster Recovery, and Restore Tests

## Learning goals
Create a recovery plan that is measurable, protected from common failure modes and demonstrated through restore exercises.

## A backup is only useful if it restores
A backup job that reports success does not prove that the application can recover. Backup formats may be incompatible, keys may be missing, permissions may have changed, or restore may take longer than the business can tolerate. Test restoring into an isolated environment and verify application-level integrity, not only that files exist.

## Define the objectives
Set RPO and RTO with the business owner. RPO describes acceptable data loss; RTO describes acceptable recovery duration. A low RPO can require frequent snapshots, transaction logs or replication. A low RTO can require pre-provisioned infrastructure, automation and a practiced runbook. Both have costs.

## Protect recovery assets
Use access controls that prevent an ordinary compromised application identity from deleting every backup. Consider immutable retention or separate backup accounts when appropriate. Encrypt backups and keep recovery keys accessible to authorized responders but protected from the same incident that could compromise production. Document dependencies such as DNS, identity provider, network configuration and container registry.

## Recovery sequence
A runbook should specify incident declaration, roles, data recovery point selection, infrastructure provisioning, restore order, validation, traffic cutover and communication. Dependencies matter: restoring the database before the network and identity permissions are ready can waste time. Record the expected duration of each step and its prerequisites.

## Region loss and corruption differ
A region outage may require failover to another region. A destructive query may require restoring a point-in-time copy to a separate environment and selectively recovering data. Replicas can spread corruption, so do not treat them as the only recovery mechanism.

## Practice
Run a tabletop exercise for accidental deletion and another for full-region unavailability. Then perform a real restore test on non-production resources. Measure actual RPO/RTO, document gaps and assign corrective actions. A plan that has never been tested should be labeled unverified.
