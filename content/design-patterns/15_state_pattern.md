# State Pattern

## Intent
Represent behavior that depends on an object's current state, keeping state-specific rules from spreading through a large conditional.

## Example: download lifecycle
```ts
type DownloadState = "idle" | "downloading" | "complete" | "failed";

const transitions: Record<DownloadState, DownloadState[]> = {
  idle: ["downloading"],
  downloading: ["complete", "failed"],
  complete: [],
  failed: ["downloading"]
};

class DownloadJob {
  private current: DownloadState = "idle";

  state(): DownloadState { return this.current; }

  transition(next: DownloadState): void {
    if (!transitions[this.current].includes(next)) {
      throw new Error(`Invalid transition: ${this.current} -> ${next}`);
    }
    this.current = next;
  }
}
```

This is a state-machine table, not the full object-oriented State pattern. It illustrates the core idea of making legal transitions explicit. The classic State pattern can represent each state as an object that implements state-specific behavior.

## When to use state objects
State objects are useful when each state has distinct behavior, transition rules, or entry/exit actions. If the only difference is a small display label, a simple enum is probably enough.

## State invariants
Define which transitions are legal, what data must exist in each state, and what happens after failure. For example, a `complete` download should have a verified file location. Merely setting the string to `complete` is not sufficient.

## Common mistakes
- Allowing arbitrary transitions from any state.
- Duplicating the transition table across several modules.
- Mixing transient UI state with durable business state without a reason.
- Using a class hierarchy for a handful of simple flags.

## Exercise
Design order states `draft`, `submitted`, `paid`, `cancelled`. Define legal transitions and explain how you handle a payment callback arriving twice or after cancellation.

## Summary
State makes behavior and legal transitions explicit. Use state objects when state-specific behavior is substantial; otherwise a clear state machine may be enough.
