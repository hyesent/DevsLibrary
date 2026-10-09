# Facade Pattern

## Intent
Provide a simpler, purpose-oriented interface over a subsystem that has multiple components or complicated steps.

## Example: publishing a course
```ts
class CoursePublisher {
  constructor(
    private validator: CourseValidator,
    private assetStore: AssetStore,
    private searchIndex: SearchIndex,
    private notifier: Notifier
  ) {}

  async publish(courseId: string): Promise<void> {
    const course = await this.validator.validate(courseId);
    await this.assetStore.ensureAvailable(course);
    await this.searchIndex.upsert(course);
    await this.notifier.coursePublished(course);
  }
}
```

The facade gives a caller one operation instead of requiring it to coordinate four collaborators. The example omits rollback and partial-failure handling, which matter in production. If indexing fails after assets are available, the system needs a deliberate recovery policy.

## What a facade should and should not do
A facade should make a coherent use case easier to invoke. It should not become a “god object” that accumulates every operation in the application. Split unrelated workflows into separate purpose-driven interfaces.

A facade also does not automatically make the subsystem transactional. Multiple method calls can still partially succeed.

## Facade versus Adapter
- **Facade:** simplifies access to a subsystem.
- **Adapter:** translates an incompatible interface into the interface a client expects.

One component can play both roles, but their intent is different.

## When it helps
Use a facade for a complex SDK, a multi-step subsystem, or a public API that should remain stable while internals evolve. Do not add one merely to rename a single obvious method.

## Summary
Facade hides subsystem coordination behind a focused interface. Keep the facade cohesive and make partial-failure behavior explicit.
