# 012. Errors, Exceptions, Error Reporting, and Recovery

> Book: PHP · Level: beginner to advanced · Part 12 of 45

# Learning goals
- Distinguish errors, exceptions, and validation failures.
- Handle failures without hiding them.
- Configure development and production error reporting safely.

PHP has engine errors, warnings, notices, exceptions, and application-level failures. `Throwable` is the common interface for `Exception` and `Error` in modern PHP. Catch exceptions at boundaries where you can recover, translate, or add useful context; do not wrap every line in `try/catch` and continue as if nothing happened.

```php
try {
    $record = $repository->findById($id);
} catch (DatabaseException $exception) {
    error_log('Unable to load record: ' . $exception->getMessage());
    throw new RuntimeException('Record lookup failed.', 0, $exception);
}
```

Do not show raw exception messages, SQL, filesystem paths, or stack traces to public users. Log diagnostic details securely, return a safe message, and preserve the original cause for debugging. `finally` is useful for cleanup, though resource abstractions and `try`-safe APIs may be better.

Production configuration should log errors and disable public error display. Avoid `@` suppression: it hides signals and complicates diagnosis.

## Practice
Create a custom exception for an invalid domain operation. Test the expected exception and verify that the public response contains no secret details.
