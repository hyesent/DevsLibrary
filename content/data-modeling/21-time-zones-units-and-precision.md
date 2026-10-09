# 21. Time Zones, Units, and Numeric Precision

Many data errors are not caused by a wrong relationship but by an ambiguous value. Dates, times, currencies, quantities, measurements, and identifiers need explicit semantics.

## Instants versus local dates

An instant represents a point on the global timeline. A local date such as “2026-10-09” represents a calendar day in a particular business context. A timestamp without time-zone information can be ambiguous if the application assumes different zones in different environments.

For events that occur at a precise instant, use a representation that preserves the instant and define how the application displays it. In PostgreSQL, `timestamptz` represents an instant and renders it in the session time zone; it does not preserve the original named time zone as a separate field. If the originating zone matters, store it separately. For birthdays or accounting dates, a date-only type may be more appropriate than midnight UTC.

Daylight-saving transitions create local times that may be skipped or occur twice. Scheduling systems need explicit rules for ambiguous local times and should not assume every day has exactly 24 hours.

## Units and currencies

A numeric value without a unit is incomplete. `temperature = 20` could mean Celsius or Fahrenheit. Store or strongly define units and conversion rules. Currency amounts need a currency code and appropriate precision/rounding policy; not every currency has two decimal places. Do not use binary floating-point for exact monetary arithmetic when decimal or integer-minor-unit representations are more appropriate.

## Precision and rounding

Choose decimal precision based on domain limits and calculations. Decide whether rounding occurs per line, per tax component, or only at invoice total. Different rounding rules can yield different results, so financial logic should be explicit, tested, and aligned with applicable requirements. Preserve the agreed invoice amount as a historical record when later catalog changes should not alter it.

## Identifiers are not quantities

Phone numbers, postal codes, product codes, and account numbers may contain leading zeros and are not values to add or average. Store them as strings with validation appropriate to their domain. Avoid treating formatted identifiers as numeric measurements.

## Practice

Model an appointment, a birth date, a product weight, and an invoice amount. Choose types and supporting fields. State how time zone, units, currency, precision, and display formatting are handled.

**Key idea:** store values with enough semantics to interpret them consistently across systems and time.
