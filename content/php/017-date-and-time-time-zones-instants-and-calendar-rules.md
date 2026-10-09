# 017. Date and Time: Time Zones, Instants, and Calendar Rules

> Book: PHP · Level: beginner to advanced · Part 17 of 45

# Learning goals
- Distinguish instants, local times, and calendar dates.
- Use immutable date objects.
- Avoid time-zone and daylight-saving assumptions.

Use `DateTimeImmutable` and `DateTimeZone` for robust date handling. Store instants in a consistent representation such as UTC, while retaining a user's intended time zone when scheduling local events. A date such as “2026-10-09” may represent a calendar date, not a midnight UTC instant.

Daylight-saving transitions can create local times that do not exist or occur twice. “One day later” can mean a calendar operation rather than exactly 86,400 seconds. Define the business rule explicitly for billing, deadlines, and recurring schedules.

Use `DateInterval` for interval arithmetic and format output at the presentation boundary. Validate user-supplied date strings with explicit formats when ambiguity matters. Avoid relying on the server's default timezone.

## Practice
Write tests for a month boundary, leap day, and a date in a named timezone. Decide how your application handles ambiguous local times.
