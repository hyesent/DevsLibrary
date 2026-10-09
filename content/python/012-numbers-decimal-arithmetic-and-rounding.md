---
title: "Numbers, Decimal Arithmetic, and Rounding"
order: 12
book: "python"
---

# Numbers, Decimal Arithmetic, and Rounding

## Core model

Python integers have arbitrary precision subject to available memory. Binary floating-point numbers represent many decimal fractions approximately, so `0.1 + 0.2` does not equal the exact decimal value `0.3`. This is not a Python defect; it follows from binary floating-point representation.

## How it behaves in real code

For scientific measurements, float is usually appropriate with tolerances. For financial decimal quantities, use `decimal.Decimal` with a deliberate precision and rounding policy, or represent fixed minor units as integers where that fits the domain. `round()` follows defined rounding behavior and should not be treated as a universal business rule.

## Reasoning exercise

Choose numeric representation from the domain's correctness requirements. Test boundary values, rounding ties, very large values, and comparisons with tolerances rather than relying only on friendly examples.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
