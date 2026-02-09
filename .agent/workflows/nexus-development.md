---
description: How to work on the Nexus DAM SaaS application
---

# Nexus DAM Development Workflow

## Prerequisites

Before starting any work on Nexus DAM, ensure you understand these fundamentals:

1. **Read the Project Plan**: `C:\Users\Administrator\Desktop\Nexus\PROJECT_PLAN.md`
2. **Check Active Skills**: `C:\Users\Administrator\Desktop\Nexus\skills.md`
3. **Understand the Design System**: `C:\Users\Administrator\Desktop\Nexus\app\src\app\globals.css`

---

## Project Location

```
C:\Users\Administrator\Desktop\Nexus\app
```

---

## Starting the Development Server

// turbo
```bash
cd C:\Users\Administrator\Desktop\Nexus\app
npm run dev
```

The app will be available at `http://localhost:3000`

---

## Key Files Reference

### Routing & Pages
| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Landing page (marketing) |
| `src/app/(dashboard)/layout.tsx` | Dashboard layout with sidebar |
| `src/app/(dashboard)/dashboard/page.tsx` | Main dashboard |
| `src/app/(dashboard)/assets/page.tsx` | Asset library |
| `src/app/(dashboard)/analytics/page.tsx` | Analytics |
| `src/app/(dashboard)/integrations/page.tsx` | Integrations marketplace |
| `src/app/(dashboard)/users/page.tsx` | Team management |
| `src/app/(dashboard)/settings/page.tsx` | Settings (client component) |

### SEO Files
| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with metadata + JSON-LD |
| `src/app/sitemap.ts` | Generates `/sitemap.xml` |
| `src/app/robots.ts` | Generates `/robots.txt` |
| `src/app/manifest.ts` | Generates PWA manifest |

### Core Components
| File | Purpose |
|------|---------|
| `src/components/layout/Sidebar.tsx` | Main navigation sidebar |
| `src/components/ui/Card.tsx` | Base card component |
| `src/components/assets/AssetCard.tsx` | Asset grid cards |
| `src/components/dashboard/OverviewChart.tsx` | Dashboard chart |

### Styling
| File | Purpose |
|------|---------|
| `src/app/globals.css` | Complete 2026 design system |
| `src/lib/utils.ts` | Utility functions (cn helper) |

---

## Design System Quick Reference

### Adding a New Page

1. Create the page file in `src/app/(dashboard)/[route]/page.tsx`
2. Add SEO metadata:
   ```tsx
   import type { Metadata } from "next";

   export const metadata: Metadata = {
       title: 'Page Title',
       description: 'Page description for SEO',
       alternates: {
           canonical: '/route',
       },
   };
   ```
3. Add route to `src/app/sitemap.ts`
4. Add navigation item to `src/components/layout/Sidebar.tsx`

### Using Design Classes

```tsx
// Liquid Glass card
<div className="liquid-glass p-6">...</div>

// Hover lift effect
<div className="hover-lift">...</div>

// Tactile button
<button className="btn-tactile">...</button>

// Clay button (primary)
<button className="clay-button-primary">...</button>

// Fade in animation
<div className="animate-fade-in">...</div>

// Staggered children
<div className="stagger-children">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Bento grid
<div className="bento-grid">
  <div className="bento-item featured">Large</div>
  <div className="bento-item">Normal</div>
</div>
```

### Using Icons

```tsx
<span className="material-symbols-outlined">icon_name</span>

// Common icons:
// grid_view, folder_open, bar_chart, extension
// group, settings, search, cloud_upload
// more_vert, person_add, analytics
```

### Color Variables

```css
/* Primary */
var(--primary)          /* #0d59f2 */
var(--primary-hover)    /* #0b4bcc */

/* Backgrounds */
var(--background-dark)  /* #050a14 */
var(--surface-dark)     /* #0c1018 */
var(--sidebar-dark)     /* #0d121c */

/* Glass */
var(--glass-bg)         /* rgba(255,255,255,0.05) */
var(--glass-border)     /* rgba(255,255,255,0.1) */
```

---

## Building for Production

// turbo
```bash
cd C:\Users\Administrator\Desktop\Nexus\app
npm run build
```

---

## Verification Steps

After making changes:

1. **Check Build**: `npm run build` should complete without errors
2. **Check Sitemap**: Visit `http://localhost:3000/sitemap.xml`
3. **Check Robots**: Visit `http://localhost:3000/robots.txt`
4. **Visual Check**: Ensure pages maintain 2026 UI/UX styling
5. **Accessibility**: Test keyboard navigation and focus states

---

## Skills to Apply

When working on Nexus DAM, always consult:

- **UI Work**: `ui-ux-trends-2026`, `motion-ux-2026`, `swiss-design-web`
- **Performance**: `vercel-react-best-practices`
- **SEO**: `programmatic-seo`, `seo-audit`
- **Content**: `copywriting`, `copy-editing`

Skills location: `C:\Users\Administrator\.gemini\antigravity\global_skills\`
