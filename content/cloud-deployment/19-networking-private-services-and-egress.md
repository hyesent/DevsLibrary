# Networking, Private Services, and Egress

## Learning goals
Plan connectivity between cloud components and control both inbound exposure and outbound access.

## Network boundaries
Cloud networks often contain subnets, route tables, firewalls or security groups, gateways and private service endpoints. The exact terminology varies by provider. Public subnet does not necessarily mean every resource has a public IP, and a private subnet does not necessarily mean outbound access is impossible. Inspect routes, address assignment and firewall rules together.

## Ingress and egress
Ingress is traffic entering a service; egress is traffic leaving it. Teams often tightly control ingress while allowing unrestricted egress. That can let a compromised application exfiltrate data or reach unexpected external services. Where risk warrants it, restrict egress to required destinations, use managed NAT or egress proxies, and log important outbound flows. Understand the operational cost and availability impact of these controls.

## Private service access
Private endpoints can reduce exposure when connecting to managed databases, object storage or internal APIs. They do not replace identity checks or encryption. DNS resolution must point to the correct private endpoint, and route/security rules must permit the connection. Test from the actual workload identity and network location, not only from an administrator’s laptop.

## Avoid broad rules
Rules allowing all ports from all sources are easy to create and hard to justify. Prefer the minimum ports and sources required. Separate management access from user traffic and use a controlled access path rather than exposing SSH or database administration directly to the internet.

## Troubleshooting sequence
Check name resolution, route selection, firewall rules, target listener, TLS settings and application authorization in order. A connection timeout often indicates routing or packet filtering; a fast connection refusal suggests the host was reached but nothing accepted the port. These are clues, not definitive proof, especially when intermediaries hide details.

## Practice
Draw network paths for browser → public endpoint → API → database and API → object storage. Label public and private hops, identity controls, encryption, egress destinations and logging. Then explain how to test connectivity without temporarily opening every port to the internet.
