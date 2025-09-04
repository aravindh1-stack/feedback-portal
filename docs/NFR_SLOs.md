# Non-Functional Requirements and SLOs

## Performance
- P95 page load (TTI) <= 3.5s on 4G; P95 API latency <= 300ms; heavy analytics endpoints <= 1.5s.
- Lighthouse Performance >= 85 on mid-tier devices.

## Availability
- Target 99.9% monthly uptime (approx. <= 43m downtime/month).
- Zero data-loss objective for submitted feedback. RPO <= 15m, RTO <= 60m.

## Scalability
- Horizontal scaling for API and workers; read replicas for DB; cache frequently accessed resources.
- Queue-based async for reports and notifications; backpressure handling.

## Security
- Zero critical known vulnerabilities; medium within 14 days, high within 7 days remediation SLA.

## Observability
- Metrics: latency, throughput, error rate, saturation.
- Tracing: end-to-end traces from web to DB.
- Logging: structured JSON logs; correlation IDs.

## Reliability
- Circuit breakers on external providers; retries with jitter; idempotent handlers.

## Accessibility
- WCAG 2.1 AA adherence measured via axe-core CI step.

## Maintainability
- ESLint clean; Prettier enforced; unit test coverage >= 70%, critical flows >= 85%.
