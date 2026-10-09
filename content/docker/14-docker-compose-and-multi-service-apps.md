# Docker Compose and Multi-Service Applications

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of docker compose and multi-service applications in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Docker Compose describes an application made of services, networks, volumes, and configuration in a YAML file. The Compose CLI can build images, create dependencies, and manage the local stack as a unit. Compose is especially useful for a web app plus database and cache. The current Compose specification is used by modern `docker compose` commands; older installations may use the legacy hyphenated command.

## Worked example
```yaml
services:
  app:
    build: .
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      DATABASE_URL: postgres://app:dev-only@db:5432/appdb
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: dev-only
      POSTGRES_DB: appdb
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 5s
      timeout: 3s
      retries: 10
volumes:
  db-data:
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Compose service names are the stable names clients should use for dependencies on the Compose network. `depends_on` establishes startup ordering, and health-based conditions can wait for a declared health check where supported; neither removes the need for retry and timeout logic in the application. Named volumes outlive service containers, while `docker compose down -v` removes Compose-managed volumes and can destroy local database state. Review destructive options carefully and keep development and production credentials separate.

## Common mistakes and safety notes
This is a local-development illustration, not a production secrets pattern. `depends_on` alone does not guarantee application readiness; health conditions help where supported, and the app should still retry transient connection failures. The database service name `db` is its network hostname.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Bring up a two-service stack with `docker compose up --build`, inspect logs, stop it, and start it again. Verify the database data persists. Replace the example password before using anything outside a disposable local environment.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
