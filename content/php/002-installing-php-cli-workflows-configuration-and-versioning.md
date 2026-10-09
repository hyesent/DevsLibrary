# 002. Installing PHP, CLI Workflows, Configuration, and Versioning

> Book: PHP · Level: beginner to advanced · Part 2 of 45

# Learning goals
- Inspect the PHP version and active configuration.
- Understand CLI versus web-SAPI configuration differences.
- Manage dependencies and extensions reproducibly.

## Inspect your environment
```sh
php -v
php --ini
php -m
php -i
```
`php -v` reports the CLI runtime version; `php --ini` identifies configuration files loaded by that runtime; `php -m` lists enabled modules. A web server may use another PHP binary, configuration file, or SAPI, so verify the web runtime separately.

## Configuration layers
PHP configuration can be influenced by `php.ini`, scanned `.ini` files, SAPI-specific settings, environment, and per-directory mechanisms depending on deployment. Settings such as `display_errors`, `memory_limit`, `upload_max_filesize`, and `date.timezone` should be intentional. Production should log errors without exposing stack traces or secrets to visitors.

## Extensions and dependencies
Extensions add capabilities such as PDO drivers, internationalization, image processing, or cryptography. Check that required extensions are available in development, CI, and production. Composer manages PHP package dependencies and autoloading; it does not install every native system dependency.

## Reproducibility
Record supported PHP versions, dependency constraints, and required extensions. Use lock files in applications so teammates and deployment environments resolve the same package versions. Test upgrades in CI rather than assuming minor-version changes cannot affect behavior.

## Practice
- Capture `php -v`, `php --ini`, and `php -m`.
- Identify the PDO driver required by your chosen database.
- Write down the PHP version your project supports and how CI verifies it.
