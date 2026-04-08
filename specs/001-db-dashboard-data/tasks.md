# Tasks: Database Dashboard Data

**Input**: Design documents from `/specs/001-db-dashboard-data/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

*(No repository-level scaffolding is required since this is a refactoring feature inside an existing Next.js App Router project.)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T001 Update `app/prisma/schema.prisma` mapping `Task` and `Project` models.
- [x] T002 Execute Prisma database structure push and regenerate generated typed clients.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Real KPI Metrics (Priority: P1) 🎯 MVP

**Goal**: As a user, I want to see my actual project and system metrics on the dashboard, so that I can accurately monitor my systems.

**Independent Test**: Can be tested independently by logging in and verifying that the CPU load and active project summaries match database records.

### Implementation for User Story 1

- [x] T003 [P] [US1] Remove static placeholder arrays from `app/src/app/(dashboard)/dashboard/page.tsx`.
- [x] T004 [P] [US1] Refactor `app/src/app/(dashboard)/dashboard/page.tsx` to fetch true system metrics and active `Project` counts strictly scoped by NextAuth `session.user.organizationId` via Prisma.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Track Kanban Work in Project Workspace (Priority: P1)

**Goal**: As a user, I want the Kanban board columns and cards to populate from the database, so I can persistently track my team's operations.

**Independent Test**: Data displayed on the workspace board matches the Task rows in the Database.

### Implementation for User Story 2

- [x] T005 [P] [US2] Refactor `app/src/app/(dashboard)/workspace/page.tsx` to read `Task` data filtered by `organizationId`.
- [x] T006 [P] [US2] Group query results into Kanban columns (TODO, IN_PROGRESS, etc) utilizing `loading.tsx` for boundaries.
- [x] T007 [US2] Add empty state rendering when no tasks are found for the tenant organization.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Tabular Data Command Views (Priority: P2)

**Goal**: As a user, I want the tabular task registry to show real rows so I can bulk-view items.

**Independent Test**: Validated by confirming the tabular list accurately displays database records.

### Implementation for User Story 3

- [x] T008 [P] [US3] Refactor `app/src/app/(dashboard)/data/page.tsx` to query and format tabular `Task` rows substituting the mock arrays.

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T009 [P] Global replacement of the static placeholder generic user "Alex Chen" avatar across Dashboard app bar/headers with the dynamic NextAuth `session.user` details.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: N/A
- **Foundational (Phase 2)**: BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Can start after Foundational (Phase 2)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2)

### Parallel Opportunities

- All Foundational tasks must be sequential due to Prisma push workflow.
- All tasks marked [P] inside US1, US2, and US3 can run in parallel by different workers once the schema generation resolves.
