---
title: "Testing React applications with Testing Library"
order: 52
book: "testing"
---

# Testing React applications with Testing Library

React tests are strongest when they exercise the component through user-visible semantics and realistic interactions.

## The mental model

Render a component, query by role or label, interact using a user-event utility, and assert the resulting UI. For asynchronous results, wait for the expected observable state. Mock the network boundary rather than internal component state when practical.

## How to apply it

Test accessible names, validation, loading, errors, empty states, and successful completion. Keep providers such as router or query clients in a shared but transparent render helper. Use browser-based tests for behavior the DOM test environment cannot faithfully model.

## Example and working method

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { LoginForm } from "./LoginForm";

test("requires an email address before submission", async () => {
  const user = userEvent.setup();
  render(<LoginForm onSubmit={() => {}} />);
  await user.click(screen.getByRole("button", { name: /sign in/i }));
  expect(screen.getByRole("alert")).toHaveTextContent(/email/i);
});
```

The example deliberately queries by the user-facing button name and checks a visible error. Adapt imports and matchers to the project’s actual test stack.

## Failure modes and misconceptions

Do not use `data-testid` as the default when an accessible role or label exists. Avoid directly invoking handlers or asserting hook internals. Make sure asynchronous assertions wait for behavior, not implementation timing.

## Practice lab

Build a form component and test keyboard-friendly input, invalid submission, server error, and success. Then add one browser test for the full route.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
