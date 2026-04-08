<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- Modified principles: Initialized 5 core Nexus principles (App Router, Design, Security, Types, DB Access).
- Added sections: Development Workflow, Architecture Constraints.
- Removed sections: N/A
- Templates requiring updates: ✅ None required (initial setup)
- Follow-up TODOs: Determine full production database migration plan.
-->
# Nexus Flow Constitution

## Core Principles

### I. Next.js App Router First
All routing and rendering must strictly follow Next.js 14 App Router conventions. Server Components (`page.tsx`, `layout.tsx`) are the default state. Client boundaries (`"use client"`) must be pushed down the component tree as deeply as possible to maximize server-side performance.

### II. Secure Authentication & Data Isolation
Security is non-negotiable. All `/dashboard` routes and API endpoints must be protected by NextAuth middleware. Every database query must incorporate strict Organization ID checks to ensure cross-tenant data isolation.

### III. Premium "Dark-Mode Operational OS" Aesthetic
The application must maintain its premium, command-center visual aesthetic. This dictates a dark foundation (`#0a0a0a`), strict use of the established accent colors (Green for healthy, Yellow for warnings, Red for critical), and implementation of subtle micro-interactions across actionable UI elements. All new styles must use Tailwind CSS utility classes defined in `globals.css`.

### IV. Strict Type Safety & Validation
TypeScript `strict` mode is mandatory. All incoming data vectors, including API route bodies and Server Action parameters, must be explicitly validated using `zod` schemas before any backend logic or database interaction occurs.

### V. Prisma Single Source of Truth
Prisma ORM is the exclusive mechanism for interacting with the database. Schema migrations must be meticulously tracked. Avoid raw SQL queries unless absolute performance bottlenecks in complex reporting require them.

## Development Workflow

- **Branching:** Work occurs on feature branches branched from `main`. Commit messages must follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`).
- **Quality Gates:** Code logic must pass TypeScript compilation and ESLint validation locally prior to pushing. 
- **Component Design:** Components must favor composition. Break down massive files into focused, single-responsibility components (e.g., separating layouts from interactive forms).

## Architecture Constraints

- **Frontend:** Next.js (App Router), React 18, Tailwind CSS, Framer Motion for animations.
- **Backend/Auth:** NextAuth.js configured with Prisma Adapter.
- **Data Layer:** Currently operating on SQLite (via Prisma) for local development; architectures must be written generically to support a seamless migration to PostgreSQL for production deployments.

## Governance

This Constitution supersedes all other documentation and dictates the "Nexus way" of development. 
Any architectural decisions that conflict with these principles must be formally proposed and the Constitution amended. 

**Version**: 1.0.0 | **Ratified**: 2026-04-08 | **Last Amended**: 2026-04-08
