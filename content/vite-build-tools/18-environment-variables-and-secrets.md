# Environment Variables and Secrets

## Public variables are public
Vite exposes variables with the configured client prefix—commonly `VITE_`—to application code. These values can be visible in generated JavaScript. Never place private API keys, database credentials, or signing secrets in client-exposed variables.

## Runtime versus build time
In a static frontend, many environment values are substituted at build time. Changing a deployment variable after the files have already been built may not change the emitted JavaScript. If the same artifact must be promoted across environments, consider a carefully designed runtime configuration endpoint containing public values only.

## Keep environments separate
Use distinct settings for local development, test, preview, and production. Do not use production credentials for routine local experiments. Restrict credentials to the minimum permissions needed.

## Repository hygiene
Keep real `.env` files out of source control, provide safe example files, and rotate exposed credentials. Do not print environment objects to logs. A build output scan can help detect accidental leaks but should not be treated as the only safeguard.

## Practice
Inspect a built output directory and search for a harmless public test value. Then verify that a dummy secret is never included in client output.
