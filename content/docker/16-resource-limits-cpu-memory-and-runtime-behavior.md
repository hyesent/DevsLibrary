# Resource Limits, CPU, Memory, and Runtime Behavior

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of resource limits, cpu, memory, and runtime behavior in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Containers share host resources unless constrained. CPU limits influence scheduling time, CPU reservations or weights influence relative allocation, and memory limits can cause out-of-memory termination. Actual flags and semantics depend on platform and engine configuration. Limits should reflect measured behavior and leave headroom for startup, bursts, caches, and dependency clients.

## Worked example
```bash
docker run --rm --memory=256m --cpus=0.5 alpine sh -c 'cat /proc/meminfo | head'
docker stats
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
CPU limits generally constrain how much CPU time a container can consume over a scheduling period; they do not reserve a dedicated physical core. Memory is more unforgiving: crossing a cgroup memory limit can trigger an OOM kill. Watch application-level metrics alongside `docker stats`, since aggregate usage does not explain which allocation or request caused pressure. Set limits based on load tests and production observations, and configure application concurrency, queues, and caches so they remain within the resource budget.

## Common mistakes and safety notes
A container’s visible memory information may not match every cgroup detail on every platform. Do not choose limits by guesswork alone. Too-tight limits can create restart loops; no limits can let one workload destabilize its neighbors. Resource limits are not a substitute for application-level bounds on queues, concurrency, and payload size.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Measure a test service under normal and peak load. Set a tentative memory and CPU limit, observe throttling or OOM behavior, and document the trade-off.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
