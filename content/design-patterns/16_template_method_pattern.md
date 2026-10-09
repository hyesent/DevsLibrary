# Template Method Pattern

## Intent
Define the skeleton of an algorithm in a base class while allowing subclasses to override selected steps.

## Example
```ts
abstract class DataImport {
  async run(input: string): Promise<void> {
    const records = this.parse(input);
    const valid = this.validate(records);
    await this.persist(valid);
  }

  protected abstract parse(input: string): unknown[];
  protected validate(records: unknown[]): unknown[] {
    return records;
  }
  protected abstract persist(records: unknown[]): Promise<void>;
}
```

The base class fixes the workflow order while subclasses provide parsing and persistence. The example's validation is intentionally minimal; real importers should return typed records and report invalid rows.

## Benefits
Template Method centralizes invariant sequencing and reduces duplicated workflow code. It can be appropriate when implementations share a stable algorithm but differ in a few steps.

## Costs
Inheritance couples subclasses to the base class's lifecycle and protected methods. A change to the template can break every subclass. If steps need to vary independently or can be composed, dependency injection or Strategy may be more flexible.

## Template Method versus Strategy
Template Method commonly varies steps through inheritance. Strategy varies an algorithm by delegation to a collaborator. Neither is universally better; choose based on whether the workflow skeleton is fixed and whether variation is best expressed as subclass behavior or an interchangeable object.

## Summary
Template Method is useful for a stable algorithm with controlled extension points. Keep hooks few and intentional.
