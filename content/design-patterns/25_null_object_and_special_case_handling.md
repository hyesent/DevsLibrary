# Null Object and Special-Case Handling

## Intent
A Null Object provides a valid implementation of an interface that represents an intentional “do nothing” or neutral behavior, reducing repeated null checks where that behavior is truly appropriate.

## Example: optional logger
```ts
interface Logger {
  info(message: string): void;
  error(message: string): void;
}

const noOpLogger: Logger = {
  info: () => {},
  error: () => {}
};

function processRecord(record: string, logger: Logger = noOpLogger): void {
  logger.info(`Processing ${record}`);
}
```

This can be reasonable when logging is optional. It would be dangerous to use a no-op payment gateway or a no-op authorization service, because silently doing nothing would hide a critical failure.

## Do not confuse absence with success
A neutral object should not make an operation appear successful when it was not performed. Use explicit result types, errors, or optional values when the caller needs to distinguish absence, failure, and success.

## Alternatives
A nullable type with one well-placed check may be clearer. Modern TypeScript's strict null checks help make absence visible. Avoid `any` or non-null assertions merely to silence compiler warnings.

## Summary
Null Object is useful for safe, intentional default behavior. Never use it to disguise a missing dependency or failed critical operation.
