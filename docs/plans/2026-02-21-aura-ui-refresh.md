# Aura UI Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the UI overflow/squished bugs and implement the unified two-font (Outfit / Plus Jakarta Sans) design system using the selected aesthetic approach.

**Architecture:** We will systematically update `globals.css` variable tokens to flip the color palette to the chosen theme, adjust layout wrapper components (`FinalCTA`, `HeroSection`) to remove fixed narrow widths, and apply the font variables strictly. 

**Tech Stack:** Next.js (App Router), TailwindCSS, React

---

### Task 1: Fix Squished UI Elements

**Files:**
- Modify: `src/components/landing/FinalCTA.tsx`
- Modify: `src/components/landing/HeroSection.tsx`

**Step 1: Write the failing test**
*(Skipping literal test as this is a visual CSS fix)*

**Step 2: Run test to verify it fails**
Visually inspect localhost:3000 to see squished text in FinalCTA.

**Step 3: Write minimal implementation**
Adjust classes in `FinalCTA.tsx`:
Replace rigid widths or missing responsive wrappers with standard `w-full max-w-4xl mx-auto flex flex-col items-center px-4`. Ensure grids in Bento aren't overflowing by adding `overflow-hidden` or adjusting `gap`.

**Step 4: Run test to verify it passes**
Verify responsive layout in browser.

**Step 5: Commit**
```bash
git add src/components/landing/FinalCTA.tsx
git commit -m "fix(ui): resolve squished cta text container"
```

### Task 2: Implement True 2-Font System

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Write the failing test**
Visually inspect CSS font-family rules.

**Step 2: Run test to verify it fails**
Ensure Inter is completely removed.

**Step 3: Write minimal implementation**
In `layout.tsx`, ensure `Outfit` is assigned to `--font-outfit` and `Plus_Jakarta_Sans` to `--font-jakarta`. 
In `globals.css`, strictly define `font-family` for headings using `--font-outfit` and body using `--font-jakarta`.

**Step 4: Run test to verify it passes**
Verify DOM calculated styles.

**Step 5: Commit**
```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "design: strictly enforce 2-font system (Outfit/Jakarta)"
```

### Task 3: Apply Selected Theme Palette

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/*` (depending on selected approach)

**Step 1: Write the failing test**
Check current theme colors.

**Step 2: Run test to verify it fails**
Theme currently dark OLED instead of the selected UI approach.

**Step 3: Write minimal implementation**
Update `globals.css` CSS variables to adapt the selected palette (e.g. AgentOps Light backgrounds, Solid Blue primary panels, Lime green accents). Replace `bg-[#030407]` hardcoded inline styles across `page.tsx` and `layout.tsx` to use semantic CSS variables.

**Step 4: Run test to verify it passes**
Verify UI update across app.

**Step 5: Commit**
```bash
git add src/app/globals.css src/app/page.tsx src/app/\(dashboard\)/layout.tsx
git commit -m "design: apply selected ui palette colors"
```
