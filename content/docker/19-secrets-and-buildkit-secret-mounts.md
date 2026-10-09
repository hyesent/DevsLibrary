# Secrets and BuildKit Secret Mounts

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of secrets and buildkit secret mounts in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Build-time credentials and runtime secrets are different problems. BuildKit supports secret mounts so a build step can read a credential without committing it as a normal image layer. Runtime secrets should be delivered through the deployment platform’s supported mechanism, with limited scope, rotation, and auditability. A secret is protected only if every stage that handles it avoids logging, copying, or exposing it.

## Worked example
```dockerfile
# syntax=docker/dockerfile:1
FROM alpine:3.20
RUN --mount=type=secret,id=package_token \
    test -s /run/secrets/package_token
``` 

```bash
docker build --secret id=package_token,src=./package_token.txt -t secret-demo .
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
BuildKit secret mounts are available only during the relevant build step and are not persisted automatically as ordinary layer contents. That protection can be defeated if a command copies the secret elsewhere or prints it into build logs. SSH mounts similarly allow a build step to use an agent without copying private key files into the image. Prefer short-lived, narrowly scoped credentials and isolate untrusted pull-request builds from secrets. For runtime secrets, use the mechanism supported by the deployment platform and rotate them deliberately.

## Common mistakes and safety notes
Do not put the secret file in the image build context if you can avoid it, and never commit it. The snippet demonstrates access mechanics only; it does not use the token to fetch a package. Build secret mounts are not a universal runtime secret manager. Ensure build logs and scripts do not print secret contents.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Build the demo using a disposable dummy token. Inspect image history and filesystem to confirm the token was not copied into a layer. Delete the dummy file and document the runtime secret mechanism your target platform supports.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
