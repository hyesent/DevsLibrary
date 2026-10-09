# 025. Performance, Capacity, and Resilience Engineering

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 25 of 30

## Learning goals
- Measure throughput and latency under realistic load.
- Avoid unbounded resource use.
- Design graceful behavior when dependencies fail.

Latency budgets are shared across DNS, connection setup, application work, database queries, and downstream calls. Set explicit timeouts at each boundary, with an overall request deadline where feasible. A client timeout shorter than the server's work duration can leave expensive work running after the caller has given up.

Use load tests that resemble real traffic and data sizes. Monitor p50, p95, p99, error rate, saturation, connection pools, queue depth, and database query time. Protect against N+1 queries, unbounded page sizes, expensive regular expressions, and high-cost user-controlled filters.

Resilience patterns include bounded retries, circuit breakers, bulkheads, load shedding, graceful degradation, and backpressure. Each adds complexity and should be applied to a specific failure mode. A fallback must not return misleading or unsafe data.

## Practice
Create a load-test plan for a search API. Define a traffic profile, success criteria, monitored signals, and what happens when the database slows down.
