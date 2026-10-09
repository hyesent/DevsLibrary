# 039. Deployment: PHP-FPM, Web Servers, Containers, and Configuration

> Book: PHP · Level: beginner to advanced · Part 39 of 45

# Learning goals
- Understand the components that run PHP in production.
- Deploy reproducibly and securely.
- Separate build-time and runtime configuration.

Common deployments use Nginx or Apache with PHP-FPM; others use containers or managed platforms. The web server handles connections and static assets, while PHP-FPM manages PHP worker processes. Tune process counts and request timeouts based on measured resource limits and traffic.

A deployment should define PHP version, required extensions, Composer install mode, document root, writable directories, environment configuration, health checks, and log destinations. Only the public directory should be web-accessible in a typical framework layout; source code, `.env` files, vendor metadata, and uploads should not be exposed accidentally.

Use immutable or versioned releases, health checks, safe migrations, rollback procedures, and least-privilege filesystem permissions. Never use development settings such as public error display in production. Container images should be reproducible, minimal, scanned, and run as a non-root user where feasible.

## Practice
Draw a production deployment topology and identify where TLS terminates, where secrets are injected, where logs go, and how a release is rolled back.
