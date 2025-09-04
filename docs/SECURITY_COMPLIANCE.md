# Security, Privacy, and Compliance

## Threat Model (STRIDE)
- Spoofing: MFA (optional), strong password policy, login anomaly detection.
- Tampering: Checksums on exports, signed URLs, database row-level permissions, parameterized queries.
- Repudiation: Comprehensive audit logs (who, what, when, where), immutable storage retention.
- Information Disclosure: Field-level permission checks, encryption in transit (TLS1.2+), at rest (KMS-managed keys), secrets manager.
- Denial of Service: Rate limiting, per-IP throttling, adaptive backoff, WAF/CDN.
- Elevation of Privilege: RBAC, least privilege, secure admin surfaces, review of permission grants.

## Security Controls
- Authentication: JWT access (short TTL) + refresh tokens; rotation; device-bound sessions; optional secure cookies; 2FA TOTP.
- Authorization: Role/permission matrix, route guards (`routes/ProtectedRoute.tsx`), server-side policy checks.
- Input Validation: Central validators under `src/utils/validators/`, server-side schema validation (Zod/JOI).
- Secrets: No secrets in repo. Use environment variables + vault; `.env.example` only placeholders.
- Data Protection: PII minimization, encryption at rest (AES-256), backups encrypted, signed URLs for downloads.
- Network: TLS everywhere, HSTS, secure cookies, CSP, X-Frame-Options, X-Content-Type-Options.
- App Hardening: CSRF tokens for cookie flows, CORS allowlist, content security policy, output encoding.
- Logging/Monitoring: Structured logs, security events, alerting on suspicious activity, trace sampling.
- Backups/DR: Daily snapshots, PITR, tested restore playbooks.

## Compliance Mapping
- FERPA: Access controls by educational need-to-know; audit trails on student record access; data sharing controls.
- GDPR: Lawful basis documentation; DSR workflows (access, rectification, erasure, restriction, portability, objection); data retention schedule; DPA with processors.
- WCAG 2.1 AA: Keyboard navigation, ARIA roles, contrast ratios, focus management, alt text, skip links, form labels, error messaging.

## Privacy by Design
- Default opt-out of marketing; only operational comms.
- Data minimization in analytics.
- Configurable retention and pseudonymization for old responses.

## Operational Security
- Branch protection, code scanning, dependency audit (weekly), SCA alerts triage SLA.
- Release signing and SBOM generation.
- Access reviews for admin and production consoles quarterly.
