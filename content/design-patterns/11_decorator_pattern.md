# Decorator Pattern

## Intent
Add behavior to an object by wrapping it with another object that implements the same interface, without changing the original object.

## Example: instrumenting a data source
```ts
interface DataSource {
  read(key: string): Promise<string | null>;
}

class TimedDataSource implements DataSource {
  constructor(
    private inner: DataSource,
    private recordDuration: (milliseconds: number) => void
  ) {}

  async read(key: string): Promise<string | null> {
    const started = Date.now();
    try {
      return await this.inner.read(key);
    } finally {
      this.recordDuration(Date.now() - started);
    }
  }
}
```

The decorator adds timing while preserving the `DataSource` contract. It records duration on both success and failure. Production instrumentation should avoid exposing sensitive keys and should ensure the metrics callback itself cannot unexpectedly disrupt application behavior.

## Composing decorators
A data source might be wrapped by a cache, then timing, then logging. Order matters: timing the cache measures a different operation from timing the underlying network request. Document which layer each metric describes.

## Decorator versus inheritance
Inheritance changes a class's implementation hierarchy. A decorator wraps an existing object and can be composed at runtime. Many languages also use “decorator” to mean metadata or annotations; that is a related naming convention, not necessarily this object-structural pattern.

## Risks
Wrappers can make debugging harder, accidentally alter exception behavior, or violate expectations of the interface. Keep each decorator focused and test that it preserves the wrapped contract.

## Summary
Decorator adds a focused responsibility around an object. Use it when behavior should be composable and the interface can remain stable.
