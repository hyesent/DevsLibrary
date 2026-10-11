# Environment Variables and Secrets

Keep database URLs, signing keys, and service credentials in server-only code and deployment secret stores. In Next.js, `NEXT_PUBLIC_` variables are intended for browser exposure and are inlined for client use at build time. Never give a secret that prefix.

Separate development, preview, and production credentials. Use least privilege and rotate exposed keys. Validate required server variables at startup and report the missing name without printing its value. Some values are read at build time and others at runtime; deployment platforms differ, so verify when a value is consumed.

Keep local secret files out of version control. Provide an `.env.example` with placeholder values. Review logs, error reports, and support bundles for accidental disclosure.

**Practice:** Inventory each variable by purpose, public/private status, environment, and rotation plan.
