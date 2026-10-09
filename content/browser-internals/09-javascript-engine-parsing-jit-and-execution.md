# JavaScript Engines: Parsing, JIT, and Execution

> DevsLibrary · Browser Internals · Lesson 09

## From source to execution
A JavaScript engine parses source code, creates internal representations, and executes it. Modern engines may use interpreters and just-in-time compilers, collecting runtime feedback to optimize frequently executed code. Optimizations can be invalidated when assumptions stop holding.

## Language semantics still matter
Engines must preserve JavaScript's observable behavior. Optimized code can deoptimize when object shapes, types, or execution patterns differ from assumptions. Developers should prioritize clear algorithms and measurements rather than coding to folklore about engine internals.

## Modules and scope
Modules have their own scope and dependency graph. Static imports allow tooling and engines to analyze dependencies. Dynamic `import()` loads modules on demand. Module scripts are strict by default and use module-specific resolution rules.

## Main-thread work
Long-running JavaScript can delay input processing, style calculation, and rendering on the main thread. Break up expensive tasks when possible, move suitable computation to workers, and avoid unnecessary work during interaction.

## Exercise
Profile a CPU-heavy loop and a version that yields work across tasks. Observe responsiveness and total duration. Explain the trade-off between throughput and interaction latency.
