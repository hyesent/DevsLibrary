# 023. Database Access with PDO and Prepared Statements

> Book: PHP · Level: beginner to advanced · Part 23 of 45

# Learning goals
- Connect to a database through PDO.
- Use prepared statements for values.
- Handle transactions and errors safely.

PDO provides a consistent interface to several database drivers. Keep connection details in environment or secret-management configuration, not source control. Use exception-based error handling where appropriate and set the connection character set correctly for the database.

```php
$stmt = $pdo->prepare(
    'SELECT id, title FROM articles WHERE id = :id'
);
$stmt->execute(['id' => $articleId]);
$article = $stmt->fetch(PDO::FETCH_ASSOC);
```

Prepared statements keep values separate from SQL syntax and are the primary defense against SQL injection for data values. Placeholders generally cannot represent table names, column names, or arbitrary SQL fragments; those need carefully controlled allowlists. Avoid concatenating untrusted input into queries.

Use transactions when multiple changes must succeed or fail together. Understand isolation, locking, retries, and unique constraints at the database layer. Do not leak SQL errors to users.

## Practice
Create a repository function using PDO. Test missing records, duplicate writes, invalid input, and database failure.
