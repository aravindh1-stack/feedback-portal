# Implementation Roadmap

## Phase 0 — Foundations (Week 1)
- Repo setup, linting/formatting, Husky + lint-staged, CI (build, test, lint).
- Base scaffolding per `src/` structure with placeholders and shared UI atoms.

## Phase 1 — Authentication & RBAC (Weeks 2-3)
- Auth flows (login, refresh, logout), ProtectedRoute, RouteGuard, roles/permissions.
- Basic Admin: minimal user list and role assignment.

## Phase 2 — Student MVP (Weeks 4-6)
- Assigned forms list, form fill (rating/text/mcq), autosave drafts, submit.
- Feedback history and profile management.
- Notifications (in-app), email reminders (basic).

## Phase 3 — Faculty Analytics (Weeks 7-9)
- Faculty dashboard, filters (course/term/question), trend charts, participation metrics.
- Export CSV/PDF for summary.

## Phase 4 — Admin Form Builder (Weeks 10-13)
- Drag-and-drop builder, versioning, assignment windows, templates, preview.

## Phase 5 — Reports & Scheduling (Weeks 14-15)
- Report generator, async jobs, scheduled reports, secure downloads.

## Phase 6 — Chief Guest Module (Weeks 16-17)
- Event management, guest management, public QR feedback capture, post-event analytics.

## Cross-cutting
- Accessibility audits, i18n groundwork, performance tuning, observability dashboards, security hardening.

## Milestones & DOR/DOD
- Each feature has acceptance criteria, test coverage, and documentation updates.
- DOD: passing CI, accessibility checks, perf budgets respected, security scan clean.
