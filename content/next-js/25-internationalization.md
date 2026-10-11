# Internationalization and Locales

Internationalization includes translation, date/number/currency formatting, plural rules, text direction, sorting, and different text lengths. Use platform `Intl` APIs or a maintained localization library rather than hardcoding locale assumptions.

Choose a stable URL strategy, such as locale prefixes, and handle unknown locale values safely. Proxy-based locale examples can be version-sensitive. Use `Intl.DateTimeFormat`, `Intl.NumberFormat`, and `Intl.PluralRules` where appropriate. Avoid formatting initial HTML differently on server and client due to timezone or locale mismatches.

Support `dir="rtl"` when needed and prefer logical CSS properties such as `margin-inline-start`. Keep translation messages contextual and test missing keys and long strings.

**Practice:** Add locale-aware date and number formatting and test RTL layout and unknown locales.
