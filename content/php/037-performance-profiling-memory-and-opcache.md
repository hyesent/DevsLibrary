# 037. Performance, Profiling, Memory, and OPcache

> Book: PHP · Level: beginner to advanced · Part 37 of 45

# Learning goals
- Measure before optimizing.
- Identify common PHP performance bottlenecks.
- Understand request-level memory and opcode caching.

Measure realistic workloads before changing code. Slow requests often come from database query patterns, network dependencies, excessive serialization, or repeated work—not simply PHP syntax. Use application timing, query logs, profilers, and representative load tests to identify the dominant cost.

PHP requests commonly have a request lifecycle, but CLI workers may be long-lived. Memory leaks and stale global state therefore have different implications in each context. Avoid loading huge files into memory, N+1 database queries, unbounded collections, and unnecessary object graphs.

OPcache stores compiled PHP bytecode to reduce repeated compilation. Its deployment and invalidation behavior must match the release process. Benchmark cold and warm behavior separately when it matters. Optimize algorithmic complexity and I/O first; micro-optimizations should be evidence-driven.

## Practice
Profile a slow list endpoint. Record baseline latency, query count, memory use, and throughput, then make one change and compare under the same conditions.
