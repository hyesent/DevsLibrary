# Performance: Build Cache, Runtime Metrics, and Image Size

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of performance: build cache, runtime metrics, and image size in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Docker performance has at least three separate dimensions: build time, image distribution/storage, and runtime behavior. Build cache and well-ordered Dockerfile instructions improve iteration speed. Smaller images can reduce transfer time but do not necessarily make an application faster once running. Runtime performance depends on application behavior, I/O, CPU and memory limits, networking, storage drivers, and host contention.

## Worked example
```bash
docker system df
docker stats --no-stream
docker image ls --format '{{.Repository}}:{{.Tag}} {{.Size}}'
docker build --progress=plain -t app:profile .
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Measure build duration, image size, startup time, memory, CPU, and request latency separately. A smaller image may download faster but provide no runtime speedup; a cache can make builds faster but can also hide stale assumptions if inputs are incorrectly excluded. Compare like with like: same source, base image, architecture, workload, and host conditions. `docker stats` is useful for a quick view, but production diagnosis should include application-level metrics, traces, and host-level telemetry.

## Common mistakes and safety notes
Do not delete cache blindly to solve a slow build; first determine whether the cache is being invalidated. Do not optimize only for compressed image size if runtime compatibility suffers. Benchmark with representative load and keep the same inputs when comparing changes.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Measure build time and image size before and after one optimization. Then measure application latency under a controlled load. Explain which metric improved and which did not.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
