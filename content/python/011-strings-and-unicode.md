---
title: "Strings and Unicode"
order: 11
book: "python"
---

# Strings and Unicode

## Core model

Python strings are immutable sequences of Unicode code points, not raw byte arrays. Visually identical text may have different code-point sequences because Unicode permits composed and decomposed representations. User-perceived characters can also consist of multiple code points, so indexing a string does not necessarily select one displayed character.

## How it behaves in real code

Encoding converts text to bytes; decoding converts bytes to text. UTF-8 is a common external encoding, but a file or network protocol still has to agree on the encoding. Calling `.encode()` and `.decode()` at the correct boundary makes the conversion explicit and helps prevent mojibake.

## Reasoning exercise

Keep text as `str` inside application logic and bytes at binary boundaries. Normalize text when equality/search requirements demand canonical forms, and avoid assuming string length equals the number of visible grapheme clusters.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
