# Image Scanning, SBOMs, and Supply-Chain Integrity

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of image scanning, sboms, and supply-chain integrity in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
An image’s supply chain includes its base image, packages, source code, build system, dependencies, and publishing credentials. Scanners compare known package information with vulnerability databases. A software bill of materials (SBOM) inventories components. Provenance can record how an artifact was built. These controls provide evidence and prioritization; they do not eliminate the need for patching and review.

## Worked example
```bash
docker image inspect example-app:dev
docker history example-app:dev
# If supported by the installed Docker tooling:
docker scout quickview example-app:dev
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
A vulnerability scanner maps detected components to advisories; results depend on package metadata, database freshness, image platform, and scanner capabilities. An SBOM improves inventory and incident response by answering which components are present in a particular artifact. Provenance helps establish which source and build process produced it. Store scan and provenance results with the image digest so evidence cannot be accidentally associated with a different tag target. Define a remediation policy for critical findings and exceptions with expiry dates.

## Common mistakes and safety notes
Scanner commands and availability depend on installed tooling, account access, and product version; do not assume every Docker installation includes the same scanner. A vulnerability may be unreachable or mitigated, while an unreported vulnerability may still exist. Keep evidence tied to the exact image digest deployed.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Choose a sample image, generate or inspect its component inventory with available tooling, triage findings by severity and exploitability, and write a repeatable rebuild-and-retest procedure.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
