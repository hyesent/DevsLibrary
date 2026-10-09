# Compose Profiles, Overrides, and Development Workflows

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of compose profiles, overrides, and development workflows in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
A Compose file can describe a shared baseline while profiles and override files enable optional tools or environment-specific settings. This reduces duplication but introduces merge behavior that developers must inspect. A developer override might mount source code and enable hot reload; a production configuration should not accidentally inherit those mounts, debug ports, or development credentials.

## Worked example
```bash
docker compose config
docker compose --profile tools up -d
docker compose ps
docker compose logs -f app
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Compose merges multiple files into one effective model, and environment interpolation can change image names, ports, or credentials. `docker compose config` renders that model and is a valuable preflight check; treat its output as potentially sensitive if it contains interpolated secrets. Profiles are useful for optional services such as a mail catcher or admin tool, but they should not accidentally become required production services. Keep overrides small and document the exact command used to start each environment.

## Common mistakes and safety notes
Always inspect the fully rendered Compose configuration before relying on multiple files or environment interpolation. File merge rules are not simply “replace everything”: lists and maps can have different merge semantics. Do not put production credentials in a checked-in override file.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Create a base Compose file and a development override. Render the merged configuration with `docker compose config` and verify the development-only bind mount and port are absent from the deployment configuration.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
