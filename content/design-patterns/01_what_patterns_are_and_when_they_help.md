# What Patterns Are and When They Help

## Learning goals
By the end of this lesson, you should be able to explain a design pattern, recognize the problem it addresses, and distinguish a reusable idea from a reusable chunk of code.

## 1. A pattern is a named design choice
A software design pattern describes a recurring problem, the context in which it appears, and a family of solutions that have worked in that context. It is not a library, framework, or code snippet that must be copied unchanged.

For example, several notification channels may need to send the same message. One design is to place all channel-specific logic in a large conditional. Another is to define a common notification interface and provide email, SMS, and push implementations. The second approach resembles Strategy when the application chooses among interchangeable behaviors.

The pattern name gives a team shorthand for discussing a design. Saying “this looks like an Adapter” communicates that one interface is being translated into another; it does not prove that an Adapter is the right solution.

## 2. Patterns capture forces, not just shapes
A useful pattern description includes:
- **Context:** where the design problem occurs.
- **Forces:** requirements or constraints that pull in different directions.
- **Structure:** the roles and relationships in the solution.
- **Consequences:** benefits, costs, and new constraints.
- **Known uses:** situations where the idea has been effective.

Patterns are useful because they preserve reasoning. A diagram with three interfaces is not enough if the reader cannot tell why those interfaces exist.

## 3. The cost of a pattern
Every abstraction introduces a cost: more names to learn, more files to navigate, more indirection while debugging, and more contracts to maintain. A pattern earns its place when the flexibility or clarity it provides outweighs those costs.

Do not create five interchangeable implementations merely because a pattern makes that possible. If there is only one stable behavior and no plausible variation, a direct function may be clearer.

## 4. Example: payment providers
Imagine a checkout service can use different payment providers. The business flow should not need to know every provider's HTTP endpoint, authentication format, or response shape. A small interface can isolate provider-specific behavior.

```ts
type PaymentResult = { ok: true; reference: string } |
                     { ok: false; reason: string };

interface PaymentGateway {
  charge(amountCents: number, currency: string): Promise<PaymentResult>;
}

async function checkout(
  gateway: PaymentGateway,
  amountCents: number
): Promise<PaymentResult> {
  return gateway.charge(amountCents, "NGN");
}
```

The interface is useful if implementations genuinely vary or must be replaced in tests. It is not automatically valuable for every single function call. Production code must also validate amounts, handle provider failures, and avoid duplicate charges; a pattern does not provide those guarantees by itself.

## 5. A practical test
Before introducing a pattern, answer:
1. What concrete problem is hard today?
2. Which part varies, and who owns that variation?
3. What becomes easier to change or test?
4. What new indirection or failure mode is introduced?
5. Could a simpler function, conditional, or module solve the problem just as well?

## Summary
Patterns are names for proven design approaches, not commandments. Understand the context and trade-offs first, then decide whether the pattern improves the system.
