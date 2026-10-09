# Abstract Factory

## Intent
Provide an interface for creating a family of related objects without specifying their concrete classes.

## Why families matter
Imagine a UI library that supports two visual themes. Each theme supplies a button and a dialog whose appearance and behavior should remain consistent. Abstract Factory can create a matching family through one contract.

```ts
interface Button { render(): string }
interface Dialog { render(): string }

interface WidgetFactory {
  createButton(): Button;
  createDialog(): Dialog;
}

class LightButton implements Button {
  render() { return "light button"; }
}
class LightDialog implements Dialog {
  render() { return "light dialog"; }
}
class LightWidgetFactory implements WidgetFactory {
  createButton() { return new LightButton(); }
  createDialog() { return new LightDialog(); }
}
```

A corresponding dark factory could create dark widgets. The client depends on `WidgetFactory`, `Button`, and `Dialog`, rather than each concrete class.

## The benefit and the cost
The factory keeps a family consistent and makes the family switch explicit. But adding a new product type often requires changing the factory interface and every factory implementation. If there is only one product, or product variants do not need to be consistent, Abstract Factory may be unnecessary.

## Practical guidance
Configuration should select a factory at a boundary, such as application startup. Avoid sprinkling checks like `if (theme === "dark")` throughout every component; that defeats the abstraction.

Do not confuse this pattern with dependency injection. A factory creates objects; a dependency injection mechanism supplies already-created or configured dependencies. A system may use both.

## Exercise
Sketch a family of storage components for local files and cloud storage. Decide whether you need a family factory or whether a single `StorageClient` interface is enough. Explain what consistency requirement justifies your choice.

## Summary
Abstract Factory is valuable when several related products must vary together. Its interface-wide change cost makes it a poor default for small systems.
