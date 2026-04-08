# Phase 0: Outline & Research

## Research Tasks Resolved

### 1. Database Schema Additions for Kanban & Tables
- **Decision**: Introduce `Task` and `Project` models into Prisma schema.
- **Rationale**: The mock dashboard heavily relies on arrays of Task objects containing `status`, `title`, `priority`, and `date` fields, grouped under different states. Adding these objects to the official schema ensures types match effectively.
- **Alternatives considered**: Storing tasks in a NoSQL document format, but this violates the "Prisma Single Source of Truth" governance rule which intends to migrate to PostgreSQL.

### 2. Tenant Isolation
- **Decision**: All new models must include an `organizationId` matching the parent `Organization` record.
- **Rationale**: The constitution demands strict isolation by organization, not just by individual user. Server Components will retrieve the active session `token.organizationId` and use it exclusively in the `where` clauses of Prisma `.findMany()` calls.
- **Alternatives considered**: Passing org IDs via client-side requests (Unsafe).

### 3. Loading UI
- **Decision**: Utilize Next.js `loading.tsx` React Suspense bounds instead of `useState` loaders.
- **Rationale**: Aligns completely with Next.js App Router rules. Eliminates `use client` needs for data fetching.
