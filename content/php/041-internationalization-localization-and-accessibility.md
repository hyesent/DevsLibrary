# 041. Internationalization, Localization, and Accessibility

> Book: PHP · Level: beginner to advanced · Part 41 of 45

# Learning goals
- Separate translation from business logic.
- Format dates, numbers, and currencies for locale.
- Build forms and interfaces that work for more users.

Keep user-facing text out of deeply embedded business rules where translation is expected. Use translation catalogs or framework localization facilities. Locale-sensitive formatting should use suitable internationalization APIs when available, rather than assuming decimal separators, date order, or currency conventions.

Accessibility begins with semantic HTML, meaningful labels, keyboard support, clear errors, and sufficient status communication. Server-rendered applications should preserve focus and validation context where practical. Do not use color alone to communicate an error. Ensure error messages identify the field and explain how to fix it.

Store canonical data independently of display formatting. A formatted currency string should not be parsed back into a financial amount. Respect locale and timezone as separate settings.

## Practice
Build an accessible form with localized validation messages and test a locale where decimal and date formats differ from your default.
