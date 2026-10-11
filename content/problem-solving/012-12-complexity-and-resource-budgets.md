---
title: "Complexity and Resource Budgets"
order: 12
book: "problem-solving"
---

Complexity describes how resource use changes as input grows. It is not a stopwatch reading for one machine. Big-O notation describes an asymptotic upper bound, while practical performance also depends on constants, memory layout, I/O, runtime behavior, and workload shape.

If an algorithm examines every pair in \(n\) items, its work is proportional to \(n^2\). Doubling the input can roughly quadruple pair checks. If it scans once, work is linear and doubling the input roughly doubles the scan. This growth matters far more at large sizes than a small difference in constant cost.

Always identify the input dimensions. A database join might depend on both table sizes \(n\) and \(m\), not a single \(n\). A string algorithm may depend on both text length and pattern length. Saying “linear” without specifying what it is linear in can conceal a costly dimension.

Time is not the only budget. Memory, network requests, database connections, file descriptors, CPU, battery, and user waiting time can be the limiting resource. An algorithm that is fast but allocates a copy of a multi-gigabyte file may still be unusable.

Average, expected, amortized, and worst-case bounds mean different things. Hash lookup may be expected constant time under assumptions; dynamic-array append is amortized constant time despite occasional resizing; a security-sensitive endpoint may need protection against adversarial worst cases.

Benchmark representative workloads after reasoning about complexity. Measure cold and warm caches, typical and worst-case input, concurrency, and tail latency where relevant. Microbenchmarks can mislead if they omit allocation, network, or integration costs.

**Practice:** Compare three approaches to checking membership in a list of one million values: repeated linear scans, sorting then binary search, and a hash set. Include preprocessing, memory, number of queries, and adversarial concerns.

**Connection:** Complexity analysis informs DSA, SQL query planning, caching, capacity planning, and production performance work.
