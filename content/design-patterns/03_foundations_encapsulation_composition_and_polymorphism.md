# Foundations: Encapsulation, Composition, and Polymorphism

## Learning goals
Understand the basic language features that make many patterns possible.

## Encapsulation
Encapsulation keeps an object's internal representation behind a public contract. A caller should use supported operations rather than modify internal state arbitrarily.

```ts
class Inventory {
  #stock = new Map<string, number>();

  add(sku: string, quantity: number): void {
    if (!sku || !Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Invalid inventory addition");
    }
    this.#stock.set(sku, (this.#stock.get(sku) ?? 0) + quantity);
  }

  available(sku: string): number {
    return this.#stock.get(sku) ?? 0;
  }
}
```

This class protects its own map and validates additions. In real inventory systems, concurrent updates and persistence require additional coordination; encapsulation alone does not prevent race conditions across processes.

## Composition
Composition builds a component by giving it other components to use. A checkout service can receive a payment gateway, a logger, and an order repository instead of constructing all of them internally.

Composition often makes dependencies visible and replaceable. It does not mean that every dependency must be an interface or that inheritance is never appropriate.

## Polymorphism
Polymorphism allows code to use different implementations through a shared contract. In TypeScript, an interface can describe that contract; at runtime, TypeScript interfaces are erased, so runtime validation may still be needed for untrusted input.

```ts
interface Formatter {
  format(value: number): string;
}

const wholeNumberFormatter: Formatter = {
  format: value => Math.round(value).toString()
};

const currencyFormatter: Formatter = {
  format: value => `₦${value.toFixed(2)}`
};
```

Both values can be passed to a function expecting `Formatter`. The caller depends on the contract, not the concrete formatting logic.

## Favor composition thoughtfully
Composition is flexible because collaborators can be changed independently. But excessive composition can produce a chain of tiny objects whose relationships are difficult to follow. Use boundaries that correspond to understandable responsibilities.

## Summary
Encapsulation protects invariants, composition assembles behavior, and polymorphism lets callers rely on contracts. Together they form much of the foundation for pattern-based design.
