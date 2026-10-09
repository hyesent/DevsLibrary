# Command Pattern

## Intent
Represent a request as an object so it can be queued, logged, retried, undone where possible, or passed to another component.

## Example: editor commands
```ts
interface Command {
  execute(): void;
}

class InsertText implements Command {
  constructor(
    private buffer: string[],
    private text: string
  ) {}

  execute(): void {
    this.buffer.push(this.text);
  }
}
```

A command object packages the operation and the data it needs. The simple example appends text; it does not implement undo, concurrency, or persistence.

## Why a command object?
A UI can place commands on an undo stack, a worker can process queued jobs, or an audit layer can record intent. The caller can invoke `execute()` without knowing the concrete operation.

## Undo requires design
An undoable command needs enough information to reverse the change reliably. One approach stores the previous value; another returns a compensating command. Some actions, such as sending an email or charging a payment, cannot be truly undone. A refund or cancellation is a new compensating action, not time travel.

## Commands versus events
A command expresses an intention: `PublishCourse`. An event records a fact: `CoursePublished`. Commands can fail or be rejected; events should describe outcomes that actually occurred.

## Common mistakes
- Storing commands without a clear owner or lifecycle.
- Retrying a non-idempotent command blindly.
- Claiming undo support without preserving prior state.
- Creating a class for every trivial function when a function value is enough.

## Summary
Command turns an operation into a first-class value. It is useful when the operation must be stored, routed, queued, audited, or reversed.
