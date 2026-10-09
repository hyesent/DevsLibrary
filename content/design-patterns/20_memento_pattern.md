# Memento Pattern

## Intent
Capture enough of an object's state to restore it later, while limiting how much the caretaker needs to know about the object's internals.

## Example: simple editor snapshot
```ts
class TextBuffer {
  private text = "";

  set(value: string) { this.text = value; }
  get() { return this.text; }

  snapshot(): Readonly<{ text: string }> {
    return Object.freeze({ text: this.text });
  }

  restore(snapshot: Readonly<{ text: string }>): void {
    this.text = snapshot.text;
  }
}
```

A history manager can store snapshots and restore one when the user chooses Undo. The example's snapshot is shallow but safe because it contains only a string. For nested mutable data, a shallow copy may still share references and fail to preserve historical state.

## Trade-offs
Snapshots are simple to restore but may consume substantial memory. Alternatives include storing commands or change deltas. A hybrid system may periodically snapshot and retain a sequence of changes between snapshots.

## Security and privacy
History can retain information users thought they deleted, including sensitive text. Define retention, clearing behavior, and persistence rules. Do not serialize arbitrary object internals without a schema.

## Summary
Memento supports snapshots and restoration. Choose a snapshot strategy that matches state size, correctness needs, and privacy expectations.
