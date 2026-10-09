# Mediator Pattern

## Intent
Centralize coordination among collaborating objects so they do not all need direct references to one another.

## Example: form coordinator
A registration form may have country, region, and postal-code controls. Changing the country can affect which region choices are valid and what postal-code rules apply. A mediator can coordinate those changes rather than having every control call every other control.

```ts
type Country = "NG" | "US";

class AddressFormMediator {
  country: Country = "NG";
  region = "";

  changeCountry(country: Country): void {
    this.country = country;
    this.region = "";
  }

  availableRegions(): string[] {
    return this.country === "NG"
      ? ["Lagos", "Kano", "Enugu"]
      : ["California", "Texas", "New York"];
  }
}
```

The region list is illustrative, not a complete geographic dataset. The mediator owns coordination logic; individual UI controls can render state and call its methods.

## Why it helps
Mediator reduces many-to-many references. It can make workflow rules visible in one place.

## The danger: a central god object
If every feature sends every message through one giant mediator, it becomes a bottleneck and an opaque source of hidden behavior. Keep mediators scoped to a cohesive workflow and test their decisions.

## Mediator versus Observer
Observer notifies subscribers that something happened. Mediator coordinates interactions and decides how collaborators respond. A mediator may use events internally, but its intent is different.

## Summary
Mediator is useful for complex collaboration among a defined group of components. Keep the coordination boundary narrow.
