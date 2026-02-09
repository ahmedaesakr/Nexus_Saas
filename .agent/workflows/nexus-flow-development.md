---
description: How to develop the Nexus Flow AI Automation Platform
---

# Nexus Flow - Development Guide

## 📌 Project Overview

**Value Proposition**: An AI-powered platform where autonomous agents execute multi-step business workflows end-to-end.
**Stack**: Next.js 16, TypeScript, Tailwind 4, Prisma, NextAuth, OpenAI/Anthropic APIs.

## 🚀 Quick Start

// turbo
```bash
cd app
npm install
npx prisma generate
npm run dev
```

## 📂 Key Directories

| Path | Purpose |
|------|---------|
| `src/app/(auth)` | Login/Signup pages |
| `src/app/(dashboard)/workflows` | Workflow builder & list |
| `src/app/(dashboard)/agents` | AI Agent configuration |
| `src/app/api` | Backend API routes |
| `prisma/schema.prisma` | Database models |

## 🛠️ Common Tasks

### Database Updates
When you change `schema.prisma`:
```bash
npx prisma migrate dev --name init
```

### Adding a New Workflow Node
1. Define node type in `src/types/workflow.ts`
2. Create component in `src/components/workflows/nodes/`
3. Register in `src/app/(dashboard)/workflows/builder/page.tsx`

### Creating an AI Agent
1. Define agent prompt in `src/lib/ai/prompts.ts`
2. Implement tools in `src/lib/ai/tools.ts`
3. Connect to agent execution loop in `src/app/api/executions/route.ts`

## 🎨 Design System (2026)

Always use these classes:
- `.container` (Locked Grid)
- `.liquid-glass` (Cards/Panels)
- `.btn-tactile` (Buttons)
- `.text-fluid-base` (Typography)

## 🔐 Environment Variables
Ensure `.env.local` is populated with:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `OPENAI_API_KEY`

---
*Reference: `NEXUS_FLOW_BLUEPRINT.md`*
