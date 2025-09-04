# Architecture Overview

This document provides a C4-style overview of the College Feedback Portal.

## System Context (C4: Level 1)
```mermaid
C4Context
title System Context Diagram - College Feedback Portal
Person(student, "Student", "Submits feedback, views history, manages profile")
Person(faculty, "Faculty", "Analyzes feedback, manages courses, creates action plans")
Person(admin, "Administrator", "Manages users, forms, reports, and system settings")
System(system, "College Feedback Portal", "Web-based feedback management platform")
System_Ext(email, "Email/SMS Gateway", "Transactional email/SMS provider")
System_Ext(lms, "LMS/SIS", "Learning/Student Information System")

Rel(student, system, "Uses", "HTTPS")
Rel(faculty, system, "Uses", "HTTPS")
Rel(admin, system, "Uses", "HTTPS")
Rel(system, email, "Sends notifications")
Rel(system, lms, "Imports roster, courses, events")
```

## Container Diagram (C4: Level 2)
```mermaid
C4Container
title Container Diagram - College Feedback Portal
Person(student, "Student")
Person(faculty, "Faculty")
Person(admin, "Administrator")

System_Boundary(s1, "College Feedback Portal"){
  Container(web, "Web App (React + TS)", "React 18, TypeScript, Tailwind", "SPA served statically, communicates with API via REST")
  Container(api, "API Server", "Node.js (NestJS/Express)", "Auth, Users, Feedback, Forms, Reports, Notifications")
  ContainerDb(db, "Relational DB", "PostgreSQL", "Users, Roles, Forms, Responses, Courses, Events, Reports")
  Container(queue, "Message Queue", "RabbitMQ/SQS", "Async processing: email, report generation, analytics")
  Container(cache, "Cache", "Redis", "Sessions, rate limiting, caching")
  Container(storage, "Object Storage", "S3/Blob Storage", "Exports, attachments, backups")
}
System_Ext(email, "Email/SMS Gateway")
System_Ext(lms, "LMS/SIS")

Rel(student, web, "Uses", "HTTPS")
Rel(faculty, web, "Uses", "HTTPS")
Rel(admin, web, "Uses", "HTTPS")
Rel(web, api, "REST/JSON over HTTPS")
Rel(api, db, "SQL")
Rel(api, cache, "Cache + Session Store")
Rel(api, queue, "Publishes tasks")
Rel(queue, email, "Sends notifications")
Rel(api, storage, "File operations")
Rel(api, lms, "Imports data", "OAuth2/API Key")
```

## Component Diagram (C4: Level 3) - Frontend
```mermaid
C4Component
title Component Diagram - Web App (React)
Container(web, "Web App (React + TS)")
Component(routes, "Routing", "React Router")
Component(auth_ctx, "AuthContext + useAuth", "JWT, RBAC, session mgmt")
Component(feedback_ctx, "FeedbackContext + useFeedback", "CRUD, caching")
Component(admin_ctx, "AdminContext", "Users, forms, reports")
Component(notify_ctx, "NotificationContext", "Toasts, in-app notifications")
Component(theme_ctx, "ThemeContext", "Theme switching")
Component(ui, "UI Components", "Common, Student, Faculty, Admin")
Component(services, "API Services", "Axios w/ interceptors")

Rel(routes, ui, "Routes render pages/components")
Rel(ui, auth_ctx, "Use")
Rel(ui, feedback_ctx, "Use")
Rel(ui, admin_ctx, "Use")
Rel(ui, notify_ctx, "Use")
Rel(ui, theme_ctx, "Use")
Rel(services, auth_ctx, "Token attach/refresh")
Rel(ui, services, "REST calls")
```

## Deployment Diagram (C4: Level 4)
```mermaid
flowchart LR
  subgraph Client
    B[Browser]
  end
  subgraph Cloud
    A[CDN + Static Hosting]
    C[API Service - Containerized]
    D[(PostgreSQL - Managed DB)]
    E[Redis - Managed]
    F[Queue - Managed]
    G[S3/Blob Storage]
    H[Email/SMS Provider]
  end

  B -- HTTPS --> A
  B -- HTTPS --> C
  A -- CI/CD Deploy --> A
  C -- SQL --> D
  C -- TCP --> E
  C -- AMQP/HTTPS --> F
  F -- HTTPS --> H
  C -- HTTPS --> G
```

## Cross-cutting Concerns
- Authentication: JWT access + refresh, rotation, revocation, secure cookies optional.
- Authorization: RBAC with permissions mapped to routes and API scopes.
- Observability: OpenTelemetry traces, structured logs, metrics (latency, error rate), dashboards.
- Resilience: Retries, circuit breakers, timeouts, bulkheads.
- Performance: Code splitting, caching, pagination, indexing.
