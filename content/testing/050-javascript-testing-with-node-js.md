---
title: "JavaScript testing with Node.js"
order: 50
book: "testing"
---

# JavaScript testing with Node.js

Node.js projects commonly use the built-in `node:test` runner or libraries such as Vitest and Jest. The central ideas—isolated cases, assertions, fixtures, and controlled dependencies—are portable across runners.

## The mental model

A minimal test can use `import test from "node:test"` and `import assert from "node:assert/strict"`. Register a test with `test("adds values", () => { assert.equal(add(2, 3), 5); });`. Run files with `node --test`. Async tests can return a promise or use `async` functions; rejected promises should fail the test.

## How to apply it

Keep tests discoverable by naming files consistently, avoid importing modules with destructive top-level side effects, and use temporary directories for filesystem tests. Prefer strict assertions and test externally visible behavior. In larger projects, choose a runner that integrates well with the build and browser stack.

## Example and working method

```js
// math.js
export function add(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("Both values must be finite numbers");
  }
  return a + b;
}

// math.test.js
import test from "node:test";
import assert from "node:assert/strict";
import { add } from "./math.js";

test("adds finite numbers", () => {
  assert.equal(add(2, 3), 5);
});

test("rejects non-finite inputs", () => {
  assert.throws(() => add(Infinity, 1), TypeError);
});
```

Run with `node --test`. The second assertion checks the documented failure contract, not merely that the function returns something.

## Failure modes and misconceptions

Do not assume an assertion library or runner makes a test meaningful. Ensure asynchronous work is awaited, timers are cleaned up, and tests do not leave open handles that hang the process.

## Practice lab

Create a tiny module with a pure function, a rejected async operation, and a temporary-file test. Run it using the project’s actual package scripts.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
