---
title: "Python testing with pytest and unittest"
order: 51
book: "testing"
---

# Python testing with pytest and unittest

Python supports a standard-library `unittest` framework and the widely used `pytest` ecosystem. Select a runner that fits project conventions and dependency constraints.

## The mental model

A pytest test is typically a function named `test_*` using plain assertions. Fixtures provide reusable setup and teardown; parametrization runs the same behavior against multiple cases. `unittest.TestCase` provides test methods and setup hooks. Mocking tools can replace network, clock, and filesystem collaborators.

## How to apply it

Keep fixtures scoped appropriately: function scope gives isolation, while session scope can speed expensive immutable setup. Use temporary-path fixtures for files, monkeypatching for environment variables, and parametrization for boundary tables. Test exceptions with explicit expected types and messages only when stable.

## Example and working method

```python
# pricing.py
def total_after_discount(subtotal: int, percent: int) -> int:
    if subtotal < 0 or not 0 <= percent <= 100:
        raise ValueError("invalid price or discount")
    return subtotal * (100 - percent) // 100

# test_pricing.py
import pytest
from pricing import total_after_discount

@pytest.mark.parametrize(("subtotal", "percent", "expected"), [
    (1000, 0, 1000),
    (1000, 10, 900),
    (0, 50, 0),
    (999, 100, 0),
])
def test_total_after_discount(subtotal, percent, expected):
    assert total_after_discount(subtotal, percent) == expected

def test_rejects_invalid_discount():
    with pytest.raises(ValueError):
        total_after_discount(1000, 101)
```

Run with `python -m pytest`. Decide deliberately whether integer truncation is the intended currency rule; tests must reflect a specified rounding policy.

## Failure modes and misconceptions

Broad fixtures can hide dependencies and create order coupling. Mocking a function at the wrong import location may not replace the reference used by the module. Avoid tests that require a developer’s personal environment.

## Practice lab

Test a parser with parametrized valid and invalid cases, a temporary file, and a monkeypatched environment variable. Ensure the suite works from a clean virtual environment.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
