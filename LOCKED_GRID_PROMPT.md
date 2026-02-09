# Prompt: Implement "Locked" Edge-to-Edge Grid System

**Objective:** Refactor the project layout to use a "Locked" grid system where content is strictly aligned to the viewport edges with fixed padding, removing any centered "boxed" constraints (like `max-w-7xl`).

## 1. Global CSS Configuration
Update your global CSS file (e.g., `globals.css`) to define a strict `.container` utility. This ensures all sections share the exact same width and padding logic.

```css
:root {
  /* Layout Variables */
  --pad-mobile: 16px;  /* px-4 */
  --pad-desktop: 32px; /* px-8 */
  --max-width: 100%;   /* LOCKED to edges, no max-width cap */
}

/* The Locked Container Utility */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--pad-mobile);
  padding-right: var(--pad-mobile);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--pad-desktop);
    padding-right: var(--pad-desktop);
  }
}
```

## 2. Component Implementation
Go through **every** section component (Navbar, Hero, Features, Footer) and replace their wrapper `div` classes with the single `.container` class.

**Old Pattern (Remove this):**
```jsx
<div className="max-w-[1600px] mx-auto px-6 md:px-12">
  {/* Content */}
</div>
```

**New Pattern (Apply this):**
```jsx
<div className="container">
  {/* Content */}
</div>
```

## 3. Grid Spacing Rules
To maintain the "tight" aesthetic within this locked container:
- **Columns**: Use `grid-cols-1 md:grid-cols-2` (or 4 for dense content).
- **Gaps**: Use `gap-4` (16px) for a precise, technical look.
- **Alignment**: Ensure `Navbar` and `Footer` also use the `.container` class so their edges align perfectly with the content grid.

## 4. Why This Works
By setting `max-width: 100%` and using fixed padding, the grid "locks" to the browser edges. It scales fluidly with the viewport, ensuring that margins never shift unexpectedly, creating a stable, premium editorial feel.
