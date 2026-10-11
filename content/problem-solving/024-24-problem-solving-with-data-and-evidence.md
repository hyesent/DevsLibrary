---
title: "Problem Solving with Data and Evidence"
order: 24
book: "problem-solving"
---

Data can reduce uncertainty, but only if it measures the right thing and is interpreted carefully. A chart or benchmark is not automatically evidence for the claim someone wants to make.

Start with a question. “Is the new search implementation faster?” needs a defined workload, baseline, environment, and latency measure. Average latency alone can hide slow outliers; a single run can be dominated by noise. Repeat measurements and report distributions or percentiles where they matter.

Distinguish correlation from causation. Error rates rising after a deployment makes the deployment a plausible cause, but traffic changes or a dependency outage may be involved. Compare affected and unaffected paths, inspect timelines, and use controlled experiments when safe.

Watch for selection bias. Benchmarking only successful requests excludes timeouts. Testing only modern devices excludes low-end hardware. Surveying only highly engaged users may miss people who abandoned the product. Ask who or what is absent from the dataset.

Instrumentation should respect privacy and minimize collection. More data is not always better. Define retention, access, aggregation, and redaction rules before collecting sensitive events.

Prefer measurements that can change a decision. If two implementations are indistinguishable within measurement noise and both meet the budget, maintainability may matter more than chasing an uncertain micro-optimization.

**Practice:** A dashboard reports that page load time improved by 30%. List at least six questions you would ask before attributing the improvement to a code change.

**Connection:** Evidence-based reasoning supports performance work, product decisions, reliability, accessibility audits, and capacity planning.
