# Builder Pattern

## Intent
Separate the construction of a complex object from its final representation, especially when there are many optional choices or construction steps.

## Example: report request
```ts
type ReportRequest = {
  title: string;
  format: "pdf" | "csv";
  includeArchived: boolean;
  locale: string;
};

class ReportRequestBuilder {
  private title?: string;
  private format: "pdf" | "csv" = "pdf";
  private includeArchived = false;
  private locale = "en";

  withTitle(title: string): this {
    this.title = title;
    return this;
  }
  asFormat(format: "pdf" | "csv"): this {
    this.format = format;
    return this;
  }
  withArchived(value = true): this {
    this.includeArchived = value;
    return this;
  }
  inLocale(locale: string): this {
    this.locale = locale;
    return this;
  }
  build(): ReportRequest {
    if (!this.title?.trim()) throw new Error("Title is required");
    if (!this.locale.trim()) throw new Error("Locale is required");
    return {
      title: this.title.trim(),
      format: this.format,
      includeArchived: this.includeArchived,
      locale: this.locale
    };
  }
}
```

The builder makes defaults and final validation visible. This mutable builder is convenient but should generally be used as a short-lived construction object. The resulting request should be treated as immutable by convention or made immutable in a stricter design.

## When it helps
- Construction has many optional parameters.
- Steps must occur in a specific order.
- Validation belongs at the boundary between incomplete and complete data.
- A complex object should be created without a long positional-argument list.

## When it does not
For a small object with two required fields, an object literal or constructor is often clearer. A builder can become a verbose mirror of every field and add little value.

## Common mistakes
- Letting `build()` produce invalid or partially initialized objects.
- Reusing a builder accidentally across unrelated requests.
- Hiding expensive I/O inside what looks like harmless configuration.
- Confusing a builder with a factory: a builder emphasizes staged configuration; a factory emphasizes selection and creation.

## Summary
Use Builder when staged construction clarifies complexity and centralizes validation. Keep simple objects simple.
