# Cost Management and Capacity Planning

## Learning goals
Estimate the cost of a service, prevent avoidable billing surprises and optimize without sacrificing reliability blindly.

## Model the whole bill
Costs can include compute time, memory, storage capacity and operations, database instance size, backups, network transfer, public IPs, load balancers, logs, build minutes, managed service requests and support plans. Free tiers have limits and conditions; do not build a production forecast around a promotional allowance without understanding when it ends.

## Tag and attribute resources
Use consistent labels for environment, service, owner and cost center where supported. Untagged shared infrastructure makes attribution difficult. Budgets and alerts can provide early warning, but they may not stop spending automatically and can arrive after usage has occurred. Verify what each billing control actually does.

## Capacity and autoscaling
Autoscaling can respond to load but needs meaningful signals, warm-up time, minimum and maximum limits, and dependency capacity. Scaling application instances while allowing each to open an unlimited database pool can make an outage worse. Model the maximum number of instances times the per-instance connection limit.

## Optimize with evidence
Measure utilization and latency before downsizing. Rightsizing an oversized idle machine can save money; shrinking a database until queries time out can create hidden costs and user impact. Evaluate reserved or committed-use discounts only when workload stability and contract terms justify them. Consider engineering time and outage risk alongside infrastructure price.

## Egress and observability costs
Data transfer across regions or out to the internet may be billed. Excessive logs, high-cardinality metrics and unbounded trace retention can become major expenses. Apply retention and sampling policies that preserve the evidence needed for operations and compliance.

## Practice
Create a rough monthly cost model for an API, database, object storage, CDN, logs and backups. State assumptions for request volume, data transfer and retention. Add budget alerts and an owner. Identify one optimization that reduces cost and one that could create unacceptable reliability risk.
