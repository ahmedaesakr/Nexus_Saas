# Feature Specification: Database Dashboard Data

**Feature Branch**: `001-db-dashboard-data`  
**Created**: 2026-04-08  
**Status**: Draft  
**Input**: User description: "Replace mock data in dashboard pages with real database queries"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Real KPI Metrics (Priority: P1)

As a user, I want to see my actual project and system metrics on the dashboard, so that I can accurately monitor my systems.

**Why this priority**: Essential to fulfilling the dashboard's primary purpose.

**Independent Test**: Can be tested independently by logging in and verifying that the CPU load and active project summaries match database records.

**Acceptance Scenarios**:

1. **Given** a user is logged in, **When** they view the dashboard, **Then** all statistics (CPU, Storage, Latency) reflect live server status data or aggregated database metrics.

---

### User Story 2 - Track Kanban Work in Project Workspace (Priority: P1)

As a user, I want the Kanban board columns and cards to populate from the database, so I can persistently track my team's operations.

**Why this priority**: State management and persistence are the foundational features of a task tracker.

**Independent Test**: Data displayed on the workspace board matches the Task rows in the Database.

**Acceptance Scenarios**:

1. **Given** tasks exist in the database, **When** the user loads the Workspace board, **Then** the cards are grouped accurately by their status.
2. **Given** a database update occurs, **When** the board is refreshed, **Then** the UI reflects the updated card state.

---

### User Story 3 - Tabular Data Command Views (Priority: P2)

As a user, I want the tabular task registry to show real rows so I can bulk-view items.

**Why this priority**: A secondary view to the kanban board, but critical for bulk operations.

**Independent Test**: Validated by confirming the tabular list accurately displays database records.

**Acceptance Scenarios**:

1. **Given** tasks exist, **When** the Data Command page is viewed, **Then** a table of tasks is generated mapping to database columns (ID, Name, Owner, Priority, Status).

### Edge Cases

- What happens when the database query fails or times out? (The system must show an elegant error state boundary).
- How is the view handled when a user or organization has no projects or tasks? (The system must display a helpful empty state).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST fetch task, project, and server metrics via Prisma ORM for the Mission Control dashboard.
- **FR-002**: System MUST render Kanban layout cards in the Workspace purely from database Task state.
- **FR-003**: System MUST populate the Data Command table using Prisma queries instead of the static arrays.
- **FR-004**: System MUST ensure that fetched records strictly respect the logged-in User's `organizationId` based on the session token (Data isolation).
- **FR-005**: Real User data (name, avatar, role) MUST populate throughout the Dashboard UI headers instead of the hardcoded mock user identity.

### Key Entities

- **User**: Represents a logged-in identity connected to an Organization.
- **Organization**: The tenant boundary separating records cross-environment.
- **Task/Project**: New schema entities that must be modeled to support the current visual mockups.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of hardcoded "mock" placeholders in `dashboard/page.tsx`, `workspace/page.tsx`, and `data/page.tsx` are fully replaced by database records.
- **SC-002**: Page load time for dashboard views remains under 500ms when utilizing native Server Components data fetching.
- **SC-003**: Unauthorized users or users from different organizations can never query or view another organization's data records.

## Assumptions

- We will need to expand the Prisma schema (which currently only has `User`/`Account`/`Org`) to include `Task` and `Project` models missing from the initial template.
- Since we are using Next.js 14 App Router, data fetching will occur directly inside Server Components (`page.tsx`) without needing to route through independent API endpoints.
