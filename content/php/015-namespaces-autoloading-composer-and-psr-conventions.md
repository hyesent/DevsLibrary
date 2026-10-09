# 015. Namespaces, Autoloading, Composer, and PSR Conventions

> Book: PHP · Level: beginner to advanced · Part 15 of 45

# Learning goals
- Organize PHP code with namespaces.
- Use Composer for dependencies and autoloading.
- Understand lock files and package boundaries.

Namespaces reduce naming collisions and make code organization explicit. Composer is the standard dependency manager in modern PHP projects. It can install packages, generate an autoloader, run scripts, and enforce dependency constraints.

Example `composer.json` excerpt:
```json
{
  "name": "example/app",
  "require": {"php": "^8.2"},
  "autoload": {"psr-4": {"App\\": "src/"}}
}
```
After changing autoload mappings, run `composer dump-autoload`. In applications, commit `composer.lock` so installs resolve the tested dependency versions. Libraries generally commit their manifest and let consuming applications resolve compatible versions according to their policy.

PSR standards cover common conventions such as coding style, autoloading, logging, and HTTP interfaces. Follow a project's selected standards consistently. Audit packages, check maintenance and license compatibility, and avoid blindly executing install scripts from untrusted dependencies.

## Practice
Create a tiny Composer project with `src/`, a namespaced class, and a script that instantiates it. Verify autoloading.
