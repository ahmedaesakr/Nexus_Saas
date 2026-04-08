# Nexus SaaS — Project Audit & Fix Plan

## 1. Skills Status (SpecKit)

All 9 **speckit-*** skills are installed under `.agent/skills/` and technically functional. However, the **project constitution is a blank template** — it has never been filled in, which means the core prerequisite for `speckit-analyze`, `speckit-plan`, and `speckit-implement` is completely empty. You must complete the constitution before any speckit workflow is meaningful.

| Skill | Installed? | Usable? | Blocker |
|---|---|---|---|
| `speckit-analyze` | ✅ | ⚠️ Partial | Constitution is blank template |
| `speckit-checklist` | ✅ | ✅ | — |
| `speckit-clarify` | ✅ | ✅ | — |
| `speckit-constitution` | ✅ | ✅ | **Run this first** |
| `speckit-implement` | ✅ | ⚠️ Partial | No spec.md / plan.md / tasks.md yet |
| `speckit-plan` | ✅ | ⚠️ Partial | No spec.md yet |
| `speckit-specify` | ✅ | ✅ | — |
| `speckit-tasks` | ✅ | ⚠️ Partial | No spec.md / plan.md yet |
| `speckit-taskstoissues` | ✅ | ⚠️ Partial | No spec.md / plan.md yet |

**Recommended first action**: Run `speckit-constitution` to fill in `.specify/memory/constitution.md`, then `speckit-specify` to create a feature spec.

---

## 2. Architecture Overview

```
Nexus/
├── .agent/skills/          ← SpecKit skill files
├── .specify/               ← SpecKit state (constitution is BLANK)
└── app/                    ← Next.js 14 SaaS app
    ├── prisma/             ← SQLite schema (5 models)
    └── src/
        ├── app/
        │   ├── (auth)/     ← /login, /signup
        │   ├── (dashboard) ← /dashboard, /workspace, /data, /onboarding, /settings
        │   └── api/auth/   ← NextAuth handler
        ├── components/
        │   ├── auth/       ← LoginForm, SignupForm
        │   ├── dashboard/  ← EMPTY ⚠️
        │   ├── landing/    ← 10 files NEVER IMPORTED ⚠️
        │   ├── layout/     ← Sidebar, Topbar
        │   └── ui/         ← Card.tsx, Icons.tsx
        ├── lib/            ← auth, db, email (unused), utils, validators
        │   └── server/     ← auth-context, invite-token (unused)
        ├── middleware.ts
        └── types/next-auth.d.ts
```

---

## 3. Issues Found

### CRITICAL

| # | Issue | Location | Fix |
|---|---|---|---|
| C1 | Hardcoded admin credentials in source (`admin@nexus.flow` / `admin`) | `lib/auth.ts:30-45` | Remove or gate behind `NODE_ENV === 'development'` |
| C2 | Mock admin session bypass also hardcoded | `lib/auth.ts:80-84` | Same as C1 |
| C3 | Duplicate `.env` files (`.env` and `.env.local`, identical, 578 bytes each) | `app/.env`, `app/.env.local` | Delete `.env`; keep only `.env.local` |
| C4 | All 5 dashboard pages use 100% static hardcoded mock data | All `page.tsx` files | Connect to real Prisma queries |

### HIGH

| # | Issue | Location | Fix |
|---|---|---|---|
| H1 | `components/dashboard/` is completely empty | `src/components/dashboard/` | Delete the empty directory |
| H2 | 10 landing components exist but are NEVER imported | `src/components/landing/*` | Use in `page.tsx` OR delete them |
| H3 | Sidebar links to `/dashboard/support` — no route exists | `Sidebar.tsx:16` | Create route or remove link |
| H4 | `tsconfig.tsbuildinfo` (104KB build artifact) committed to git | `app/tsconfig.tsbuildinfo` | Add to `.gitignore` and delete |
| H5 | `prisma/dev.db` (SQLite DB) committed to git | `app/prisma/dev.db` | Add to `.gitignore` and delete |

### MEDIUM

| # | Issue | Location | Fix |
|---|---|---|---|
| M1 | `components/ui/Card.tsx` likely unused (CSS `.card` class handles it) | `src/components/ui/Card.tsx` | Grep for imports; delete if unused |
| M2 | `lib/email.ts` exists but is never imported anywhere | `src/lib/email.ts` | Delete or wire up for auth flows |
| M3 | `lib/server/invite-token.ts` exists but no invite flow UI exists | `src/lib/server/invite-token.ts` | Delete or implement invite flow |
| M4 | `app/sitemap.ts` only returns `/` — no dynamic routes | `src/app/sitemap.ts` | Extend or delete |
| M5 | `app/manifest.ts` exists but no PWA setup | `src/app/manifest.ts` | Delete unless PWA is planned |
| M6 | Constitution is a raw `[PLACEHOLDER]` template | `.specify/memory/constitution.md` | Fill in using `speckit-constitution` |
| M7 | Inline styles everywhere — pages mix CSS classes + `style={}` | All page files | Standardize to CSS classes from `globals.css` |
| M8 | `page.tsx` (landing) doesn't import any of the 10 landing components | `src/app/page.tsx` | Use components or delete them |

### LOW

| # | Issue | Fix |
|---|---|---|
| L1 | Copyright year says 2024 | Update to 2025/2026 |
| L2 | `middleware.ts` only protects `/dashboard`, not `/onboarding`, `/settings` etc. | Update route matcher |
| L3 | `next-auth.d.ts` — `role` typed as `string` not a union type | Add `type Role = 'OWNER' \| 'ADMIN' \| 'MEMBER'` |

---

## 4. Files to Delete

| Path | Reason |
|---|---|
| `app/.env` | Duplicate of `.env.local` |
| `app/tsconfig.tsbuildinfo` | Build artifact — should not be committed |
| `app/prisma/dev.db` | SQLite database — never commit DBs |
| `app/src/components/dashboard/` | Empty directory |
| `app/src/components/landing/` (10 files) | Not imported anywhere |
| `app/src/lib/email.ts` | Never imported anywhere |
| `app/src/lib/server/invite-token.ts` | No invite flow exists in UI |
| `app/src/app/manifest.ts` | No PWA setup |

**Before deleting landing components**, confirm with:
```
grep -r "components/landing\|lib/email" app/src
```

---

## 5. Add to `.gitignore`

```gitignore
# app/.gitignore
tsconfig.tsbuildinfo
prisma/*.db
*.db
.env
```

---

## 6. Prioritized Fix Plan

### Phase 1 — Immediate Cleanup (1–2 hours)
1. Delete the 8 useless files/dirs listed above
2. Add `tsconfig.tsbuildinfo` and `dev.db` to `.gitignore`
3. Delete duplicate `.env` file
4. Remove or env-gate hardcoded admin bypass in `lib/auth.ts`
5. Create `/dashboard/support` route OR remove the sidebar link

### Phase 2 — SpecKit Setup
6. Run `/speckit-constitution` → fill in project constitution
7. Run `/speckit-specify` → create feature spec for Nexus
8. Run `/speckit-plan` → generate architecture design artifact
9. Run `/speckit-tasks` → generate implementation task list

### Phase 3 — Real Data Layer
10. Replace all static mock data in pages with server components + Prisma queries
11. Wire `email.ts` into auth flows or delete it
12. Implement invite flow or delete `invite-token.ts`

### Phase 4 — Code Consistency
13. Fix middleware to guard all protected routes
14. Use landing components in `page.tsx` OR delete them
15. Standardize styling: remove duplicate `className + style={}` patterns
16. Add `Role` union type to `next-auth.d.ts`

---

## 7. Summary

| Category | Count |
|---|---|
| Critical issues | 4 |
| High issues | 5 |
| Medium issues | 8 |
| Low issues | 3 |
| Files to delete | 8 |
| Empty directories | 1 |
| Unused landing components | 10 |
| Pages with 100% mock data | 5 |
| Constitution completeness | 0% (blank template) |
| SpecKit skills ready today | 3/9 |
