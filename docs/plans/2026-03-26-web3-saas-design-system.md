# Web3 SaaS Design System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current mixed Aura/Nexus UI with one consistent black-and-neon-green full-app design system for Nexus Flow.

**Architecture:** Drive the redesign from shared tokens and shell primitives first, then refactor the highest-traffic surfaces so the rest of the app inherits the system rather than receiving isolated one-off styling changes. Prioritize globals, layout shells, buttons, inputs, cards, nav, and dashboard primitives.

**Tech Stack:** Next.js App Router, React, Tailwind CSS v4, Framer Motion, Recharts

---

### Task 1: Global Tokens And Surface Rules

**Files:**
- Modify: `app/src/app/globals.css`
- Modify: `app/src/app/layout.tsx`
- Modify: `app/src/app/manifest.ts`

**Step 1:** Replace legacy cyan/blue tokens with green-led Web3 SaaS tokens
**Step 2:** Normalize shell-level backgrounds, glass surfaces, buttons, inputs, focus states, and motion utilities
**Step 3:** Update visible metadata and manifest branding to Nexus Flow

### Task 2: Shared Shell Components

**Files:**
- Modify: `app/src/components/ui/Card.tsx`
- Modify: `app/src/components/layout/Sidebar.tsx`
- Modify: `app/src/app/(dashboard)/layout.tsx`

**Step 1:** Refactor the shared card component to the new dark-glass surface family
**Step 2:** Rebuild sidebar visuals around the new tokens and active states
**Step 3:** Update dashboard shell backgrounds and spacing to use the shared app surface

### Task 3: Landing Experience

**Files:**
- Modify: `app/src/app/page.tsx`
- Modify: `app/src/components/landing/Navbar.tsx`
- Modify: `app/src/components/landing/HeroSection.tsx`
- Modify: `app/src/components/landing/FinalCTA.tsx`
- Modify: `app/src/components/landing/EnhancedFooter.tsx`

**Step 1:** Update landing shell backgrounds and brand naming
**Step 2:** Rework hero, CTA, and nav styling to match the system
**Step 3:** Tune footer styling and copy so the marketing flow feels consistent

### Task 4: Auth Experience

**Files:**
- Modify: `app/src/app/(auth)/layout.tsx`
- Modify: `app/src/app/(auth)/login/page.tsx`
- Modify: `app/src/app/(auth)/signup/page.tsx`
- Modify: `app/src/components/auth/LoginForm.tsx`
- Modify: `app/src/components/auth/SignupForm.tsx`

**Step 1:** Convert auth shell to the new split-screen product experience
**Step 2:** Standardize form controls, dev login card, CTA buttons, and copy
**Step 3:** Align login/signup page framing with the new brand

### Task 5: Dashboard And Workflow Overview

**Files:**
- Modify: `app/src/app/(dashboard)/dashboard/page.tsx`
- Modify: `app/src/components/dashboard/OverviewChart.tsx`
- Modify: `app/src/app/(dashboard)/workflows/page.tsx`
- Modify: `app/src/app/not-found.tsx`

**Step 1:** Refactor overview cards and analytics surface styling
**Step 2:** Update chart, activity states, and workflow cards to green-led accents
**Step 3:** Align the not-found state with the same shell treatment

### Task 6: Verification

**Files:**
- Verify: `app/package.json`

**Step 1:** Run `npm run lint` from `app/`
**Step 2:** Review lint output and fix any regressions caused by the redesign
**Step 3:** Summarize remaining pages that still contain older one-off blue/purple styles for a follow-up pass
