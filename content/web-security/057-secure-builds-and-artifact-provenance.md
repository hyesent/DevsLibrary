---
title: "Secure Builds and Artifact Provenance"
order: 57
book: "web-security"
---

## Mental model

A trustworthy release needs traceability from reviewed source and dependencies to the artifact deployed. A developer working directory is not a release process. Protect source changes, build tools, runners, signing identities, and deployment permissions.

## Failure modes and design choices

Use reproducible builds where practical, scoped build secrets, artifact digests, and provenance or attestations when supported. Promote the same tested artifact between environments. A signed artifact is only as trustworthy as its builder and signing key.

## Verification and engineering practice

Verify deployed artifact identity, source revision, dependency inputs, and configuration. Separate authority to modify code from authority to deploy high-risk changes where practical.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
