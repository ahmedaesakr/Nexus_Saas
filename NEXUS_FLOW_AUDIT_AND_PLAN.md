# Nexus Flow — Complete Project Audit & Development Plan

> **Audit Date:** 2026-02-10
> **Files Audited:** 59 source files (`.ts`/`.tsx`), 1 Prisma schema, 1 `.env`, 3 config files, 3 markdown docs
> **Verdict:** Good prototype foundation with several critical issues, dead code, and missing features.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Critical Bugs & Issues](#2-critical-bugs--issues)
3. [Dead / Unused Code](#3-dead--unused-code)
4. [Design Inconsistencies](#4-design-inconsistencies)
5. [Code Quality Issues](#5-code-quality-issues)
6. [File-by-File Audit Notes](#6-file-by-file-audit-notes)
7. [Current Feature Completion Status](#7-current-feature-completion-status)
8. [Development Plan — Phased Roadmap](#8-development-plan--phased-roadmap)

---

## 1. Executive Summary

### What Exists (✅ Good)
- **Auth system** works with NextAuth v5 + credential bypass for dev/demo
- **Workflow Builder** with React Flow — 6 custom node types (Trigger, Action, Agent, Condition, Loop, Delay)
- **Landing page** with hero, features bento grid, pricing, FAQ, testimonials, CTA, footer
- **Dashboard pages** for all major sections (Workflows, Agents, Executions, Integrations, Team, Settings, Templates)
- **Onboarding modal** with 5-step wizard (Role → Goals → Template → Integrations → Completion)
- **Prisma schema** with complete data model (User, Org, Workflow, Agent, Execution, ExecutionLog, Integration)
- **Design system** in `globals.css` with Midnight Nexus palette, liquid glass effects, animations
- **SEO setup** with sitemap, robots.txt, manifest, proper metadata

### What's Broken (🔴 Critical)
- `OverviewChart.tsx` uses **light-mode colors** (white background, gray gridlines) in a dark-mode app
- `analytics/page.tsx` uses **old DAM references** and light/dark mode classes inconsistent with the rest of the app
- `settings/layout.tsx` still says **"Nexus DAM"** in its description
- `sitemap.ts` references **`/assets`** — a route that doesn't exist (old DAM artifact)
- `WorkflowBuilder.tsx` has **unused imports** (`useNodesState`, `useEdgesState`, `addEdge`, `applyNodeChanges`) and **unused variables** (`initialNodes`, `initialEdges`, `id`, `getId`)
- `middleware.ts` only protects `/dashboard` route — all other dashboard routes (`/workflows`, `/agents`, etc.) are **unprotected**
- `SignupForm.tsx` has a **fake signup** (just `setTimeout` → redirect) with no actual auth logic

### What's Missing (⚠️ Gaps)
- **No `public/` assets** — manifest references icons that don't exist
- **No mobile responsive sidebar** — fixed 256px sidebar with no hamburger menu
- **No toast notification system** — workflow builder uses `alert()` for validation
- **No real data fetching** — all pages use hardcoded mock data
- **No error boundaries** — no error.tsx or not-found.tsx pages
- **No loading states** — no loading.tsx skeleton pages
- **No Navbar component** — landing page has no navigation header

---

## 2. Critical Bugs & Issues

### 🔴 BUG-01: Middleware Only Protects `/dashboard`
**File:** `src/middleware.ts`
**Problem:** The middleware checks `req.nextUrl.pathname.startsWith("/dashboard")` but routes like `/workflows`, `/agents`, `/executions`, `/integrations`, `/settings`, `/users`, `/templates` are NOT prefixed with `/dashboard` in the URL because they are in the `(dashboard)` route group. The actual paths are `/workflows/builder`, `/agents`, etc.
**Impact:** All dashboard sub-pages are accessible without authentication.
**Fix:** Update middleware to check all protected routes, or restructure routes under `/dashboard/*`.

### 🔴 BUG-02: OverviewChart Uses Light-Mode Styling
**File:** `src/components/dashboard/OverviewChart.tsx`
**Problem:** CartesianGrid uses `stroke="#e5e7eb"` (light gray), Tooltip has `backgroundColor: '#fff'` and white border. The entire app is dark-mode `#050a14`.
**Impact:** Chart looks completely broken in the dark UI — white tooltip on dark background has no contrast, grid lines are invisible.
**Fix:** Rewrite chart with dark-mode colors: dark tooltip, subtle grid lines, proper dark theme.

### 🔴 BUG-03: signInSchema Imported But Never Used in Auth
**File:** `src/lib/auth.ts`
**Problem:** Line 8 imports `signInSchema` from `./validators` with the comment "We'll create this later" even though it already exists. However, the schema is never actually used for validation in the `authorize` callback.
**Impact:** No input validation on login credentials.
**Fix:** Actually validate credentials with `signInSchema.parse()` before processing.

### 🔴 BUG-04: Sitemap References Non-Existent `/assets` Route
**File:** `src/app/sitemap.ts`
**Problem:** Contains entry for `${baseUrl}/assets` which is an old "Nexus DAM" route that no longer exists.
**Impact:** Crawlers will hit a 404.
**Fix:** Replace `/assets` with `/workflows` and add other Nexus Flow routes.

### 🟡 BUG-05: `TestRunModal` Missing Dependency in useEffect
**File:** `src/components/workflows/TestRunModal.tsx`
**Problem:** `useEffect` calls `runSimulation()` but `runSimulation` is not in the dependency array. React will warn about this.
**Fix:** Use `useCallback` for `runSimulation` or restructure the effect.

### 🟡 BUG-06: `OverviewChart` Has Double Directive
**File:** `src/components/dashboard/OverviewChart.tsx`
**Problem:** File starts with `"use strict"` then `"use client"`. The `"use strict"` is unnecessary in module code and may confuse Next.js's client boundary detection.
**Fix:** Remove `"use strict"`.

---

## 3. Dead / Unused Code

### Files to Clean Up

| File | Issue | Action |
|------|-------|--------|
| `src/app/(dashboard)/analytics/page.tsx` | Old DAM page with light/dark mode classes, placeholder "coming soon" content. Uses `dark:` prefix which no other file uses. | **Rewrite** for Nexus Flow analytics |
| `src/app/(dashboard)/settings/layout.tsx` | Description says "Nexus DAM" | **Fix** metadata description |
| `src/app/sitemap.ts` | References `/assets` (old DAM), comment says "Nexus DAM SaaS" | **Update** to Nexus Flow routes |
| `src/app/robots.ts` | Comment says "Nexus DAM SaaS" | **Update** comment |
| `NEXUS_SAAS_IMPLEMENTATION_PLAN.md` | Old plan document, superseded by `NEXUS_FLOW_BLUEPRINT.md` | **Delete** |
| `LOCKED_GRID_PROMPT.md` | Reference document only, already implemented in `globals.css` | **Keep** as reference |
| `skills.md` | References 31 skills from global skills dir, not project code | **Keep** as config |

### Unused Code Within Files

| File | Dead Code | Action |
|------|-----------|--------|
| `WorkflowBuilder.tsx` | `initialNodes`, `initialEdges`, `id`, `getId` variables (lines 39-51) are defined but never used because builder page passes its own nodes/edges as props | **Remove** dead variables |
| `WorkflowBuilder.tsx` | Imports `useNodesState`, `useEdgesState`, `addEdge`, `applyNodeChanges` but NEVER uses them (parent manages state) | **Remove** unused imports |
| `Card.tsx` | Uses `dark:bg-sidebar-dark` class which doesn't exist in CSS variables | **Fix** class reference |
| `validators.ts` | `projectSchema` defined but never used anywhere | **Keep** for future use |

---

## 4. Design Inconsistencies

### 🎨 DESIGN-01: Inconsistent Background Colors
The app uses multiple dark background shades inconsistently:
- `#050a14` — Landing page, workflow canvas, onboarding sidebar
- `#0c1018` — Dashboard cards, sidebar, settings panel, modals
- `#02040a` — Footer, auth layout branding panel
- `bg-background-dark` — Dashboard layout (CSS variable)
- `bg-[#0b1221]` — Login form divider background

**Fix:** Standardize to CSS variables: `--bg-deepest`, `--bg-surface`, `--bg-elevated`.

### 🎨 DESIGN-02: Card Component Not Used
`src/components/ui/Card.tsx` exists with `default`, `glass`, and `outline` variants, but **no page uses it**. All pages manually write card styles with `bg-[#0c1018] border border-white/10 rounded-2xl`.
**Fix:** Refactor all page cards to use the `Card` component for consistency.

### 🎨 DESIGN-03: Inconsistent Heading Sizes
- Dashboard page: `text-3xl font-bold` for main heading
- Workflows page: `text-3xl font-bold` ✓
- Agents page: `text-3xl font-bold` ✓
- Templates page: `text-2xl font-bold` ✗ (inconsistent)
- Analytics page: `text-2xl font-bold` ✗ (inconsistent)
**Fix:** Standardize all page headings to `text-3xl font-bold`.

### 🎨 DESIGN-04: Missing Container Class on Templates Page
Templates page uses `max-w-7xl mx-auto` instead of the `container` class used everywhere else.
**Fix:** Replace with `container` class.

### 🎨 DESIGN-05: Social Media Icons Use Material Symbols
`EnhancedFooter.tsx` tries to use Material Symbols for social media icons (twitter → "raven", etc.). Material Symbols doesn't have brand icons.
**Fix:** Use inline SVGs or a proper icon library for social brand icons.

### 🎨 DESIGN-06: No Hover State Feedback on Agent "Create Agent" Button
The "Create Agent" button on the Agents page doesn't navigate anywhere — it's a dead button.
**Fix:** Wire to a modal or creation page.

---

## 5. Code Quality Issues

### 🔧 QUALITY-01: Heavy Use of `@ts-ignore`
`src/lib/auth.ts` has 4 instances of `// @ts-ignore` for session properties.
**Fix:** Extend the NextAuth session type properly with module augmentation.

### 🔧 QUALITY-02: No TypeScript Types for Node Data
All workflow node components use `data: any` for props.
**Fix:** Use the `WorkflowNodeData` type from `types/workflow.ts` (it exists but is unused).

### 🔧 QUALITY-03: Password Stored in Plaintext
`src/lib/auth.ts` line 60: `password === user.password` — simple string comparison.
**Fix:** Implement bcrypt hashing (already noted in code comments).

### 🔧 QUALITY-04: `cn()` Utility Barely Used
`src/lib/utils.ts` exports `cn()` (clsx + twMerge) but only `Card.tsx` uses it.
**Fix:** Adopt `cn()` across all components for conditional class merging.

### 🔧 QUALITY-05: `onEdgesChange` Typed as `any`
`WorkflowBuilder.tsx` line 57: `onEdgesChange: any; // OnEdgesChange type is simpler`.
**Fix:** Import and use the proper `OnEdgesChange` type from `@xyflow/react`.

### 🔧 QUALITY-06: Event Handlers Not Abstracted
Landing page (`page.tsx`) is 193 lines of raw JSX with inline motion configs. Section components exist but the hero and bento grid are still inline.
**Fix:** Extract `HeroSection` and `BentoGrid` components.

---

## 6. File-by-File Audit Notes

### ✅ Good Quality Files (No Issues)
| File | Status |
|------|--------|
| `src/app/layout.tsx` | ✅ Clean, proper metadata, correct fonts |
| `src/app/providers.tsx` | ✅ Simple, correct SessionProvider wrapper |
| `src/app/manifest.ts` | ✅ Proper PWA manifest (needs icons in public/) |
| `src/lib/db.ts` | ✅ Standard Prisma singleton pattern |
| `src/lib/validators.ts` | ✅ Clean Zod schemas |
| `src/types/workflow.ts` | ✅ Well-defined types |
| `src/data/templates.ts` | ✅ Good template data structure |
| `src/app/(auth)/layout.tsx` | ✅ Beautiful split auth layout |
| `src/app/(auth)/login/page.tsx` | ✅ Clean, proper metadata |
| `src/app/(auth)/signup/page.tsx` | ✅ Clean, proper metadata |
| `src/components/auth/LoginForm.tsx` | ✅ Working auth with dev bypass |
| `src/components/layout/Sidebar.tsx` | ✅ Well-structured navigation |
| `src/components/workflows/PropertiesPanel.tsx` | ✅ Clean per-type property editing |
| `src/components/workflows/nodes/*.tsx` (all 6) | ✅ Consistent node design pattern |
| `src/components/onboarding/*.tsx` (all 6) | ✅ Good wizard flow |
| `src/components/templates/TemplateCard.tsx` | ✅ Good card component |
| `src/components/templates/TemplatePreviewModal.tsx` | ✅ Good modal with ReactFlow preview |
| `src/components/landing/PricingSection.tsx` | ✅ Well-structured pricing |
| `src/components/landing/EnhancedFooter.tsx` | ✅ Good footer (minor icon issue) |
| `prisma/schema.prisma` | ✅ Complete, well-structured schema |
| `src/app/api/auth/[...nextauth]/route.ts` | ✅ Clean route handler |
| `src/app/globals.css` | ✅ Comprehensive design system |

### ⚠️ Needs Work
| File | Issues |
|------|--------|
| `src/middleware.ts` | Route protection incomplete |
| `src/lib/auth.ts` | @ts-ignore, no bcrypt, unused import |
| `src/components/dashboard/OverviewChart.tsx` | Wrong theme colors, double directive |
| `src/components/workflows/WorkflowBuilder.tsx` | Dead code, unused imports, any type |
| `src/app/(dashboard)/analytics/page.tsx` | Old DAM code, wrong theme classes |
| `src/app/(dashboard)/settings/layout.tsx` | Old "Nexus DAM" metadata |
| `src/app/sitemap.ts` | Old DAM routes and comments |
| `src/app/robots.ts` | Old DAM comments |
| `src/components/auth/SignupForm.tsx` | Fake signup with no real auth |
| `src/components/ui/Card.tsx` | Never used, has wrong CSS class |
| `next.config.mjs` | Commented-out settings still present |

---

## 7. Current Feature Completion Status

| Feature | Status | Notes |
|---------|--------|-------|
| **Landing Page** | 🟢 90% | Missing navbar, hero could use refinement |
| **Auth (Login)** | 🟢 90% | Working with dev bypass, needs real OAuth setup |
| **Auth (Signup)** | 🟡 30% | Fake form, no actual user creation |
| **Onboarding Wizard** | 🟢 85% | Working 5-step flow, needs API integration |
| **Dashboard Overview** | 🟡 60% | Layout good, chart broken, all data is mock |
| **Workflows List** | 🟡 50% | Mock data only, no CRUD |
| **Workflow Builder** | 🟢 75% | Drag & drop works, properties panel works, test run works |
| **Agents Page** | 🟡 40% | Mock cards only, no CRUD |
| **Executions Page** | 🟡 40% | Mock table only, no real data |
| **Integrations Page** | 🟡 45% | Category tabs + grid, no real OAuth connections |
| **Templates Gallery** | 🟢 80% | Full gallery with filtering, preview modal, 8 templates |
| **Team/Users Page** | 🟡 40% | Mock table, role dropdown (non-functional) |
| **Settings Page** | 🟡 50% | General + Billing tabs work, 3 tabs show "Under Construction" |
| **Analytics Page** | 🔴 10% | Placeholder only, old DAM styling |
| **SEO** | 🟢 70% | Sitemap, robots, metadata — needs route updates |
| **Mobile Responsiveness** | 🔴 20% | No mobile nav, sidebar is fixed, mostly desktop-only |
| **Error Handling** | 🔴 0% | No error.tsx, not-found.tsx, or loading.tsx |
| **API Routes** | 🔴 5% | Only NextAuth route exists |
| **Database Integration** | 🔴 5% | Schema defined, no migrations run, no CRUD queries |
| **Stripe Billing** | 🔴 0% | Env vars defined but no implementation |
| **AI Execution Engine** | 🔴 0% | No real AI workflow execution |
| **Notifications/Toasts** | 🔴 0% | Uses `alert()` |

---

## 8. Development Plan — Phased Roadmap

### Phase 0: Cleanup & Fixes (1-2 hours) ← **DO THIS FIRST**

Fix all critical bugs and clean dead code before building new features.

#### 0.1 — Fix Critical Bugs
- [ ] **Fix middleware** — protect ALL dashboard routes (`/workflows`, `/agents`, `/executions`, `/integrations`, `/users`, `/settings`, `/templates`)
- [ ] **Fix OverviewChart** — rewrite with dark-mode colors (dark tooltip, subtle grid `#1e293b`)
- [ ] **Fix sitemap.ts** — replace `/assets` with `/workflows`, `/agents`, `/templates`; update comments
- [ ] **Fix robots.ts** — update comments from "Nexus DAM" to "Nexus Flow"
- [ ] **Fix settings/layout.tsx** — update metadata description

#### 0.2 — Remove Dead Code
- [ ] **WorkflowBuilder.tsx** — remove unused imports (`useNodesState`, `useEdgesState`, `addEdge`, `applyNodeChanges`) and unused variables (`initialNodes`, `initialEdges`, `id`, `getId`)
- [ ] **OverviewChart.tsx** — remove `"use strict"` directive
- [ ] **Delete `NEXUS_SAAS_IMPLEMENTATION_PLAN.md`** — superseded by blueprint

#### 0.3 — Design Fixes
- [ ] **Standardize backgrounds** — create CSS variables `--bg-deepest: #02040a`, `--bg-base: #050a14`, `--bg-surface: #0c1018` and use them everywhere
- [ ] **Fix Templates page** — change `max-w-7xl mx-auto` to `container` class, heading to `text-3xl`
- [ ] **Fix Analytics page** — rewrite with dark-mode-only classes (remove all `dark:` prefixes)
- [ ] **Fix Card.tsx** — update `dark:bg-sidebar-dark` to valid class

---

### Phase 1: Core UX Polish (3-5 hours)

#### 1.1 — Landing Page Navbar
- [ ] Create `src/components/landing/Navbar.tsx` — sticky nav with logo, section links, "Login" + "Get Started" CTAs
- [ ] Extract `HeroSection.tsx` from `page.tsx` hero code
- [ ] Extract `BentoFeatureGrid.tsx` from `page.tsx` feature section
- [ ] Fix social media icons in footer (use SVGs)

#### 1.2 — Mobile Navigation
- [ ] Add hamburger menu to `Sidebar.tsx` for mobile
- [ ] Make sidebar collapsible (16-wide icon mode on md, full on lg)
- [ ] Add mobile bottom nav bar alternative
- [ ] Test all dashboard pages at 375px width

#### 1.3 — Error & Loading States
- [ ] Create `src/app/not-found.tsx` — custom 404 page
- [ ] Create `src/app/error.tsx` — global error boundary
- [ ] Create `src/app/(dashboard)/loading.tsx` — skeleton loader for dashboard
- [ ] Create skeleton components for cards, tables, charts

#### 1.4 — Toast Notification System
- [ ] Install `sonner` or build custom toast component
- [ ] Replace `alert()` in WorkflowBuilder with toast
- [ ] Add toast provider to `providers.tsx`

---

### Phase 2: TypeScript & Auth Hardening (2-3 hours)

#### 2.1 — TypeScript Cleanup
- [ ] Extend NextAuth types — add `role`, `organizationId` to Session type (remove all `@ts-ignore`)
- [ ] Type all workflow node `data` props with `WorkflowNodeData`
- [ ] Fix `onEdgesChange: any` → `OnEdgesChange` proper type
- [ ] Add strict types for template and integration data

#### 2.2 — Auth Improvements
- [ ] Wire `SignupForm.tsx` to actual NextAuth `signIn("credentials")` or API route
- [ ] Add signup API route `src/app/api/auth/register/route.ts`
- [ ] Implement bcrypt password hashing
- [ ] Add validation with `signInSchema` in auth `authorize` callback
- [ ] Add rate limiting concept to auth routes

#### 2.3 — Session-Based UI
- [ ] Show actual user name/email in Sidebar from session
- [ ] Conditionally show admin features based on role
- [ ] Add "Sign Out" functionality that actually calls `signOut()`

---

### Phase 3: Database & API Layer (4-6 hours)

#### 3.1 — Database Setup
- [ ] Run `npx prisma migrate dev` to create tables
- [ ] Create seed script `prisma/seed.ts` with demo data
- [ ] Add `prisma db seed` to package.json scripts

#### 3.2 — CRUD API Routes
- [ ] `POST/GET /api/workflows` — list and create workflows
- [ ] `GET/PUT/DELETE /api/workflows/[id]` — single workflow operations
- [ ] `POST/GET /api/agents` — list and create agents
- [ ] `GET/PUT/DELETE /api/agents/[id]` — single agent operations
- [ ] `GET /api/executions` — list executions with pagination
- [ ] `POST/GET /api/integrations` — manage integrations
- [ ] `GET/PUT /api/organizations/[id]` — org settings

#### 3.3 — Connect UI to Database
- [ ] Replace mock data in Dashboard with real queries
- [ ] Replace mock in Workflows list with real CRUD
- [ ] Replace mock in Agents page with real CRUD
- [ ] Replace mock in Executions page with real data
- [ ] Replace mock in Team page with real member list
- [ ] Workflow Builder save/load from database

---

### Phase 4: Workflow Execution Engine (6-8 hours)

#### 4.1 — Core Engine
- [ ] Create `src/lib/engine/executor.ts` — DAG traversal and node execution
- [ ] Create `src/lib/engine/nodes/` — executor for each node type
- [ ] Implement trigger handling (webhook, schedule, manual)
- [ ] Implement condition branching logic
- [ ] Implement loop execution
- [ ] Implement delay/scheduling

#### 4.2 — AI Agent Integration
- [ ] Create `src/lib/ai/agent.ts` — AI agent executor using Vercel AI SDK
- [ ] Support for Claude 3.5 Sonnet and GPT-4o
- [ ] Tool calling integration (search, CRM, email, etc.)
- [ ] Streaming agent output to execution logs

#### 4.3 — Job Queue
- [ ] Set up BullMQ with Redis
- [ ] Create workflow execution worker
- [ ] Add retry logic and error handling
- [ ] Implement execution status updates (real-time via SSE or polling)

---

### Phase 5: Integrations & Billing (4-6 hours)

#### 5.1 — OAuth Integrations
- [ ] Implement Slack OAuth connection flow
- [ ] Implement Gmail OAuth connection flow
- [ ] Implement GitHub OAuth for agent access
- [ ] Store tokens encrypted in Integration model
- [ ] Build integration action executors

#### 5.2 — Stripe Billing
- [ ] Create Stripe checkout session API route
- [ ] Implement plan upgrade/downgrade flow
- [ ] Add usage tracking (execution count per billing period)
- [ ] Create customer portal redirect
- [ ] Implement webhook for subscription events
- [ ] Wire billing UI in Settings to real Stripe data

---

### Phase 6: Analytics & Monitoring (3-4 hours)

#### 6.1 — Dashboard Analytics
- [ ] Real execution volume chart with actual data
- [ ] Success/failure rate over time
- [ ] Time saved calculations
- [ ] Active workflows trend

#### 6.2 — Analytics Page
- [ ] Rebuild from scratch with proper dark-mode charts
- [ ] Top-performing workflows ranking
- [ ] Agent performance metrics
- [ ] Cost tracking (AI API usage)
- [ ] Date range filtering

---

### Phase 7: Final Polish (2-3 hours)

#### 7.1 — Performance
- [ ] Add `React.lazy()` for heavy components (ReactFlow, Recharts)
- [ ] Implement proper code splitting
- [ ] Add image optimization for landing page
- [ ] Create PWA icons for manifest

#### 7.2 — Accessibility
- [ ] Keyboard navigation for all interactive elements
- [ ] ARIA labels on icon buttons
- [ ] Focus management in modals
- [ ] `prefers-reduced-motion` for all animations
- [ ] Screen reader testing

#### 7.3 — SEO & Open Graph
- [ ] Add OG images for social sharing
- [ ] Ensure all pages have unique title/description
- [ ] Add structured data (JSON-LD) for landing page
- [ ] Submit sitemap to search console

---

## Priority Order

```
Phase 0 (Cleanup)     → IMMEDIATE — blocks everything
Phase 1 (UX Polish)   → HIGH — user-facing quality
Phase 2 (Auth/TS)     → HIGH — security & code quality
Phase 3 (Database)    → HIGH — core functionality
Phase 4 (Engine)      → MEDIUM — the "magic" feature
Phase 5 (Billing)     → MEDIUM — monetization
Phase 6 (Analytics)   → LOW — nice to have
Phase 7 (Polish)      → LOW — pre-launch checklist
```

**Estimated Total Effort:** 25-37 hours of focused development

---

## Quick Reference: File Tree (59 source files)

```
src/
├── app/
│   ├── layout.tsx ✅
│   ├── page.tsx ✅ (landing)
│   ├── providers.tsx ✅
│   ├── globals.css ✅
│   ├── manifest.ts ✅
│   ├── sitemap.ts ⚠️ (old routes)
│   ├── robots.ts ⚠️ (old comments)
│   ├── (auth)/
│   │   ├── layout.tsx ✅
│   │   ├── login/page.tsx ✅
│   │   └── signup/page.tsx ✅
│   ├── (dashboard)/
│   │   ├── layout.tsx ✅
│   │   ├── dashboard/page.tsx ✅
│   │   ├── workflows/page.tsx ✅
│   │   ├── workflows/builder/page.tsx ✅
│   │   ├── agents/page.tsx ✅
│   │   ├── executions/page.tsx ✅
│   │   ├── integrations/page.tsx ✅
│   │   ├── templates/page.tsx ✅
│   │   ├── users/page.tsx ✅
│   │   ├── analytics/page.tsx 🔴 (rewrite)
│   │   └── settings/
│   │       ├── layout.tsx ⚠️ (wrong description)
│   │       └── page.tsx ✅
│   └── api/auth/[...nextauth]/route.ts ✅
├── components/
│   ├── auth/LoginForm.tsx ✅
│   ├── auth/SignupForm.tsx ⚠️ (fake)
│   ├── dashboard/OverviewChart.tsx 🔴 (theme broken)
│   ├── landing/EnhancedFooter.tsx ✅
│   ├── landing/FAQSection.tsx ✅
│   ├── landing/FinalCTA.tsx ✅
│   ├── landing/HowItWorksSection.tsx ✅
│   ├── landing/PricingSection.tsx ✅
│   ├── landing/SolutionsSection.tsx ✅
│   ├── landing/TestimonialsSection.tsx ✅
│   ├── layout/Sidebar.tsx ✅
│   ├── onboarding/OnboardingModal.tsx ✅
│   ├── onboarding/ProgressSidebar.tsx ✅
│   ├── onboarding/StepCompletion.tsx ✅
│   ├── onboarding/StepGoals.tsx ✅
│   ├── onboarding/StepIntegration.tsx ✅
│   ├── onboarding/StepRoleSelection.tsx ✅
│   ├── onboarding/StepTemplateSelect.tsx ✅
│   ├── templates/TemplateCard.tsx ✅
│   ├── templates/TemplatePreviewModal.tsx ✅
│   ├── ui/Card.tsx ⚠️ (unused)
│   ├── workflows/PropertiesPanel.tsx ✅
│   ├── workflows/TestRunModal.tsx ✅
│   ├── workflows/WorkflowBuilder.tsx ⚠️ (dead code)
│   └── workflows/nodes/
│       ├── ActionNode.tsx ✅
│       ├── AgentNode.tsx ✅
│       ├── ConditionNode.tsx ✅
│       ├── DelayNode.tsx ✅
│       ├── LoopNode.tsx ✅
│       └── TriggerNode.tsx ✅
├── data/templates.ts ✅
├── lib/
│   ├── auth.ts ⚠️ (ts-ignore, no bcrypt)
│   ├── db.ts ✅
│   ├── utils.ts ✅
│   └── validators.ts ✅
├── middleware.ts 🔴 (incomplete protection)
└── types/workflow.ts ✅
```
