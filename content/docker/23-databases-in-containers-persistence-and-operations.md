# Databases in Containers: Persistence and Operations

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of databases in containers: persistence and operations in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Running a database in a container is convenient for development, tests, and many deployments, but the database remains stateful software. It needs durable storage, backups, version-aware upgrades, access control, monitoring, and restore drills. The container should not be treated as the backup. Use the database image’s documented environment variables and initialization behavior, and understand which settings apply only to a fresh data directory.

## Worked example
```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: app
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Set POSTGRES_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 5s
      timeout: 3s
      retries: 12
volumes:
  pgdata:
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
A database container has separate concerns: process lifecycle, data directory, credentials, schema migrations, backup consistency, and upgrade compatibility. Persist the database’s documented data directory in a volume, but never assume copying a live data directory is a safe backup. Prefer database-native backup tools or storage snapshots coordinated with the database’s consistency requirements. Test restoring to a fresh instance. Before major-version upgrades, read the image and database documentation because on-disk data formats may require a supported migration procedure.

## Common mistakes and safety notes
This is an example for a disposable or controlled environment, not a full production database platform. Supply the password securely and do not commit it. Changing initialization variables often does not reconfigure an already initialized database volume. Backups should be database-aware and tested by restoring into a separate environment.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Start the database with a named volume, create sample data, recreate the container, and verify the data remains. Then document how to take a backup and restore it into a fresh volume without overwriting the only copy.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
