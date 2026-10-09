# Dependency Injection

## Intent
Supply a component's dependencies from outside instead of having it construct or locate them internally.

## Constructor injection
```ts
interface Clock {
  now(): Date;
}

class SystemClock implements Clock {
  now() { return new Date(); }
}

class ExpiringTokenPolicy {
  constructor(private clock: Clock) {}

  isExpired(expiresAt: Date): boolean {
    return this.clock.now().getTime() >= expiresAt.getTime();
  }
}
```

Tests can inject a deterministic fake clock. This is often simpler than mocking global time or sleeping until a token expires.

## Injection versus a container
Dependency injection is a design principle. A DI container is a tool that constructs objects and resolves dependency graphs. Small applications can use manual wiring at the composition root; large applications may benefit from a container. A container is not required for DI.

## Good boundaries
Inject dependencies that represent meaningful variation, external effects, expensive resources, or important test seams. Avoid creating interfaces for every private helper just to satisfy a rule.

## Common mistakes
- Service locator: a class reaches into a global registry to find hidden dependencies.
- Over-injection: constructors with dozens of unrelated collaborators.
- Mis-scoped lifetimes: a shared object accidentally holds request-specific state.
- Circular dependencies that reveal unclear ownership.
- Tests that use a fake with behavior unlike the real dependency.

## Summary
Dependency injection makes dependencies visible and replaceable. Keep composition at a clear boundary and inject what genuinely needs to vary or be controlled.
