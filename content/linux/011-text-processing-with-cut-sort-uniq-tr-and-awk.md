---
title: "Text processing with cut, sort, uniq, tr, and awk"
order: 11
book: "linux"
---

# Text processing with cut, sort, uniq, tr, and awk

## Learning goal

Build small data-processing pipelines without fragile manual edits. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Unix text tools work well when each stage has a narrow responsibility. `cut` extracts fields, `sort` orders lines, `uniq` detects adjacent duplicates, `tr` translates characters, and `awk` processes records and fields.

## How it works in practice

`uniq` only collapses adjacent equal lines, so it is often paired with `sort`. Delimiter assumptions matter: CSV quoting rules are more complex than splitting on commas. Use a real parser for formats with escaping, embedded newlines, or nested structure.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
printf 'pear\napple\npear\n' | sort | uniq -c
printf 'Ada:92\nLin:87\n' | awk -F: '{print $1, $2}'
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Parsing JSON or CSV with simplistic regular expressions; forgetting locale affects sorting; building unreadable one-liners without validating intermediate output.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Create a tiny colon-delimited dataset and produce a sorted report with a count per category.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
