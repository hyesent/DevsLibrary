# Environments, Configuration, and Secrets

## Learning goals
Separate application artifacts from environment-specific settings and deliver secrets without embedding them in code or images.

## Build once, configure per environment
A robust release produces an identifiable artifact and promotes that same artifact through testing and production, changing configuration rather than rebuilding different binaries for each environment. Rebuilding separately can produce subtle differences in dependency versions, build arguments or generated files.

Typical environments include local development, test/staging and production. Their purpose is not simply to have three names: define how data, credentials, permissions, traffic and external integrations differ. Staging should resemble production where it matters, while using safe test data and isolated credentials.

## Configuration sources
Non-secret settings may be provided through environment variables, configuration files, platform settings or a centralized configuration service. Environment variables are convenient but can leak through debug output, crash reports or process inspection. Use an appropriate secret manager for credentials and sensitive keys, with access scoped to the workload identity.

Do not place secrets in Docker build arguments or image layers. Build arguments may appear in build metadata or logs, and deleting a file in a later image layer does not remove the bytes from an earlier layer. Inject secrets at runtime through a supported mechanism and avoid printing them.

## Validate at startup
Fail fast when required configuration is missing or malformed. Parse numeric settings as numbers, validate URLs, reject unsupported modes, and make defaults explicit. Silent fallback to a development key or local database can be catastrophic in production. Error messages should identify the setting that is invalid without echoing its secret value.

## Rotation and access
Secrets need ownership, rotation and revocation procedures. If a credential is exposed, remove access, rotate it, inspect logs and determine whether data or systems were accessed. A secret manager cannot protect a secret from an application identity that is authorized to retrieve it; least privilege and audit trails still matter.

## Practice
Create a configuration table for a web service: variable name, purpose, required environments, secret status, validation rule and owner. Check the repository and build pipeline for accidental secret exposure. Use separate production credentials and never use real customer data in test environments unless the data governance plan explicitly permits it.

## Common misconception
Environment variables are a delivery mechanism, not a complete secrets-management policy. The policy also needs access control, auditability, rotation and safe handling by the application.
