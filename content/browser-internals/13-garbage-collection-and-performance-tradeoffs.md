# Garbage Collection and Performance Trade-offs

> DevsLibrary · Browser Internals · Lesson 13

## Why collection happens
Garbage collectors reclaim unreachable memory and may use generational, incremental, concurrent, or compacting techniques. Exact algorithms vary by engine and release. New short-lived objects may be cheap to allocate, but allocation volume can still trigger collection work and pauses or background CPU use.

## Avoid premature optimization
Do not avoid readable code merely to reduce a few allocations without evidence. First measure the workload, identify allocation hot spots, and verify that an optimization improves realistic performance. Reusing mutable objects can sometimes complicate correctness and retain data longer than necessary.

## Memory pressure
Memory pressure can cause more frequent collection, tab discarding, or process termination depending on the browser and platform. Mobile devices often have tighter limits than desktop development machines.

## Exercise
Profile an allocation-heavy rendering loop. Compare a straightforward version with a measured optimization. Record total CPU time, memory use, and code complexity, and decide whether the change is worthwhile.
