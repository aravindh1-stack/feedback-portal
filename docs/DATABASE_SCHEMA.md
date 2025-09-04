# Database Schema (MongoDB)

This document describes the MongoDB collections, schema conventions, indexes, and data access patterns for the College Feedback Portal.

## Conventions
- `_id`: ObjectId unless noted (external IDs also stored like `userId`, `formId` as strings where needed)
- `createdAt`/`updatedAt`: ISO dates, managed by Mongoose timestamps
- Multi-tenancy: include `institutionId` on all multi-tenant collections (optional feature)
- Index naming: `<collection>_<field(s)>_<type>`

## Collections

### users
Key fields
- `email` (unique), `role` in `['student','faculty','admin']`
- `profile` object with contact and preferences
- `academicInfo` (optional)
- `sessions[]` for active devices

Indexes
- `{ email: 1 }` unique
- `{ role: 1, 'academicInfo.department': 1 }`
- TTL for inactive sessions (if storing sessions separately)

### forms
Key fields
- `formId` (unique string), `version` number
- `sections[]` containing `questions[]` with validation, options, conditional logic
- `settings`, `schedule`, `analytics`

Indexes
- `{ formId: 1 }` unique
- `{ isActive: 1, type: 1 }`
- `{ 'targetAudience.roles': 1, 'targetAudience.departments': 1 }`

### responses
Key fields
- `responseId` (unique string)
- `formId` reference (string), `userId` (ObjectId) or `isAnonymous`
- `responses[]` per question with optional `files[]` (GridFS linkage)
- `metadata` (device, ip, userAgent, location)
- `ratings` summary

Indexes
- `{ userId: 1, createdAt: -1 }`
- `{ formId: 1, status: 1 }`
- Text index: `{ 'responses.answer': 'text', 'metadata.keywords': 'text' }`

### courses
Key fields
- Course metadata, `faculty[]`, `enrolledStudents[]`, `feedbackForms[]`

Indexes
- `{ courseId: 1 }` unique
- `{ department: 1, semester: 1 }`

### events
Key fields
- Event metadata, `chiefGuests[]`, `attendees[]`, `feedbackForms[]`, `media[]`

Indexes
- `{ eventId: 1 }` unique
- `{ type: 1, 'schedule.startDate': -1 }`

### notifications
Key fields
- `recipients` (users/roles/departments/criteria), `channels`, `schedule`, `delivery`

Indexes
- `{ status: 1, 'schedule.sendAt': 1 }`
- `{ 'recipients.userIds': 1 }`

### analytics
Key fields
- Aggregated metrics, `type` (daily/weekly/monthly/custom), `dateRange`

Indexes
- `{ type: 1, 'dateRange.start': -1 }`

### audit_logs (recommended)
- Immutable audit trail of critical operations
- Partition by month for lifecycle management

## Example Mongoose Schemas (abridged)
```ts
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, index: true },
  password: String,
  role: { type: String, enum: ['student','faculty','admin'], index: true },
  profile: { /* ... */ },
  academicInfo: { /* ... */ },
  status: { type: String, enum: ['active','inactive','suspended'], default: 'active' },
}, { timestamps: true });

export const User = model('User', UserSchema);
```

## Aggregation Pipelines (samples)
- User engagement (last 30 days): see `database/aggregations/userEngagement.js`
- Course feedback summary: see `database/aggregations/coursePerformance.js`

## GridFS Strategy
- Use GridFS for large uploads; store `gridFSId` in response file entries.
- For small attachments (< 10MB), consider object storage (S3) directly with signed URLs.

## Change Streams
- Watch `responses` for `status=submitted` and publish realtime notifications.

## Retention & Archival
- Define retention periods per institution policy.
- Archive old responses/analytics to cold storage (S3) with references.
