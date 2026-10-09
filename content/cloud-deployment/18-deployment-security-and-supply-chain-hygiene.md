# Deployment Security and Supply-Chain Hygiene

## Learning goals
Reduce the chance that a vulnerable dependency, stolen credential or misconfigured service becomes a production incident.

## Secure the build chain
Your release is only as trustworthy as the source, dependencies, build environment and artifact publication path. Pin dependencies with lockfiles, update them through reviewed changes, scan for known vulnerabilities and investigate whether a vulnerable component is actually reachable and exploitable. A scan result is a signal to triage, not a complete security assessment.

## Protect build credentials
CI should receive only the permissions it needs and only when needed. Prefer short-lived federation where available, isolate runners for untrusted code, protect release branches and require review for workflow changes. A build agent that can access production secrets and run arbitrary pull-request code creates a direct path from untrusted contribution to production compromise.

## Artifact provenance
Record which source revision produced the artifact and what dependencies it contains. Image signing and provenance can help verify origin if deployment policy checks them. A signature proves a key signed an artifact; it does not prove the code is safe. Protect signing keys and define who or what is allowed to produce trusted releases.

## Runtime hardening
Run applications with minimal privileges, restrict network access, use non-root users where practical, keep base images maintained, and avoid mounting sensitive host paths. Patch cadence should consider exploitability, exposure and operational risk. Test updates before rollout and have a mitigation plan for urgent vulnerabilities.

## Supply-chain response
If a dependency is compromised, identify all deployed versions, affected artifacts, runtime exposure and available patched versions. Rebuild from trusted inputs, rotate potentially exposed credentials, revoke artifacts if supported, and review logs for exploitation. Merely upgrading the package file is not enough if the deployed image still contains the old version.

## Practice
Threat-model the path from a pull request to production. Mark every identity, artifact store and approval boundary. Propose controls against secret exfiltration, dependency tampering and unauthorized release. Ensure each control is verifiable rather than just a policy sentence.
