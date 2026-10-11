---
title: "Containment, Eradication, and Recovery"
order: 66
book: "web-security"
---

## Mental model

Containment limits ongoing harm; eradication removes the cause or foothold; recovery restores trustworthy service. For a leaked credential, revoke it, find the exposure path, assess its permissions, inspect relevant events, and rotate related credentials if needed.

## Failure modes and design choices

Preserve evidence unless immediate harm requires destructive action. Restore only from trusted backups and artifacts, validate integrity, and avoid reintroducing the vulnerable state. Communicate confirmed facts separately from uncertain scope.

## Verification and engineering practice

Record actions, decisions, timestamps, and residual uncertainty. Use a blameless but rigorous review to improve controls and response speed.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
