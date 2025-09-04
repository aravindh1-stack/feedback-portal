# API Specification

Base URL: `/api/v1`
Auth: Bearer JWT in `Authorization` header. Refresh via `/auth/refresh`. CSRF protection for cookie-based flows.
Pagination: `page`, `limit` (default 20). Responses include `total`, `page`, `limit`.
Filtering: Query params with exact match or `gt, gte, lt, lte, like, in` operators via `field__op=value`.
Sorting: `sort=field,-otherField`.
Idempotency: `Idempotency-Key` header for POST operations where relevant.

## Auth
- POST `/auth/login` — email, password
- POST `/auth/refresh`
- POST `/auth/logout`
- POST `/auth/forgot-password`
- POST `/auth/reset-password`
- POST `/auth/2fa/verify` (optional)

```http
POST /api/v1/auth/login
Content-Type: application/json

{ "email": "user@college.edu", "password": "P@ssw0rd!" }
```
```json
{
  "accessToken": "<jwt>",
  "refreshToken": "<jwt>",
  "user": { "id": "uuid", "email": "user@college.edu", "roles": ["student"] }
}
```

## Users
- GET `/users` (RBAC: admin)
- POST `/users` (admin)
- GET `/users/:id` (self or admin)
- PATCH `/users/:id` (self or admin)
- DELETE `/users/:id` (admin)
- POST `/users/bulk-import` (admin)

## Roles & Permissions
- GET `/roles` (admin)
- POST `/roles` (admin)
- PATCH `/roles/:id` (admin)
- GET `/permissions` (admin)

## Courses & Enrollments
- GET `/courses` (faculty/admin)
- POST `/courses` (faculty/admin)
- GET `/courses/:id`
- PATCH `/courses/:id`
- GET `/courses/:id/enrollments`
- POST `/courses/:id/enrollments`

## Forms & Questions
- GET `/forms`
- POST `/forms` (admin)
- GET `/forms/:id`
- POST `/forms/:id/versions` (admin)
- GET `/forms/:id/versions/:version`
- POST `/forms/:id/versions/:version/publish` (admin)
- POST `/forms/:id/versions/:version/assign` (admin)

### Question Editor Helpers
- GET `/forms/:id/versions/:version/questions`
- POST `/forms/:id/versions/:version/questions`
- PATCH `/questions/:questionId`
- DELETE `/questions/:questionId`

## Feedback
- GET `/assignments` — forms assigned to current user
- GET `/assignments/:id` — details (open/close, course)
- POST `/assignments/:id/responses` — create or autosave draft
- PATCH `/responses/:id` — update draft
- POST `/responses/:id/submit` — final submit
- GET `/responses` — list own responses

## Analytics & Reports
- GET `/analytics/overview` (faculty/admin)
- GET `/analytics/trends` (faculty/admin)
- GET `/analytics/compare` (faculty/admin)
- POST `/reports` — enqueue report generation
- GET `/reports/:id` — status + signed URL if ready

## Notifications
- GET `/notifications` — in-app
- PATCH `/notifications/:id/read`
- POST `/notifications/test` (admin)

## Chief Guest / Events
- GET `/events`
- POST `/events` (admin)
- GET `/events/:id`
- PATCH `/events/:id`
- POST `/events/:id/guests`
- POST `/events/:id/forms/:formVersionId/assign`
- POST `/events/:id/collect` — public/QR endpoint to capture feedback

## Error Format
```json
{
  "error": {
    "code": "string",
    "message": "human readable",
    "details": {"field": "issue"}
  }
}
```

## Schemas (abridged)
```ts
// User
interface User { id: string; email: string; firstName: string; lastName: string; roles: string[]; isActive: boolean; }

// Form Version
interface FormVersion { id: string; formId: string; version: number; status: 'draft'|'published'|'archived'; schema: any; }

// Assignment
interface Assignment { id: string; formVersionId: string; courseId?: string; openAt: string; closeAt: string; allowAnonymous: boolean; }

// Response
interface FeedbackResponse { id: string; formAssignmentId: string; responderId?: string; answers: any; status: 'draft'|'submitted'|'void'; submittedAt?: string; isAnonymous: boolean; }
```
