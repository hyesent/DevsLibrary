# Images, Tags, Digests, and Layers

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of images, tags, digests, and layers in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
An image is a content-addressed collection of filesystem layers plus configuration such as entrypoint, default command, environment, and metadata. Tags such as `nginx:1.27` are human-readable references that can be moved; a digest identifies specific content. Layers can be reused across images, which saves storage and download time. The image configuration and its filesystem layers together form the image used to create a container.

## Worked example
```bash
docker pull alpine:3.20
docker image ls
docker image inspect alpine:3.20
docker history alpine:3.20
docker image rm alpine:3.20
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
An image manifest references configuration and filesystem layer content, and multi-platform tags may resolve to a manifest list/index that selects an architecture-specific image. That is why an image built on one architecture may behave differently when deployed on another if dependencies contain native binaries. Tags improve readability, but digests are the stronger identity for an exact artifact. Image cleanup should account for references from containers and build cache rather than treating every untagged layer as disposable.

## Common mistakes and safety notes
A tag is not a cryptographic guarantee that content never changes. For high-reproducibility or supply-chain-sensitive builds, consider digest pinning and a deliberate update process. Removing an image may fail while containers still reference it. Image layers are not the same as runtime container changes.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Compare `docker history` for two images. Identify reusable layers, inspect the architecture metadata, and explain why a digest is useful for a controlled deployment.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
