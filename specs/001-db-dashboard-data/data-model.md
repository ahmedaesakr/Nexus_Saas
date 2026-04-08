# Phase 1: Data Model

## Prisma Schema Entities

### Project
- **id**: String (Primary Key, UUID/CUID)
- **name**: String
- **description**: String?
- **status**: String (ACTIVE, ARCHIVED)
- **organizationId**: String (Foreign Key to Organization)
- **createdAt**: DateTime
- **updatedAt**: DateTime

### Task
- **id**: String (Primary Key)
- **title**: String
- **status**: String (TODO, IN_PROGRESS, IN_REVIEW, DONE)
- **priority**: String (LOW, MEDIUM, HIGH, URGENT)
- **projectId**: String (Foreign Key to Project)
- **assigneeId**: String? (Foreign Key to User)
- **organizationId**: String (Foreign Key to Organization) - Required for cross-tenant scoping rules.
- **createdAt**: DateTime
- **updatedAt**: DateTime

## Validation Rules
- `Task.status` forms the column groupings on the Kanban board.
- `Task.priority` determines the visual tag color (e.g. Red for URGENT, Blue for LOW).
- All reads MUST enforce `where: { organizationId: session.user.organizationId }`.
