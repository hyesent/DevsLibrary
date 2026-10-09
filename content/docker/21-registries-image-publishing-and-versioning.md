# Registries, Image Publishing, and Versioning

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of registries, image publishing, and versioning in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
A registry stores image manifests and layers and makes them available to deployment systems. A publishing workflow builds once, tags the result with a meaningful version, authenticates with scoped credentials, and pushes the artifact. Deployments should consume the intended artifact rather than rebuild different bytes independently in each environment. Tags are convenient labels; digests identify the exact manifest content.

## Worked example
```bash
docker build -t registry.example.com/team/app:1.4.0 .
docker login registry.example.com
docker push registry.example.com/team/app:1.4.0
docker logout registry.example.com
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
A push uploads layers and a manifest to the target registry. A pull may reuse local layers, so a quick pull does not prove all layers were downloaded. Registry permissions should distinguish reading, publishing, and deleting images. Tag images with release identifiers and retain known-good versions for rollback. If deployment tooling supports digests, record the deployed digest in release metadata. Never place credentials in the image URL, Dockerfile, or build arguments; authenticate through a supported credential helper or secret mechanism.

## Common mistakes and safety notes
The registry domain and version are illustrative. Do not push test or sensitive images to a public repository accidentally. Avoid relying on a mutable `latest` tag as the only deployment reference. Protect publishing credentials and separate permission to pull from permission to push or delete.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Publish only to a registry you control or a disposable private repository. Verify the pushed digest, then pull by that digest from a clean environment and confirm it is the same artifact.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
