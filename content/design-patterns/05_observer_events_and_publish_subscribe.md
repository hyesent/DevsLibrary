# Observer, Events, and Publish–Subscribe

## Intent
Observer lets one subject notify registered observers when a relevant change occurs. Publish–subscribe is a related messaging style in which publishers and subscribers are often decoupled through an event channel or broker.

## A small in-process observer
```ts
type Listener<T> = (event: T) => void;

class Emitter<T> {
  private listeners = new Set<Listener<T>>();

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(event: T): void {
    for (const listener of [...this.listeners]) {
      listener(event);
    }
  }
}
```

A caller subscribes and receives an unsubscribe function. Copying the set before iteration means changes to the listener collection during delivery do not change the current iteration. This tiny emitter is synchronous: a thrown listener error can stop delivery to later listeners, and a listener that never unsubscribes can remain in memory.

## Example use
A user interface can publish a `ThemeChanged` event and let independent widgets react. The theme controller need not directly call every widget. For a small component tree, ordinary props or a framework's state system may be simpler.

## Observer versus pub/sub
In a classic Observer design, the subject often holds references to observers. In publish–subscribe, publishers and subscribers may know only a topic or message broker. The terms overlap in practice, so explain the actual coupling rather than relying only on the label.

## Event design
Good events describe something that has happened, such as `OrderPaid`, rather than a command telling a receiver what to do. Prefer explicit, versionable payloads and avoid publishing mutable internal objects that subscribers can accidentally change.

## Distributed systems require more
An in-memory event is not durable. It can disappear if the process crashes. A broker introduces delivery semantics, retries, duplicate messages, ordering questions, access control, and operational monitoring. Consumers should be designed for duplicates when the delivery model permits them.

## Common mistakes
- Never removing listeners.
- Using events where a direct function call would be clearer.
- Publishing vague events such as `Updated`.
- Assuming event delivery is reliable because a local test passed.
- Allowing hidden event chains to make business flow impossible to trace.

## Summary
Observer and pub/sub reduce direct knowledge between components, but they trade direct calls for lifecycle and flow-of-control complexity.
