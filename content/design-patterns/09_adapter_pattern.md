# Adapter Pattern

## Intent
Convert one interface into another interface that a client expects.

## Example: legacy billing API
Suppose application code expects `chargeCents`, but a vendor SDK exposes a different method and uses decimal currency units. An adapter isolates the mismatch.

```ts
interface BillingPort {
  chargeCents(amountCents: number): Promise<{ transactionId: string }>;
}

interface VendorSdk {
  makePayment(amount: number): Promise<{ id: string }>;
}

class VendorBillingAdapter implements BillingPort {
  constructor(private vendor: VendorSdk) {}

  async chargeCents(amountCents: number) {
    if (!Number.isSafeInteger(amountCents) || amountCents < 0) {
      throw new Error("Amount must be a non-negative integer");
    }
    const result = await this.vendor.makePayment(amountCents / 100);
    return { transactionId: result.id };
  }
}
```

This is illustrative. Actual payment systems must use the vendor's documented currency rules, avoid floating-point monetary errors, authenticate requests, and handle idempotency and failures.

## Why it helps
The adapter protects the rest of the application from vendor-specific naming, data structures, and conventions. Replacing the SDK then affects the adapter and its tests rather than every caller.

## Object and class adapters
An object adapter wraps an existing object and delegates calls. A class adapter uses inheritance in languages and situations where that is appropriate. Composition is often easier to test and less constrained by a language's inheritance model.

## Common mistakes
- Passing vendor types through the adapter, leaking the dependency.
- Silently discarding errors or fields the application needs.
- Performing unrelated business policy inside a compatibility layer.
- Calling a wrapper an adapter when it does not translate any contract.

## Testing
Test translation in both directions, units and edge cases, and error mapping. A mock vendor can test the mapping, while a smaller integration suite verifies assumptions about the real SDK.

## Summary
Adapter is a boundary pattern. It translates a contract while keeping the underlying system's details from spreading.
