# 🚀 NEXUS FLOW - COMPLETE SAAS IMPLEMENTATION PLAN
## AI Workflow Automation Platform - Final Production Build

> **Document Version**: 2.0  
> **Created**: 2026-02-09  
> **Repository**: https://github.com/ahmedaesakr/Nexus_Saas  
> **Purpose**: Complete guide for agents to build a production-ready SaaS application

---

## 📌 QUICK REFERENCE

| Item | Value |
|------|-------|
| **Product Name** | Nexus Flow |
| **Tagline** | "Automate Work. Amplify Teams." |
| **Target Market** | SMB to Mid-Market B2B (50-500 employees) |
| **Tech Stack** | Next.js 16, React 19, Tailwind v4, Framer Motion, React Flow |
| **Primary Color** | `#0d59f2` (Nexus Blue) |
| **Background** | `#050a14` (Deep Midnight) |

---

## 📊 CURRENT PROJECT STATUS

### ✅ Completed Features
| Feature | Status | Location |
|---------|--------|----------|
| Design System (2026 UI/UX) | ✅ Complete | `src/app/globals.css` |
| Landing Page (Basic) | ✅ Complete | `src/app/page.tsx` |
| Dashboard Layout | ✅ Complete | `src/app/(dashboard)/layout.tsx` |
| Sidebar Navigation | ✅ Complete | `src/components/layout/Sidebar.tsx` |
| Login/Signup Pages | ✅ Complete | `src/app/(auth)/` |
| KPI Dashboard | ✅ Complete | `src/app/(dashboard)/dashboard/page.tsx` |
| Workflow Builder (Basic) | ✅ Complete | `src/app/(dashboard)/workflows/builder/` |
| React Flow Integration | ✅ Complete | `src/components/workflows/WorkflowBuilder.tsx` |

### 🔄 Requires Enhancement
| Feature | Current State | Target State |
|---------|---------------|--------------|
| Landing Page | Hero + Features only | Full marketing page |
| Workflow Builder | 1 node type | 6+ node types + full drag-drop |
| Templates Gallery | Not implemented | 10+ starter templates |
| Onboarding | Not implemented | 5-step wizard |
| Billing/Pricing | Not implemented | Stripe integration |
| Analytics | Mock data | Real charts with Recharts |
| Notifications | Not implemented | Toast + notification panel |

---

## 🗂️ PROJECT FILE STRUCTURE

```
c:\Users\Administrator\Desktop\Nexus\app\
├── public/
│   ├── favicon.ico              # ✅ Exists
│   ├── icon-192.png             # 🆕 CREATE (PWA)
│   ├── icon-512.png             # 🆕 CREATE (PWA)
│   ├── og-image.png             # 🆕 CREATE (1200x630)
│   └── logo.svg                 # 🆕 CREATE
├── prisma/
│   └── schema.prisma            # ✅ Exists (database schema)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx   # ✅ Exists
│   │   │   ├── signup/page.tsx  # ✅ Exists
│   │   │   └── layout.tsx       # ✅ Exists
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/       # ✅ Exists - 🔄 ENHANCE
│   │   │   ├── workflows/       # ✅ Exists - 🔄 ENHANCE
│   │   │   ├── agents/          # ✅ Exists - 🔄 ENHANCE
│   │   │   ├── templates/       # 🆕 CREATE
│   │   │   ├── executions/      # ✅ Exists - 🔄 ENHANCE
│   │   │   ├── integrations/    # ✅ Exists - 🔄 ENHANCE
│   │   │   ├── analytics/       # ✅ Exists - 🔄 ENHANCE
│   │   │   ├── settings/        # ✅ Exists - 🔄 ENHANCE (add billing)
│   │   │   ├── users/           # ✅ Exists
│   │   │   └── layout.tsx       # ✅ Exists
│   │   ├── api/                 # 🆕 CREATE (API routes)
│   │   │   ├── auth/
│   │   │   ├── workflows/
│   │   │   ├── agents/
│   │   │   └── executions/
│   │   ├── globals.css          # ✅ Exists (design system)
│   │   ├── layout.tsx           # ✅ Exists
│   │   ├── page.tsx             # ✅ Exists - 🔄 ENHANCE
│   │   ├── manifest.ts          # ✅ Exists
│   │   ├── robots.ts            # ✅ Exists
│   │   └── sitemap.ts           # ✅ Exists - 🔄 UPDATE
│   ├── components/
│   │   ├── auth/                # ✅ Exists
│   │   ├── dashboard/           # 🔄 ENHANCE
│   │   ├── layout/              # ✅ Exists
│   │   ├── workflows/           # ✅ Exists - 🔄 ENHANCE (more nodes)
│   │   ├── templates/           # 🆕 CREATE
│   │   ├── onboarding/          # 🆕 CREATE
│   │   ├── billing/             # 🆕 CREATE
│   │   └── ui/                  # 🔄 ENHANCE (more components)
│   ├── lib/
│   │   ├── utils.ts             # ✅ Exists
│   │   ├── auth.ts              # 🆕 CREATE
│   │   ├── db.ts                # 🆕 CREATE
│   │   └── api.ts               # 🆕 CREATE
│   └── types/                   # 🆕 CREATE
│       ├── workflow.ts
│       ├── agent.ts
│       └── execution.ts
├── NEXUS_FLOW_BLUEPRINT.md      # ✅ Exists (original plan)
├── NEXUS_SAAS_IMPLEMENTATION_PLAN.md  # THIS FILE
├── LOCKED_GRID_PROMPT.md        # ✅ Exists
├── skills.md                    # ✅ Exists
└── package.json                 # ✅ Exists
```

---

## 🎯 IMPLEMENTATION PHASES

---

### PHASE 1: LANDING PAGE COMPLETION
**Priority**: 🔴 CRITICAL  
**Estimated Time**: 4-6 hours  
**Goal**: Convert visitors to sign-ups with a complete marketing page

#### Tasks:

##### 1.1 Solutions/Use Cases Section
**File**: `src/app/page.tsx` (add after Features section)
```
- Create 4 industry cards: Sales, Marketing, Support, Operations
- Each card: Icon, title, 3 bullet points, "Learn More" link
- Layout: 2x2 grid on desktop, single column on mobile
- Animation: Stagger fade-in on scroll
```

##### 1.2 How It Works Section
**File**: `src/app/page.tsx`
```
- 3-step process: Build → Connect → Automate
- Each step: Large number, icon, title, description
- Visual: Connecting line/arrows between steps
- Animation: Sequential reveal on scroll
```

##### 1.3 Pricing Section
**File**: `src/app/page.tsx`
```
PRICING TIERS:
┌─────────────┬──────────────┬───────────────┬────────────────┐
│ FREE        │ STARTER      │ PRO           │ ENTERPRISE     │
├─────────────┼──────────────┼───────────────┼────────────────┤
│ $0/mo       │ $29/mo       │ $99/mo        │ Custom         │
│             │              │ (POPULAR)     │                │
├─────────────┼──────────────┼───────────────┼────────────────┤
│ 3 workflows │ 10 workflows │ Unlimited     │ Unlimited      │
│ 100 exec/mo │ 1k exec/mo   │ 10k exec/mo   │ Unlimited      │
│ 1 team      │ 5 team       │ 25 team       │ Unlimited      │
│ Email       │ Email+Chat   │ Priority      │ Dedicated      │
└─────────────┴──────────────┴───────────────┴────────────────┘
```
- Design: Cards with glassmorphism, PRO card highlighted
- CTA: "Get Started" buttons leading to /signup?plan=X

##### 1.4 Testimonials Section
**File**: `src/app/page.tsx`
```
- 3 testimonial cards with quote, avatar, name, role, company
- Optional: Logo strip of "Trusted by" companies
- Layout: 3-column grid or carousel
```

##### 1.5 FAQ Accordion
**File**: `src/app/page.tsx` or new component `src/components/landing/FAQ.tsx`
```
FAQ ITEMS:
1. What types of workflows can I automate?
2. How do AI agents work?
3. What integrations are available?
4. Is my data secure?
5. Can I cancel anytime?
6. Do you offer a free trial?
```
- Interaction: Click to expand, smooth height animation

##### 1.6 Final CTA Section
**File**: `src/app/page.tsx`
```
- Full-width gradient background
- Headline: "Ready to automate your workflows?"
- Subheadline: "Start your free trial today. No credit card required."
- Two CTAs: "Start Free Trial" (primary), "Talk to Sales" (secondary)
```

##### 1.7 Enhanced Footer
**File**: `src/app/page.tsx`
```
FOOTER COLUMNS:
- Product: Features, Pricing, Templates, Integrations
- Company: About, Blog, Careers, Contact
- Resources: Documentation, API, Help Center, Status
- Legal: Privacy, Terms, Security
- Social icons: Twitter, LinkedIn, GitHub
```

---

### PHASE 2: ONBOARDING FLOW
**Priority**: 🔴 CRITICAL  
**Estimated Time**: 6-8 hours  
**Goal**: Activate new users within 5 minutes of signup

#### Files to Create:
- `src/components/onboarding/OnboardingModal.tsx`
- `src/components/onboarding/StepRoleSelection.tsx`
- `src/components/onboarding/StepGoals.tsx`
- `src/components/onboarding/StepTemplateSelect.tsx`
- `src/components/onboarding/StepIntegration.tsx`
- `src/components/onboarding/ProgressSidebar.tsx`

#### Tasks:

##### 2.1 Welcome Modal
```
- Trigger: After first successful login (check localStorage flag)
- Content: Celebration animation (confetti), welcome message
- CTA: "Let's get started" button
```

##### 2.2 Step 1: Role Selection
```
ROLES:
- Sales & Revenue Operations
- Marketing & Growth
- Customer Support
- IT & Operations
- Other

- Layout: Large clickable cards with icons
- Single selection required
```

##### 2.3 Step 2: Goals Selection
```
GOALS:
□ Automate lead qualification
□ Streamline customer onboarding
□ Reduce support ticket volume
□ Sync data between tools
□ Send automated follow-ups
□ Generate reports automatically

- Layout: Checkbox list
- Minimum 1 selection, maximum 5
```

##### 2.4 Step 3: Template Selection
```
- Show 3-4 recommended templates based on role/goals
- Each template: preview image, title, description, "Use This" button
- Option: "Skip and start from scratch"
```

##### 2.5 Step 4: First Integration
```
PRIORITY INTEGRATIONS:
- Slack (send messages, receive triggers)
- Gmail (send emails, parse inbox)
- Google Sheets (read/write data)

- Show OAuth connect buttons
- Option: "Skip for now"
```

##### 2.6 Completion
```
- Show checklist summary
- Redirect to dashboard or workflow builder
- Mark onboarding complete in localStorage/database
```

---

### PHASE 3: WORKFLOW BUILDER ENHANCEMENT
**Priority**: 🔴 CRITICAL  
**Estimated Time**: 10-12 hours  
**Goal**: Make workflow building intuitive and delightful

#### Files to Modify/Create:
- `src/components/workflows/WorkflowBuilder.tsx` - ENHANCE
- `src/components/workflows/nodes/TriggerNode.tsx` - CREATE
- `src/components/workflows/nodes/ActionNode.tsx` - CREATE
- `src/components/workflows/nodes/ConditionNode.tsx` - CREATE
- `src/components/workflows/nodes/LoopNode.tsx` - CREATE
- `src/components/workflows/nodes/DelayNode.tsx` - CREATE
- `src/components/workflows/nodes/AgentNode.tsx` - ENHANCE
- `src/components/workflows/NodePropertyPanel.tsx` - CREATE
- `src/components/workflows/ExecutionSimulator.tsx` - CREATE

#### Tasks:

##### 3.1 Node Type Definitions
```typescript
// src/types/workflow.ts

export type NodeType = 
  | 'trigger'      // Start node (webhook, schedule, manual)
  | 'action'       // Do something (send email, update record)
  | 'condition'    // If/else branching
  | 'loop'         // Iterate over items
  | 'delay'        // Wait for time period
  | 'ai-agent';    // AI-powered task

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    config: Record<string, any>;
    status?: 'idle' | 'running' | 'success' | 'error';
  };
}
```

##### 3.2 Node Visual Designs
```
TRIGGER NODE (Orange/Amber):
┌───────────────────────────────┐
│ ⚡ Trigger                    │
│ ─────────────────────────────  │
│ When: New form submission     │
│ Source: Typeform              │
└───────────────────────────────┘

ACTION NODE (Blue):
┌───────────────────────────────┐
│ ▶️ Action                     │
│ ─────────────────────────────  │
│ Send: Welcome email           │
│ To: {{trigger.email}}         │
└───────────────────────────────┘

CONDITION NODE (Purple):
┌───────────────────────────────┐
│ ⑃ Condition                   │
│ ─────────────────────────────  │
│ If: ticket.priority = "high"  │
│      ✓ True    ✗ False       │
└───────────────────────────────┘

AI AGENT NODE (Indigo gradient):
┌───────────────────────────────┐
│ 🧠 AI Agent                   │
│ ─────────────────────────────  │
│ Agent: Sales Qualifier        │
│ Model: Claude 3.5 Sonnet      │
└───────────────────────────────┘
```

##### 3.3 Property Panel
```
When a node is selected, show right panel with:
- Node type icon + label (editable)
- Type-specific configuration form:
  - Trigger: Event type dropdown, source selection
  - Action: Action type, target app, field mappings
  - Condition: Field, operator, value inputs
  - AI Agent: System prompt, model, temperature, tools
- Delete button
- Duplicate button
```

##### 3.4 Drag-and-Drop from Palette
```
- Draggable items in left sidebar
- Ghost preview while dragging
- Drop zone highlighting on canvas
- Snap-to-grid on drop
```

##### 3.5 Connection Validation
```
RULES:
- Triggers can only be START nodes (no incoming connections)
- Actions can connect to anything
- Conditions must have TRUE and FALSE outputs
- Maximum 1 Trigger per workflow

VISUAL FEEDBACK:
- Invalid drop: Red highlight + shake animation
- Valid drop: Green highlight + pulse
```

##### 3.6 Test Run Simulation
```
- "Test Run" button in header
- Modal to input test data (JSON or form)
- Visual execution: nodes light up in sequence
- Show output data at each step
- Success/error summary at end
```

---

### PHASE 4: TEMPLATES GALLERY
**Priority**: 🟡 HIGH  
**Estimated Time**: 6-8 hours  
**Goal**: Reduce time-to-value with pre-built workflows

#### Files to Create:
- `src/app/(dashboard)/templates/page.tsx`
- `src/components/templates/TemplateCard.tsx`
- `src/components/templates/TemplatePreviewModal.tsx`
- `src/data/templates.ts` (static template definitions)

#### Tasks:

##### 4.1 Template Page Layout
```
/templates page:
- Header: "Templates" title + "Request Template" button
- Filter bar: Category tabs (All, Sales, Marketing, Support, Operations)
- Grid: 3-column card layout
- Empty state if no templates match filter
```

##### 4.2 Template Card Design
```
┌─────────────────────────────────────┐
│ [Workflow Preview Image/Diagram]    │
├─────────────────────────────────────┤
│ 📧 Lead Qualification Workflow      │
│ ─────────────────────────────────── │
│ Automatically qualify leads using   │
│ AI and route to the right rep.      │
│ ─────────────────────────────────── │
│ 🏷️ Sales  ⚡ 3 steps  ⏱️ 5 min    │
│ ─────────────────────────────────── │
│ [Use Template]  [Preview]           │
└─────────────────────────────────────┘
```

##### 4.3 Template Preview Modal
```
- Full workflow diagram (read-only React Flow)
- Description + use case
- Required integrations list
- "Use This Template" CTA → clones to user's workflows
```

##### 4.4 Template Data Structure
```typescript
// src/data/templates.ts

export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'sales' | 'marketing' | 'support' | 'operations';
  estimatedTime: string;
  requiredIntegrations: string[];
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
```

##### 4.5 10 Starter Templates
```
SALES:
1. Lead Qualification Agent - AI scores and routes leads
2. Follow-Up Sequence - Automated email follow-ups
3. Meeting Scheduler - AI books meetings from emails

MARKETING:
4. Social Listener - Monitor mentions and respond
5. Content Repurposer - Turn blog posts into tweets

SUPPORT:
6. Ticket Triage - AI categorizes and prioritizes
7. FAQ Auto-Responder - Answer common questions
8. Escalation Flow - Route to human when needed

OPERATIONS:
9. Data Sync - Keep systems in sync
10. Report Generator - Weekly automated reports
```

---

### PHASE 5: DASHBOARD ENHANCEMENTS
**Priority**: 🟡 HIGH  
**Estimated Time**: 4-6 hours  
**Goal**: Show clear ROI and drive daily engagement

#### Files to Modify:
- `src/app/(dashboard)/dashboard/page.tsx` - ENHANCE
- `src/components/dashboard/ExecutionChart.tsx` - CREATE
- `src/components/dashboard/TimeSavedCard.tsx` - CREATE
- `src/components/dashboard/QuickActions.tsx` - CREATE
- `src/components/dashboard/ActiveWorkflows.tsx` - CREATE

#### Tasks:

##### 5.1 Real Charts with Recharts
```
Replace mock bar chart with:
- Area chart for executions over time
- Tooltip with exact values
- Time range selector (7d, 30d, 90d)
```

##### 5.2 Time Saved Widget
```
┌─────────────────────────────────┐
│ ⏱️ Time Saved This Month       │
│                                 │
│     45 hours 32 minutes        │
│     ▲ +12h from last month     │
│                                 │
│ That's $1,365 in labor costs!  │
└─────────────────────────────────┘
- Animated counter on load
- Calculation: executions × avg_time_saved_per_execution
```

##### 5.3 Quick Actions Grid
```
4 action cards:
- ➕ Create Workflow → /workflows/builder
- 📋 Browse Templates → /templates
- 🔌 Add Integration → /integrations
- 📊 View Reports → /analytics
```

##### 5.4 Active Workflows List
```
| Workflow Name       | Status   | Last Run  | Actions    |
|---------------------|----------|-----------|------------|
| Lead Qualifier      | 🟢 Active | 2m ago   | ⏸️ 📊 ⚙️ |
| Email Sequences     | 🟢 Active | 1h ago   | ⏸️ 📊 ⚙️ |
| Support Triage      | ⏸️ Paused | 2d ago   | ▶️ 📊 ⚙️ |
```

---

### PHASE 6: SETTINGS & BILLING
**Priority**: 🟡 HIGH  
**Estimated Time**: 6-8 hours  
**Goal**: Enable subscription revenue

#### Files to Create/Modify:
- `src/app/(dashboard)/settings/page.tsx` - ENHANCE
- `src/app/(dashboard)/settings/billing/page.tsx` - CREATE
- `src/app/(dashboard)/settings/team/page.tsx` - ENHANCE from users
- `src/components/billing/PlanCard.tsx` - CREATE
- `src/components/billing/UsageMeter.tsx` - CREATE
- `src/components/billing/UpgradeModal.tsx` - CREATE

#### Tasks:

##### 6.1 Settings Page Tabs
```
Settings navigation:
- Profile (name, email, avatar, password)
- Team (invite, manage roles)
- Billing (plan, usage, invoices)
- Notifications (email preferences)
- API Keys (developer access)
```

##### 6.2 Billing Page Layout
```
┌─────────────────────────────────────────────────────────┐
│ Current Plan: PRO                                       │
│ $99/month • Renews Feb 28, 2026                        │
│ [Change Plan]  [Cancel]                                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Usage This Month                                        │
│ ─────────────────────────────────────────────────────── │
│ Executions:     ████████████░░░░░░░░  7,500 / 10,000   │
│ Workflows:      ████████████████████  12 / Unlimited   │
│ Team Members:   ████████░░░░░░░░░░░░  8 / 25           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Invoice History                                         │
│ ─────────────────────────────────────────────────────── │
│ Jan 2026  │ PRO Plan  │ $99.00  │ Paid  │ [Download]  │
│ Dec 2025  │ PRO Plan  │ $99.00  │ Paid  │ [Download]  │
└─────────────────────────────────────────────────────────┘
```

##### 6.3 Plan Comparison Modal
```
When clicking "Change Plan", show modal with:
- Side-by-side feature comparison
- Current plan highlighted
- Upgrade/downgrade CTAs
- Proration explanation
```

---

### PHASE 7: GLOBAL UX POLISH
**Priority**: 🟡 HIGH  
**Estimated Time**: 6-8 hours  
**Goal**: Premium SaaS feel throughout

#### Files to Create:
- `src/components/ui/Toast.tsx`
- `src/components/ui/Skeleton.tsx`
- `src/components/ui/EmptyState.tsx`
- `src/components/ui/ConfirmModal.tsx`
- `src/components/ui/CommandPalette.tsx`
- `src/lib/toast.ts` (toast context/hook)

#### Tasks:

##### 7.1 Toast Notification System
```tsx
// Usage: toast.success("Workflow saved!")

TYPES:
- success (green checkmark)
- error (red X)
- warning (amber warning)
- info (blue info)

BEHAVIOR:
- Appear top-right
- Auto-dismiss after 4s
- Manual dismiss with X
- Stack multiple toasts
```

##### 7.2 Skeleton Loaders
```
Create <Skeleton /> component for:
- Cards (rounded rectangle)
- Text lines (multiple thin bars)
- Avatar (circle)
- Table rows

Use in all data-fetching states
```

##### 7.3 Empty States
```
When no data:
- Illustrated icon or image
- Friendly message
- Primary action CTA

Examples:
- No workflows: "Create your first workflow"
- No executions: "Run a workflow to see history"
- No integrations: "Connect your first app"
```

##### 7.4 Confirmation Modals
```
For destructive actions:
- Delete workflow
- Remove team member
- Cancel subscription

Design:
- Title: "Are you sure?"
- Description of consequences
- Cancel button (secondary)
- Confirm button (red/destructive)
```

##### 7.5 Command Palette (Cmd+K)
```
Global keyboard shortcut:
- Search workflows by name
- Quick navigation to any page
- Recent items
- Create new workflow shortcut
```

##### 7.6 Theme Toggle
```
- Add toggle in settings
- Dark mode (current, default)
- Light mode (design needed)
- System preference option
- Store preference in localStorage
```

---

## 🎨 DESIGN SYSTEM REFERENCE

### Color Palette
```css
/* Primary */
--primary: #0d59f2;
--primary-hover: #0b4bcc;
--primary-glow: rgba(13, 89, 242, 0.4);

/* Backgrounds */
--midnight-950: #02040a;
--midnight-900: #050a14;
--surface: #0c1018;

/* Status */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;

/* Accents */
--indigo: #6366f1;
--purple: #8b5cf6;
--pink: #ec4899;
```

### Typography
```
Font: Inter (Google Fonts)
Headings: font-bold, tracking-tight
Body: text-gray-400 (muted), text-white (emphasis)
```

### Spacing Scale
```
4px  → p-1, m-1
8px  → p-2, m-2
16px → p-4, m-4
24px → p-6, m-6
32px → p-8, m-8
```

### Animation Classes
```css
.animate-fade-in     /* Page entrance */
.btn-tactile         /* Button hover/press */
.hover-lift          /* Card hover effect */
.liquid-glass        /* Glassmorphism card */
.gradient-text       /* Gradient headings */
```

---

## ✅ VALIDATION CHECKLIST

Before marking any phase complete, verify:

### Functionality
- [ ] All routes load without console errors
- [ ] `npm run build` succeeds
- [ ] Forms validate and show error states
- [ ] Buttons have loading states
- [ ] API calls handle errors gracefully

### Responsiveness
- [ ] Mobile (375px) - Single column, touch-friendly
- [ ] Tablet (768px) - Adjusted grid, collapsible sidebar
- [ ] Desktop (1440px) - Full layout

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Screen reader labels on icons/buttons
- [ ] `prefers-reduced-motion` respected

### Performance
- [ ] Lighthouse score > 90
- [ ] No layout shifts (CLS)
- [ ] Images optimized (WebP, lazy load)
- [ ] Code split per route

---

## 🔧 DEVELOPMENT COMMANDS

```bash
# Navigate to app directory
cd c:\Users\Administrator\Desktop\Nexus\app

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint

# Push to GitHub
git add .
git commit -m "feat: description"
git push origin master
```

---

## 📚 REFERENCE DOCUMENTS

| Document | Purpose | Location |
|----------|---------|----------|
| Blueprint | Original product vision | `NEXUS_FLOW_BLUEPRINT.md` |
| This Plan | Implementation guide | `NEXUS_SAAS_IMPLEMENTATION_PLAN.md` |
| Grid System | Layout rules | `LOCKED_GRID_PROMPT.md` |
| Skills | Design patterns | `skills.md` |

---

## 🚨 CRITICAL RULES FOR AGENTS

1. **Always use the Locked Grid system** - Use `.container` class, no `max-w-7xl`
2. **Follow 2026 design trends** - Liquid Glass, Bento Grids, Clay Buttons
3. **Respect the color palette** - Midnight Nexus dark theme, primary blue
4. **Add metadata to every page** - Title, description, canonical URL
5. **Use `animate-fade-in`** - On all page content
6. **Framer Motion for interactions** - Smooth, delightful animations
7. **Test on mobile first** - Responsive design is mandatory
8. **No placeholder content** - Use real or realistic mock data

---

## 📈 SUCCESS METRICS

The app is ready for launch when:
- [ ] Landing page complete with all sections
- [ ] User can sign up and complete onboarding
- [ ] User can create workflow with 3+ node types
- [ ] User can deploy and see execution history
- [ ] Billing page shows plan and usage
- [ ] All empty states have CTAs
- [ ] Toast notifications work globally
- [ ] `npm run build` succeeds with no warnings

---

*Document maintained by: Development Team*  
*Last updated: 2026-02-09*
