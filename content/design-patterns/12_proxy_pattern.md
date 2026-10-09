# Proxy Pattern

## Intent
Provide a stand-in for another object to control access to it.

## Common uses
- **Virtual proxy:** delay creating an expensive resource until needed.
- **Protection proxy:** check authorization before forwarding a call.
- **Remote proxy:** represent a resource accessed over a network.
- **Caching proxy:** reuse results where cache semantics are safe.

## Example: authorization wrapper
```ts
interface DocumentReader {
  read(documentId: string, userId: string): Promise<string>;
}

class AuthorizedDocumentReader implements DocumentReader {
  constructor(
    private inner: DocumentReader,
    private canRead: (userId: string, documentId: string) => Promise<boolean>
  ) {}

  async read(documentId: string, userId: string): Promise<string> {
    if (!(await this.canRead(userId, documentId))) {
      throw new Error("Forbidden");
    }
    return this.inner.read(documentId, userId);
  }
}
```

This illustrates access control at one boundary, not a complete security design. The identity must come from a trusted authentication context, not an arbitrary user ID supplied by an untrusted client. Authorization must be enforced on every relevant access path.

## Proxy versus Decorator
Both can wrap an object. Proxy's central purpose is to control access or mediate interaction; Decorator's central purpose is to add behavior while keeping the same interface. In practice, one wrapper can satisfy both descriptions.

## Caching is not automatically safe
Cache keys must include every factor that affects the result, including tenant or authorization scope where relevant. A cache that omits a user's permissions can leak data across users. Define invalidation and staleness requirements before adding a caching proxy.

## Summary
Proxy controls access to a resource. Treat security, cache scope, latency, and failure behavior as part of the design rather than incidental details.
