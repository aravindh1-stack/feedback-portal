# Entity Relationship Diagram (ERD)

```mermaid
erDiagram
  USERS ||--o{ USER_ROLES : has
  ROLES ||--o{ USER_ROLES : includes
  ROLES ||--o{ ROLE_PERMISSIONS : grants
  PERMISSIONS ||--o{ ROLE_PERMISSIONS : mapped

  USERS ||--o{ SESSIONS : maintains
  USERS ||--o{ FEEDBACK_RESPONSES : submits
  USERS ||--o{ REPORTS : requests

  COURSES ||--o{ ENROLLMENTS : has
  USERS ||--o{ ENROLLMENTS : participates
  COURSES ||--o{ FEEDBACK_FORMS : uses

  FEEDBACK_FORMS ||--o{ FORM_VERSIONS : versions
  FORM_VERSIONS ||--o{ QUESTIONS : contains
  QUESTIONS ||--o{ QUESTION_OPTIONS : options
  FORM_VERSIONS ||--o{ FORM_ASSIGNMENTS : assigned
  FORM_ASSIGNMENTS ||--o{ FEEDBACK_RESPONSES : collects

  EVENTS ||--o{ EVENT_GUESTS : invited
  EVENTS ||--o{ EVENT_FORMS : uses
  EVENT_FORMS ||--o{ FEEDBACK_RESPONSES : collects

  USERS {
    uuid id PK
    string email UK
    string password_hash
    string first_name
    string last_name
    string role_hint "student|faculty|admin"
    boolean is_active
    timestamp created_at
    timestamp updated_at
  }
  ROLES {
    uuid id PK
    string name UK
    string description
  }
  PERMISSIONS {
    uuid id PK
    string key UK "e.g., feedback.read"
    string description
  }
  USER_ROLES {
    uuid user_id FK
    uuid role_id FK
    timestamp assigned_at
  }
  ROLE_PERMISSIONS {
    uuid role_id FK
    uuid permission_id FK
  }
  SESSIONS {
    uuid id PK
    uuid user_id FK
    string refresh_token_hash
    string ip
    string user_agent
    timestamp expires_at
    timestamp created_at
    timestamp revoked_at
  }
  COURSES {
    uuid id PK
    string code UK
    string name
    string term
    string department
    uuid faculty_owner_id FK
  }
  ENROLLMENTS {
    uuid id PK
    uuid course_id FK
    uuid user_id FK
    string status "enrolled|dropped"
    timestamp enrolled_at
  }
  FEEDBACK_FORMS {
    uuid id PK
    string name
    string scope "course|event|global"
    boolean is_active
    timestamp created_at
    uuid created_by FK
  }
  FORM_VERSIONS {
    uuid id PK
    uuid form_id FK
    int version
    string status "draft|published|archived"
    json schema "compiled schema for runtime"
    timestamp published_at
  }
  QUESTIONS {
    uuid id PK
    uuid form_version_id FK
    int order_index
    string type "rating|text|mcq|matrix"
    string label
    json config
    boolean required
  }
  QUESTION_OPTIONS {
    uuid id PK
    uuid question_id FK
    string value
    string label
    int order_index
  }
  FORM_ASSIGNMENTS {
    uuid id PK
    uuid form_version_id FK
    uuid course_id FK
    date open_at
    date close_at
    boolean allow_anonymous
  }
  FEEDBACK_RESPONSES {
    uuid id PK
    uuid form_assignment_id FK
    uuid responder_id FK
    json answers
    string status "submitted|draft|void"
    timestamp submitted_at
    timestamp created_at
    boolean is_anonymous
  }
  EVENTS {
    uuid id PK
    string name
    date event_date
    string location
    string status "scheduled|completed|cancelled"
  }
  EVENT_GUESTS {
    uuid id PK
    uuid event_id FK
    string name
    string email
    string affiliation
  }
  EVENT_FORMS {
    uuid id PK
    uuid event_id FK
    uuid form_version_id FK
  }
  REPORTS {
    uuid id PK
    uuid requested_by FK
    string type "summary|trend|comparative"
    json params
    string status "queued|processing|ready|failed"
    string output_uri
    timestamp created_at
    timestamp completed_at
  }
```

## Notes
- All `json` columns are validated server-side against TypeScript/JSON Schema.
- Soft-deletes via `is_active` or `status` where appropriate; also maintain audit trails.
- Indexes on foreign keys, `responses(form_assignment_id, responder_id)`, `sessions(user_id, expires_at)`, `enrollments(course_id, user_id)`.
