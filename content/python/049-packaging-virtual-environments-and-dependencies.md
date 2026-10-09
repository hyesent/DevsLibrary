---
title: "Packaging, Virtual Environments, and Dependencies"
order: 49
book: "python"
---

# Packaging, Virtual Environments, and Dependencies

## Core model

A virtual environment isolates an interpreter environment's installed packages from other projects. Packaging defines how code is installed, discovered, and imported; dependency declarations communicate which external distributions the project requires. A working directory with packages installed globally is not a reproducible deployment specification.

## How it behaves in real code

Pinning every dependency exactly improves repeatability but does not alone guarantee a secure or portable build; platform markers, Python versions, native dependencies, and transitive dependencies also matter. A lockfile and declared package metadata serve related but distinct purposes depending on the toolchain.

## Reasoning exercise

Create a clean environment and install the project using its documented setup. If that fails, the project depends on undeclared local state. Make build and test commands repeatable for another developer or CI runner.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
