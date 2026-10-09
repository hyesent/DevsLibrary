# Environment Variables and Configuration

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of environment variables and configuration in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Configuration should vary by environment without rebuilding an image for every deployment. Environment variables are a common mechanism for non-secret configuration, but they are visible to processes and may appear in inspection output or diagnostic dumps. Defaults should be explicit, required settings validated at startup, and configuration documented. Secret material needs a more deliberate delivery and access-control strategy.

## Worked example
```bash
docker run --rm -e APP_MODE=development alpine env
```

```yaml
services:
  app:
    image: example-app:dev
    environment:
      NODE_ENV: production
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Configuration precedence can differ between shell variables, Compose interpolation, `environment`, `env_file`, and image defaults. Inspect the rendered Compose model when values seem surprising, and avoid printing full process environments in logs. Treat non-secret configuration and secrets differently: non-secret settings can often be injected as environment variables, but sensitive values should use a platform-supported secret mechanism and narrowly scoped credentials. Validate required settings at startup so misconfiguration fails clearly instead of causing later, confusing failures.

## Common mistakes and safety notes
Never bake passwords, API tokens, private keys, or production `.env` files into an image. Build arguments are not a safe secret store because values may leak through build metadata or layers. Compose `.env` files are useful for interpolation but should not be confused with encrypted secret storage.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Move a harmless setting out of the Dockerfile and into runtime configuration. Add startup validation for a required variable. Confirm that secrets are not present in image history or the build context.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
