# 040. Compatibility, Deprecations, Dependency Audits, and Upgrades

> Book: PHP · Level: beginner to advanced · Part 40 of 45

# Learning goals
- Maintain a supported PHP version.
- Upgrade dependencies safely.
- Manage breaking changes and deprecations.

Track PHP support dates and library compatibility. A dependency's version constraint is not a guarantee that every combination works; use the lock file and CI matrix to test supported environments. Read upgrade guides and changelogs, scan for deprecations, and upgrade in small, reviewable steps.

Composer commands such as `composer validate`, `composer install`, and `composer audit` support validation and security hygiene, subject to tool and registry behavior. Review dependency provenance, maintainer health, transitive dependencies, licenses, and required native extensions. Avoid blindly running untrusted package scripts.

Use automated refactoring tools carefully, review generated changes, and keep rollback options. Do not suppress all deprecations permanently; they often indicate future breakage.

## Practice
Write an upgrade checklist covering runtime, extensions, dependencies, tests, migrations, deployment, monitoring, and rollback.
