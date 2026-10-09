---
title: "Archives, compression, and checksums"
order: 17
book: "linux"
---

# Archives, compression, and checksums

## Learning goal

Package and verify files while preserving expected structure. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Archives bundle files and directory structure; compression reduces representation size. `tar` is an archive tool that commonly works with gzip, xz, or zstd compression. `zip` has a different archive format. Checksums detect accidental or malicious changes only when the expected checksum is obtained from a trustworthy source.

## How it works in practice

Inspect archive contents before extraction, extract into a dedicated directory, and beware of absolute paths or `..` path components. For integrity-sensitive downloads, verify a published checksum and signature when available; a checksum copied from the same compromised location offers limited protection.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
tar -tf archive.tar
sha256sum downloaded-file
# Example creation in a lab directory:
tar -czf lab-backup.tar.gz linux-lab
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Extracting untrusted archives into sensitive directories; assuming compression provides confidentiality; treating a checksum as proof of publisher identity.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Create a compressed archive of your lab directory, list its contents, extract it elsewhere, and compare checksums.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
