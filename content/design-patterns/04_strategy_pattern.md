# Strategy Pattern

## Intent
Define a family of interchangeable algorithms, encapsulate each one, and let a context use one without depending on its implementation.

## When it helps
Strategy is useful when several behaviors implement the same business operation but differ in a meaningful way: shipping cost, discount calculation, search ranking, file formatting, or retry policy.

## Example: shipping quotes
```ts
type Cart = { subtotalCents: number; weightGrams: number };

interface ShippingStrategy {
  quote(cart: Cart): number;
}

class StandardShipping implements ShippingStrategy {
  quote(cart: Cart): number {
    return 500 + Math.ceil(cart.weightGrams / 1000) * 100;
  }
}

class FreeShippingOverThreshold implements ShippingStrategy {
  constructor(private thresholdCents: number) {}

  quote(cart: Cart): number {
    if (cart.subtotalCents >= this.thresholdCents) return 0;
    return 500 + Math.ceil(cart.weightGrams / 1000) * 100;
  }
}

function shippingCost(cart: Cart, strategy: ShippingStrategy): number {
  return strategy.quote(cart);
}
```

The example illustrates the structure, not a production shipping tariff. Production rules should validate inputs, use explicit currency units, and make eligibility rules clear.

## Roles
- **Strategy interface:** the contract for the algorithm.
- **Concrete strategies:** implementations of the algorithm.
- **Context:** code that invokes a strategy without knowing its details.
- **Selection policy:** code that chooses the strategy, if selection is dynamic.

A common mistake is to put selection logic inside every strategy and duplicate it across the application. Prefer one well-defined place for choosing the behavior.

## Advantages and costs
Strategy avoids growing conditionals and makes algorithms independently testable. It can also create many small classes or objects. If the variants are tiny and unlikely to grow, a simple function parameter or conditional may be enough.

## Common mistakes
- Treating a strategy as a place for unrelated business logic.
- Hiding the strategy choice in global state.
- Assuming an interface makes implementations behaviorally equivalent.
- Forgetting to test boundary values and invalid inputs.

## Exercise
Implement `TaxStrategy` for two clearly defined tax policies. Make the policy choice explicit, and test zero, typical, and boundary values. Do not infer real tax rules from this example; use a stated fictional rule set.

## Summary
Strategy separates an algorithm from the code that uses it. Introduce it when the algorithm genuinely varies and the variation deserves its own contract.
