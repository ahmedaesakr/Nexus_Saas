# 🚀 NEXUS → AI WORKFLOW AUTOMATION PLATFORM
## Complete SaaS Transformation Blueprint

> **For Agents**: This document is the SINGLE SOURCE OF TRUTH for transforming the current Nexus DAM codebase into a production-ready AI Workflow Automation SaaS. Follow every section precisely.

---

## 📌 EXECUTIVE SUMMARY

### Chosen SaaS Concept: **AI Workflow Automation Platform**

Based on 2026 trending SaaS analysis, we will pivot from "Digital Asset Management" to:

**"Nexus Flow" - AI-Native Workflow Automation for B2B Teams**

**Value Proposition**: An AI-powered platform where autonomous agents execute multi-step business workflows end-to-end—from sales follow-ups to support resolution—without human intervention.

**Target Market**: SMB to Mid-Market B2B companies (50-500 employees)

**Core Differentiators**:
1. AI agents that OWN tasks, not just assist
2. Pre-built industry templates (Sales, Marketing, HR, Support)
3. Visual workflow builder with no-code interface
4. Native integrations with 50+ business tools
5. Real-time analytics on automation ROI

---

## 🎯 PRODUCT FEATURES

### Tier 1: MVP (Build First)
| Feature | Description | Priority |
|---------|-------------|----------|
| Workflow Builder | Drag-and-drop visual editor | 🔴 Critical |
| AI Agent Studio | Configure/train AI agents per workflow | 🔴 Critical |
| Pre-built Templates | 10 starter workflows (sales, onboarding, etc.) | 🔴 Critical |
| Execution Dashboard | View running/completed workflows | 🔴 Critical |
| Integrations Hub | Connect Slack, Gmail, CRM, etc. | 🔴 Critical |
| User Authentication | Login/signup with roles | 🔴 Critical |

### Tier 2: Growth Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Analytics & ROI | Time saved, cost reduction metrics | 🟡 High |
| Team Collaboration | Shared workflows, comments | 🟡 High |
| Audit Logs | Compliance trail for all actions | 🟡 High |
| Webhooks & API | Developer integrations | 🟡 High |

### Tier 3: Scale Features
| Feature | Description | Priority |
|---------|-------------|----------|
| White-label | Custom branding for enterprises | 🟢 Medium |
| Billing & Subscriptions | Stripe integration | 🟢 Medium |
| Marketplace | Community workflow templates | 🟢 Medium |

---

## 📁 FILE SYSTEM AUDIT

### Current Project Structure
```
C:\Users\Administrator\Desktop\Nexus\
├── .agent/                          # ✅ KEEP (agent workflows)
│   └── workflows/
│       └── nexus-development.md     # 🔄 UPDATE with new plan
├── app/                             # ✅ KEEP (main application)
│   ├── public/
│   │   ├── favicon.ico              # 🔄 UPDATE (new branding)
│   │   ├── file.svg                 # ❌ DELETE
│   │   ├── globe.svg                # ❌ DELETE
│   │   ├── next.svg                 # ❌ DELETE
│   │   ├── vercel.svg               # ❌ DELETE
│   │   └── window.svg               # ❌ DELETE
│   ├── src/
│   │   ├── app/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── analytics/       # 🔄 REPURPOSE → Workflow Analytics
│   │   │   │   ├── assets/          # ❌ DELETE (DAM-specific)
│   │   │   │   ├── dashboard/       # 🔄 REPURPOSE → Home Dashboard
│   │   │   │   ├── integrations/    # ✅ KEEP (enhance for workflow tools)
│   │   │   │   ├── settings/        # ✅ KEEP (add billing tab)
│   │   │   │   ├── users/           # ✅ KEEP (team management)
│   │   │   │   └── layout.tsx       # ✅ KEEP (update sidebar)
│   │   │   ├── globals.css          # ✅ KEEP (design system)
│   │   │   ├── layout.tsx           # 🔄 UPDATE (rebrand metadata)
│   │   │   ├── manifest.ts          # 🔄 UPDATE (new app name)
│   │   │   ├── page.tsx             # 🔄 REWRITE (new landing page)
│   │   │   ├── robots.ts            # ✅ KEEP
│   │   │   └── sitemap.ts           # 🔄 UPDATE (new routes)
│   │   ├── components/
│   │   │   ├── assets/              # ❌ DELETE (DAM-specific)
│   │   │   │   └── AssetCard.tsx    # ❌ DELETE
│   │   │   ├── dashboard/
│   │   │   │   └── OverviewChart.tsx # 🔄 REPURPOSE → Workflow stats
│   │   │   ├── layout/
│   │   │   │   └── Sidebar.tsx      # 🔄 UPDATE (new nav items)
│   │   │   └── ui/
│   │   │       └── Card.tsx         # ✅ KEEP
│   │   └── lib/
│   │       └── utils.ts             # ✅ KEEP
│   ├── package.json                 # 🔄 UPDATE (add dependencies)
│   └── [config files]               # ✅ KEEP
├── nexus_*/                         # ❌ DELETE ALL (old mockups)
├── LOCKED_GRID_PROMPT.md            # ✅ KEEP
├── PROJECT_PLAN.md                  # ❌ DELETE (replaced by this)
└── skills.md                        # ✅ KEEP
```

---

## 🗑️ FILES TO DELETE

Execute these deletions before starting new development:

```powershell
# Old DAM mockup folders (10 folders)
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_analytics_dashboard"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_asset_library_grid_view"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_asset_upload_modal"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_dam_asset_management_dashboard_1"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_dam_asset_management_dashboard_2"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_dam_asset_management_dashboard_3"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_integrations_marketplace"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_notification_center_panel"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_settings_&_brand_configuration"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\nexus_user_management_&_permissions"

# Old SVG assets
Remove-Item -Force "C:\Users\Administrator\Desktop\Nexus\app\public\file.svg"
Remove-Item -Force "C:\Users\Administrator\Desktop\Nexus\app\public\globe.svg"
Remove-Item -Force "C:\Users\Administrator\Desktop\Nexus\app\public\next.svg"
Remove-Item -Force "C:\Users\Administrator\Desktop\Nexus\app\public\vercel.svg"
Remove-Item -Force "C:\Users\Administrator\Desktop\Nexus\app\public\window.svg"

# DAM-specific code
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\app\src\app\(dashboard)\assets"
Remove-Item -Recurse -Force "C:\Users\Administrator\Desktop\Nexus\app\src\components\assets"

# Old project plan (replaced by this file)
Remove-Item -Force "C:\Users\Administrator\Desktop\Nexus\PROJECT_PLAN.md"
```

---

## 📂 NEW FILE STRUCTURE

After cleanup, create this structure:

```
Nexus/
├── .agent/
│   └── workflows/
│       └── nexus-flow-development.md     # NEW workflow guide
├── app/
│   ├── public/
│   │   ├── favicon.ico                   # UPDATE
│   │   ├── icon-192.png                  # CREATE (PWA)
│   │   ├── icon-512.png                  # CREATE (PWA)
│   │   ├── og-image.png                  # CREATE (1200x630)
│   │   └── logo.svg                      # CREATE (brand)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/                   # NEW route group
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx          # Login page
│   │   │   │   ├── signup/
│   │   │   │   │   └── page.tsx          # Signup page
│   │   │   │   └── layout.tsx            # Auth layout
│   │   │   ├── (dashboard)/
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx          # Workflow analytics
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx          # Home/overview
│   │   │   │   ├── workflows/            # NEW
│   │   │   │   │   ├── page.tsx          # Workflow list
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── page.tsx      # Workflow detail
│   │   │   │   │   └── builder/
│   │   │   │   │       └── page.tsx      # Visual builder
│   │   │   │   ├── agents/               # NEW
│   │   │   │   │   ├── page.tsx          # AI agents list
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx      # Agent config
│   │   │   │   ├── templates/            # NEW
│   │   │   │   │   └── page.tsx          # Starter templates
│   │   │   │   ├── executions/           # NEW
│   │   │   │   │   └── page.tsx          # Execution history
│   │   │   │   ├── integrations/
│   │   │   │   │   └── page.tsx          # Connected apps
│   │   │   │   ├── settings/
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   └── page.tsx          # Settings + billing
│   │   │   │   ├── users/
│   │   │   │   │   └── page.tsx          # Team management
│   │   │   │   └── layout.tsx            # Dashboard layout
│   │   │   ├── api/                      # NEW
│   │   │   │   ├── auth/
│   │   │   │   │   └── [...nextauth]/
│   │   │   │   │       └── route.ts      # NextAuth handler
│   │   │   │   ├── workflows/
│   │   │   │   │   └── route.ts          # CRUD workflows
│   │   │   │   ├── agents/
│   │   │   │   │   └── route.ts          # Agent management
│   │   │   │   ├── executions/
│   │   │   │   │   └── route.ts          # Run workflows
│   │   │   │   └── webhooks/
│   │   │   │       └── route.ts          # Incoming webhooks
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx                # UPDATE metadata
│   │   │   ├── manifest.ts               # UPDATE app info
│   │   │   ├── page.tsx                  # REWRITE landing
│   │   │   ├── robots.ts
│   │   │   └── sitemap.ts                # UPDATE routes
│   │   ├── components/
│   │   │   ├── auth/                     # NEW
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── SignupForm.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsCards.tsx        # NEW
│   │   │   │   └── RecentExecutions.tsx  # NEW
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx           # UPDATE nav items
│   │   │   │   └── Header.tsx            # NEW top bar
│   │   │   ├── workflows/                # NEW
│   │   │   │   ├── WorkflowCard.tsx
│   │   │   │   ├── WorkflowBuilder.tsx
│   │   │   │   ├── NodePalette.tsx
│   │   │   │   └── Canvas.tsx
│   │   │   ├── agents/                   # NEW
│   │   │   │   ├── AgentCard.tsx
│   │   │   │   └── AgentConfig.tsx
│   │   │   ├── integrations/             # NEW
│   │   │   │   └── IntegrationCard.tsx
│   │   │   └── ui/
│   │   │       ├── Card.tsx
│   │   │       ├── Button.tsx            # NEW
│   │   │       ├── Input.tsx             # NEW
│   │   │       ├── Modal.tsx             # NEW
│   │   │       └── Badge.tsx             # NEW
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   ├── auth.ts                   # NEW (NextAuth config)
│   │   │   ├── db.ts                     # NEW (database client)
│   │   │   └── ai.ts                     # NEW (AI agent utils)
│   │   └── types/                        # NEW
│   │       ├── workflow.ts
│   │       ├── agent.ts
│   │       └── execution.ts
│   ├── prisma/                           # NEW
│   │   └── schema.prisma                 # Database schema
│   └── package.json                      # UPDATE dependencies
├── NEXUS_FLOW_BLUEPRINT.md               # THIS FILE
├── LOCKED_GRID_PROMPT.md
└── skills.md
```

---

## 🗺️ NEW SITEMAP

| Route | Page | Priority | Auth Required |
|-------|------|----------|---------------|
| `/` | Landing Page | 1.0 | No |
| `/login` | Login | 0.3 | No |
| `/signup` | Signup | 0.3 | No |
| `/dashboard` | Home Dashboard | 0.9 | Yes |
| `/workflows` | Workflow List | 0.9 | Yes |
| `/workflows/[id]` | Workflow Detail | 0.8 | Yes |
| `/workflows/builder` | Visual Builder | 0.9 | Yes |
| `/agents` | AI Agents | 0.8 | Yes |
| `/agents/[id]` | Agent Config | 0.7 | Yes |
| `/templates` | Templates Library | 0.7 | Yes |
| `/executions` | Execution History | 0.7 | Yes |
| `/integrations` | Connected Apps | 0.7 | Yes |
| `/analytics` | Analytics Dashboard | 0.8 | Yes |
| `/settings` | Settings & Billing | 0.5 | Yes |
| `/users` | Team Management | 0.6 | Yes |

---

## 🎨 BRANDING UPDATE

### Old Branding (Remove)
- Name: "Nexus DAM"
- Tagline: "Manage Assets Without Chaos"
- Focus: Digital Asset Management

### New Branding (Apply)
- Name: **"Nexus Flow"**
- Tagline: **"Automate Work. Amplify Teams."**
- Alternative: "AI Agents That Actually Get Things Done"
- Focus: AI Workflow Automation

### Color Palette (Keep)
The existing Midnight Nexus palette works perfectly for a B2B AI product:
- Primary: `#0d59f2` (Nexus Blue)
- Background: `#050a14` (Deep Midnight)
- Accent: `#6366f1` (Indigo for AI features)

### Logo Concept
- Icon: Abstract flow/circuit design OR stylized "N" with motion lines
- Style: Clean, geometric, tech-forward

---

## 🛠️ TECH STACK ADDITIONS

### Current Dependencies (Keep)
```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "framer-motion": "^12.29.2",
  "tailwindcss": "^4",
  "recharts": "^3.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.4.0"
}
```

### New Dependencies (Add)
```json
{
  "dependencies": {
    // Authentication
    "next-auth": "^5.0.0",
    "@auth/prisma-adapter": "^2.0.0",
    
    // Database
    "@prisma/client": "^6.0.0",
    
    // AI & Automation
    "@anthropic-ai/sdk": "^0.32.0",
    "openai": "^4.77.0",
    "ai": "^4.0.0",
    
    // Workflow Builder UI
    "@xyflow/react": "^12.0.0",
    "zustand": "^5.0.0",
    
    // Forms & Validation
    "react-hook-form": "^7.54.0",
    "zod": "^3.24.0",
    "@hookform/resolvers": "^5.0.0",
    
    // Payments
    "stripe": "^17.0.0",
    "@stripe/stripe-js": "^5.0.0",
    
    // Queue & Background Jobs
    "bullmq": "^5.0.0",
    
    // Utilities
    "date-fns": "^4.1.0",
    "uuid": "^11.0.0"
  },
  "devDependencies": {
    "prisma": "^6.0.0"
  }
}
```

---

## 🗄️ DATABASE SCHEMA

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== AUTH ====================
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          Role      @default(MEMBER)
  
  organizationId String?
  organization   Organization? @relation(fields: [organizationId], references: [id])
  
  workflows     Workflow[]
  executions    Execution[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  logo        String?
  
  plan        Plan     @default(FREE)
  stripeCustomerId String?
  
  users       User[]
  workflows   Workflow[]
  agents      Agent[]
  integrations Integration[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Role {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

enum Plan {
  FREE
  STARTER
  PRO
  ENTERPRISE
}

// ==================== WORKFLOWS ====================
model Workflow {
  id          String   @id @default(cuid())
  name        String
  description String?
  icon        String?
  
  // Visual builder data (nodes, edges, etc.)
  definition  Json
  
  status      WorkflowStatus @default(DRAFT)
  isTemplate  Boolean  @default(false)
  
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  
  createdById String
  createdBy   User     @relation(fields: [createdById], references: [id])
  
  executions  Execution[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum WorkflowStatus {
  DRAFT
  ACTIVE
  PAUSED
  ARCHIVED
}

// ==================== AI AGENTS ====================
model Agent {
  id          String   @id @default(cuid())
  name        String
  description String?
  avatar      String?
  
  // Agent configuration
  systemPrompt String   @db.Text
  model       String   @default("claude-3-sonnet")
  temperature Float    @default(0.7)
  tools       Json     // Available tools/functions
  
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// ==================== EXECUTIONS ====================
model Execution {
  id          String   @id @default(cuid())
  
  workflowId  String
  workflow    Workflow @relation(fields: [workflowId], references: [id])
  
  triggeredById String?
  triggeredBy   User?    @relation(fields: [triggeredById], references: [id])
  
  status      ExecutionStatus @default(PENDING)
  
  // Input data that triggered this execution
  input       Json?
  
  // Result data after completion
  output      Json?
  
  // Step-by-step logs
  logs        ExecutionLog[]
  
  startedAt   DateTime?
  completedAt DateTime?
  
  createdAt   DateTime @default(now())
}

model ExecutionLog {
  id          String   @id @default(cuid())
  
  executionId String
  execution   Execution @relation(fields: [executionId], references: [id])
  
  nodeId      String   // Which node in the workflow
  nodeName    String
  
  status      String
  message     String?
  data        Json?
  
  timestamp   DateTime @default(now())
}

enum ExecutionStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
  CANCELLED
}

// ==================== INTEGRATIONS ====================
model Integration {
  id          String   @id @default(cuid())
  
  provider    String   // "slack", "gmail", "salesforce", etc.
  name        String
  
  // OAuth tokens (encrypted)
  accessToken  String?
  refreshToken String?
  expiresAt    DateTime?
  
  // Provider-specific config
  config      Json?
  
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🖼️ LANDING PAGE CONTENT

### Hero Section
```
Headline: Automate Work. Amplify Teams.
Subheadline: Build AI-powered workflows that run 24/7. 
             From sales follow-ups to customer onboarding—
             let intelligent agents handle the repetitive work.

CTA Primary: Start Free Trial
CTA Secondary: Watch Demo (2 min)
```

### Features (Bento Grid)
1. **Visual Workflow Builder** - Drag, drop, connect. No code required.
2. **AI Agent Studio** - Train agents that understand your business.
3. **50+ Integrations** - Connect Slack, Gmail, Salesforce, and more.
4. **Real-Time Analytics** - Track time saved and ROI instantly.
5. **Templates Library** - Pre-built workflows to get started in minutes.
6. **Enterprise Security** - SOC 2 compliant, SSO, audit logs.

### Social Proof
- "Saved our sales team 20 hours per week" - VP Sales, TechCorp
- 5000+ workflows automated
- 4.9/5 rating on G2

### Pricing Section
| Plan | Price | Features |
|------|-------|----------|
| Free | $0/mo | 3 workflows, 100 executions/mo |
| Starter | $29/mo | 10 workflows, 1,000 executions/mo |
| Pro | $99/mo | Unlimited workflows, 10,000 executions/mo |
| Enterprise | Custom | Unlimited everything, SSO, dedicated support |

---

## 📋 IMPLEMENTATION ORDER

### Phase 1: Foundation (Week 1-2)
1. ❌ Delete old files (run cleanup script)
2. 🔄 Update `package.json` with new dependencies
3. 🔄 Set up Prisma + PostgreSQL
4. 🆕 Create `(auth)` route group with login/signup
5. 🔄 Rebrand root `layout.tsx` and `manifest.ts`
6. 🔄 Rewrite landing `page.tsx` with new content

### Phase 2: Core App (Week 3-4)
1. 🔄 Update Sidebar navigation
2. 🆕 Create `/workflows` page (list view)
3. 🆕 Build `/workflows/builder` with @xyflow/react
4. 🆕 Create `/agents` page (AI agent management)
5. 🆕 Create `/executions` page (history)
6. 🔄 Enhance `/integrations` (connection flow)

### Phase 3: AI Engine (Week 5-6)
1. 🆕 Build execution engine (process workflows)
2. 🆕 Integrate Claude/GPT for agent intelligence
3. 🆕 Create webhook handlers for triggers
4. 🆕 Build real-time execution monitoring

### Phase 4: Polish & Launch (Week 7-8)
1. 🔄 Dashboard with real analytics
2. 🆕 Stripe billing integration
3. 🆕 Create 10 starter templates
4. 🔄 SEO optimization (meta tags, OG images)
5. 🆕 Onboarding flow for new users
6. ✅ Production deployment

---

## 🔐 ENVIRONMENT VARIABLES

```env
# .env.local

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nexus_flow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# AI Providers
ANTHROPIC_API_KEY=""
OPENAI_API_KEY=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Redis (for BullMQ job queue)
REDIS_URL="redis://localhost:6379"

# App
NEXT_PUBLIC_BASE_URL="https://nexusflow.app"
```

---

## ✅ VALIDATION CHECKLIST

Before considering any phase complete:

- [ ] All routes load without errors
- [ ] `npm run build` succeeds
- [ ] Mobile responsive (test 375px, 768px, 1440px)
- [ ] Dark mode working
- [ ] Animations respect `prefers-reduced-motion`
- [ ] All forms validate properly
- [ ] API endpoints return correct status codes
- [ ] Authentication flows work end-to-end
- [ ] Database migrations applied

---

## 📚 REFERENCE SKILLS

Apply these skills throughout development:

| Task | Skill to Use |
|------|--------------|
| UI Components | `ui-ux-trends-2026` |
| Animations | `motion-ux-2026` |
| Grid System | `LOCKED_GRID_PROMPT.md` |
| Performance | `vercel-react-best-practices` |
| Landing Page Copy | `copywriting` |
| SEO | `programmatic-seo`, `seo-audit` |
| Forms | `react-hook-form` patterns |

---

## 🚨 CRITICAL REMINDERS

1. **Always use the Locked Grid system** - No `max-w-7xl`, use `.container`
2. **Follow the 2026 design system** - Liquid Glass, Bento Grids, Clay Buttons
3. **Respect the color palette** - Midnight Nexus dark theme
4. **Add metadata to every page** - Title, description, canonical URL
5. **Use `animate-fade-in`** - On all page transitions
6. **Keep forms accessible** - Labels, error states, focus rings
7. **Test on mobile first** - Design breakpoints: 375px → 768px → 1440px

---

*Document Version: 1.0*
*Created: 2026-02-08*
*For: Agent Development Team*
